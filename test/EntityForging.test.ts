import { parseEther } from 'ethers';
import {
  Airdrop,
  DevFund,
  EntityForging,
  EntropyGenerator,
  EntityTrading,
  NukeFund,
  TraitForgeNft,
} from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import generateMerkleTree from '../scripts/genMerkleTreeLib';

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('EntityForging', () => {
  let entityForging: EntityForging;
  let nft: TraitForgeNft;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let user3: HardhatEthersSigner;
  let entityTrading: EntityTrading;
  let nukeFund: NukeFund;
  let devFund: DevFund;
  let FORGER_TOKEN_ID: number;
  let MERGER_TOKEN_ID: number;

  const FORGING_FEE = ethers.parseEther('1.0'); // 1 ETH

  before(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy TraitForgeNft contract
    const TraitForgeNft = await ethers.getContractFactory('TraitForgeNft');
    nft = (await TraitForgeNft.deploy()) as TraitForgeNft;

    // Deploy Airdrop contract
    const airdropFactory = await ethers.getContractFactory('Airdrop');
    const airdrop = (await airdropFactory.deploy()) as Airdrop;

    await nft.setAirdropContract(await airdrop.getAddress());

    await airdrop.transferOwnership(await nft.getAddress());

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

    devFund = await ethers.deployContract('DevFund');
    await devFund.waitForDeployment();

    const NukeFund = await ethers.getContractFactory('NukeFund');

    nukeFund = (await NukeFund.deploy(
      await nft.getAddress(),
      await airdrop.getAddress(),
      await devFund.getAddress(),
      owner.address
    )) as NukeFund;
    await nukeFund.waitForDeployment();

    await nft.setNukeFundContract(await nukeFund.getAddress());

    entityTrading = await ethers.deployContract('EntityTrading', [
      await nft.getAddress(),
    ]);

    // Set NukeFund address
    await entityTrading.setNukeFundAddress(await nukeFund.getAddress());

    const merkleInfo = generateMerkleTree([
      owner.address,
      user1.address,
      user2.address,
    ]);

    await nft.setRootHash(merkleInfo.rootHash);

    // Mint some tokens for testing
    await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
      value: ethers.parseEther('1'),
    });
    await nft.connect(user1).mintToken(merkleInfo.whitelist[1].proof, {
      value: ethers.parseEther('1'),
    });
    await nft.connect(user1).mintToken(merkleInfo.whitelist[1].proof, {
      value: ethers.parseEther('1'),
    });

    for (let i = 0; i < 10; i++) {
      await nft.connect(owner).mintToken(merkleInfo.whitelist[0].proof, {
        value: ethers.parseEther('1'),
      });
      const isForger = await nft.isForger(i + 4);
      if (isForger) {
        FORGER_TOKEN_ID = i + 4;
        break;
      }
    }

    MERGER_TOKEN_ID = 3;

    console.log(await nft.isForger(FORGER_TOKEN_ID));
    console.log(await nft.isForger(MERGER_TOKEN_ID));
    console.log(await entityForging.forgingCounts(FORGER_TOKEN_ID));
    console.log(await nft.getTokenEntropy(FORGER_TOKEN_ID));
  });

  describe('listForForging', () => {
    it('should not allow non-owners to list a token for forging', async () => {
      const tokenId = 1;
      const fee = FORGING_FEE;

      await expect(
        entityForging.connect(user1).listForForging(tokenId, fee)
      ).to.be.revertedWith('Caller must own the token');
    });

    it('should allow the owner to list a token for forging', async () => {
      const tokenId = FORGER_TOKEN_ID;
      const fee = FORGING_FEE;

      await entityForging.connect(owner).listForForging(tokenId, fee);

      const listedTokenId = await entityForging.listedTokenIds(tokenId);
      const listing = await entityForging.listings(listedTokenId);
      expect(listing.isListed).to.be.true;
      expect(listing.fee).to.equal(fee);
    });
  });

  describe('Forge With Listed', () => {
    it('should not allow forging with an unlisted forger token', async () => {
      const forgerTokenId = MERGER_TOKEN_ID;
      const mergerTokenId = FORGER_TOKEN_ID;

      await expect(
        entityForging
          .connect(user1)
          .forgeWithListed(forgerTokenId, mergerTokenId, {
            value: FORGING_FEE,
          })
      ).to.be.revertedWith("Forger's entity not listed for forging");

      // Additional assertions as needed
    });

    it('should allow forging with a listed token', async () => {
      const forgerTokenId = FORGER_TOKEN_ID;
      const mergerTokenId = MERGER_TOKEN_ID;

      const initialBalance = await ethers.provider.getBalance(owner.address);

      const forgerEntropy = await nft.getTokenEntropy(forgerTokenId);
      const mergerEntrypy = await nft.getTokenEntropy(mergerTokenId);
      /// The new token id will be forger token id + 1, cause it's the last item
      const expectedTokenId = FORGER_TOKEN_ID + 1;
      await expect(
        entityForging
          .connect(user1)
          .forgeWithListed(forgerTokenId, mergerTokenId, {
            value: FORGING_FEE,
          })
      )
        .to.emit(entityForging, 'EntityForged')
        .withArgs(
          expectedTokenId,
          forgerTokenId,
          mergerTokenId,
          (forgerEntropy + mergerEntrypy) / 2n,
          FORGING_FEE
        )
        .to.emit(nft, 'NewEntityMinted')
        .withArgs(
          await user1.getAddress(),
          expectedTokenId,
          2,
          (forgerEntropy + mergerEntrypy) / 2n
        );

      const finalBalance = await ethers.provider.getBalance(owner.address);

      expect(finalBalance - initialBalance).to.be.eq((FORGING_FEE * 9n) / 10n);
      // Check forger nft delisted

      const listingInfo = await entityForging.listings(forgerTokenId);

      expect(listingInfo.isListed).to.be.eq(false);
    });
  });

  describe('Auto cancel listing after list for sale in EntityTrading', () => {
    it('Shoudl cancel list for forging after list for sale in Entity Trading', async () => {
      const tokenId = FORGER_TOKEN_ID;
      const fee = FORGING_FEE;
      const LISTING_PRICE = ethers.parseEther('1.0');

      await entityForging.connect(owner).listForForging(tokenId, fee);

      await nft
        .connect(owner)
        .approve(await entityTrading.getAddress(), tokenId);

      await entityTrading.connect(owner).listNFTForSale(tokenId, LISTING_PRICE);

      // Check the token is unlisted in entity forging
      const listedTokenId = await entityForging.listedTokenIds(tokenId);
      const listing = await entityForging.listings(listedTokenId);
      expect(listing.isListed).to.be.false;
      // expect(listing.fee).to.equal(fee);
    });
  });
});