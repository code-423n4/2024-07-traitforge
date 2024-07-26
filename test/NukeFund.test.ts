import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  DevFund,
  NukeFund,
  TraitForgeNft,
  Airdrop,
  EntropyGenerator,
  EntityForging,
  EntityTrading,
} from '../typechain-types';
import generateMerkleTree from '../scripts/genMerkleTreeLib';
import { fastForward } from '../utils/evm';

describe('NukeFund', function () {
  let owner: HardhatEthersSigner,
    user1: HardhatEthersSigner,
    nukeFund: NukeFund,
    nft: TraitForgeNft,
    devFund: DevFund,
    airdrop: Airdrop,
    entityForging: EntityForging,
    merkleInfo: any,
    entityTrading: EntityTrading;
  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const TraitForgeNft = await ethers.getContractFactory('TraitForgeNft');
    nft = (await TraitForgeNft.deploy()) as TraitForgeNft;
    await nft.waitForDeployment();

    devFund = await ethers.deployContract('DevFund');
    await devFund.waitForDeployment();

    await devFund.addDev(owner.address, 1);

    airdrop = await ethers.deployContract('Airdrop');
    await airdrop.waitForDeployment();

    await nft.setAirdropContract(await airdrop.getAddress());
    await airdrop.transferOwnership(await nft.getAddress());

    const NukeFund = await ethers.getContractFactory('NukeFund');

    nukeFund = (await NukeFund.deploy(
      await nft.getAddress(),
      await airdrop.getAddress(),
      await devFund.getAddress(),
      owner.address
    )) as NukeFund;
    await nukeFund.waitForDeployment();

    await nft.setNukeFundContract(await nukeFund.getAddress());

    // Deploy EntityForging contract
    const EntropyGenerator = await ethers.getContractFactory(
      'EntropyGenerator'
    );
    const entropyGenerator = (await EntropyGenerator.deploy(
      await nft.getAddress()
    )) as EntropyGenerator;

    await entropyGenerator.writeEntropyBatch1();

    await nft.setEntropyGenerator(await entropyGenerator.getAddress());

    // Deploy EntityForging contract
    const EntityForging = await ethers.getContractFactory('EntityForging');
    entityForging = (await EntityForging.deploy(
      await nft.getAddress()
    )) as EntityForging;
    await nft.setEntityForgingContract(await entityForging.getAddress());

    merkleInfo = generateMerkleTree([owner.address, user1.address]);

    await nft.setRootHash(merkleInfo.rootHash);

    entityTrading = await ethers.deployContract('EntityTrading', [
      await nft.getAddress(),
    ]);

    await entityTrading.setNukeFundAddress(await nukeFund.getAddress());

    await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
      value: ethers.parseEther('1'),
    });
    // Set minimumDaysHeld to 0 for testing purpose
    await nukeFund.setMinimumDaysHeld(0);
  });

  it('should allow the owner to update the ERC721 contract address', async function () {
    await expect(
      nukeFund.connect(owner).setTraitForgeNftContract(await nft.getAddress())
    )
      .to.emit(nukeFund, 'TraitForgeNftAddressUpdated')
      .withArgs(await nft.getAddress());

    expect(await nukeFund.nftContract()).to.equal(await nft.getAddress());
  });

  it('should receive funds and distribute dev share', async function () {
    const initialFundBalance = await nukeFund.getFundBalance();
    const devShare = ethers.parseEther('0.1'); // 10% of the sent amount
    const initalDevBalance = await ethers.provider.getBalance(
      await nukeFund.devAddress()
    );
    await expect(
      async () =>
        await user1.sendTransaction({
          to: await nukeFund.getAddress(),
          value: ethers.parseEther('1'),
        })
    ).to.changeEtherBalance(nukeFund, ethers.parseEther('0.9'));

    const newFundBalance = await nukeFund.getFundBalance();
    expect(newFundBalance).to.equal(
      initialFundBalance + ethers.parseEther('0.9')
    );

    const devBalance = await ethers.provider.getBalance(
      await nukeFund.devAddress()
    );
    expect(devBalance).to.equal(initalDevBalance + devShare);
  });

  it('should calculate the age of a token', async function () {
    const tokenId = 1;

    const age = await nukeFund.calculateAge(tokenId);
    expect(age).to.be.eq(0);
  });

  it('should nuke a token', async function () {
    const tokenId = 1;

    // Mint a token
    await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
      value: ethers.parseEther('1'),
    });

    // Send some funds to the contract
    await user1.sendTransaction({
      to: await nukeFund.getAddress(),
      value: ethers.parseEther('1'),
    });

    const prevNukeFundBal = await nukeFund.getFundBalance();
    // Ensure the token can be nuked
    expect(await nukeFund.canTokenBeNuked(tokenId)).to.be.true;

    const prevUserEthBalance = await ethers.provider.getBalance(
      await owner.getAddress()
    );
    await nft.connect(owner).approve(await nukeFund.getAddress(), tokenId);

    const finalNukeFactor = await nukeFund.calculateNukeFactor(tokenId);
    const fund = await nukeFund.getFundBalance();

    await expect(nukeFund.connect(owner).nuke(tokenId))
      .to.emit(nukeFund, 'Nuked')
      .withArgs(owner, tokenId, (fund * finalNukeFactor) / 100000n)
      .to.emit(nukeFund, 'FundBalanceUpdated')
      .withArgs(fund - (fund * finalNukeFactor) / 100000n);

    const curUserEthBalance = await ethers.provider.getBalance(
      await owner.getAddress()
    );

    const curNukeFundBal = await nukeFund.getFundBalance();
    expect(curUserEthBalance).to.be.gt(prevUserEthBalance);
    // Check if the token is burned
    // expect(await nft.ownerOf(tokenId)).to.equal(ethers.ZeroAddress);
    expect(await nft.balanceOf(owner)).to.eq(1);
    expect(curNukeFundBal).to.be.lt(prevNukeFundBal);
  });

  it('lastTransferredTimestamp should be updated after token transfer', async () => {
    await nukeFund.setMinimumDaysHeld(10);
    await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
      value: ethers.parseEther('1'),
    });

    await fastForward(5);
    expect(await nukeFund.canTokenBeNuked(2)).to.be.false;
    await fastForward(10);
    expect(await nukeFund.canTokenBeNuked(2)).to.be.true;

    await nft
      .connect(owner)
      .transferFrom(await owner.getAddress(), await user1.getAddress(), 2);

    expect(await nukeFund.canTokenBeNuked(2)).to.be.false;
    await fastForward(10);
    expect(await nukeFund.canTokenBeNuked(2)).to.be.true;
  });
});
