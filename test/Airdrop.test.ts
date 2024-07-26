import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Airdrop, Trait } from '../typechain-types';

describe('Airdrop', function () {
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let airdrop: Airdrop;
  let token: Trait;

  before(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    token = await ethers.deployContract('Trait', [
      'Trait',
      'TRAIT',
      18,
      ethers.parseEther('1000000'),
    ]);
    airdrop = await ethers.deployContract('Airdrop');
  });

  it('should set trait token successfully', async () => {
    await airdrop.setTraitToken(await token.getAddress());
    expect(await airdrop.traitToken()).to.eq(await token.getAddress());
  });

  it('should set user amount successfully', async () => {
    await expect(
      airdrop
        .connect(user2)
        .addUserAmount(user1.address, ethers.parseEther('1'))
    ).to.revertedWith('Ownable: caller is not the owner');

    await airdrop.addUserAmount(user1.address, ethers.parseEther('1'));
    expect(await airdrop.userInfo(user1.address)).to.eq(ethers.parseEther('1'));

    await airdrop.addUserAmount(user2.address, ethers.parseEther('3'));
    expect(await airdrop.userInfo(user2.address)).to.eq(ethers.parseEther('3'));
  });

  it('should not claim when airdrop is not started', async () => {
    await expect(airdrop.connect(user1).claim()).to.revertedWith('Not started');
  });

  it('should start airdrop successfully', async () => {
    await token.increaseAllowance(
      await airdrop.getAddress(),
      ethers.parseEther('1000')
    );
    await airdrop.startAirdrop(ethers.parseEther('1000'));
    expect(await airdrop.airdropStarted()).to.eq(true);
    await expect(
      airdrop.startAirdrop(ethers.parseEther('2000'))
    ).to.revertedWith('Already started');
  });

  it('should claim successfully', async () => {
    const balanceBefore = await token.balanceOf(user1.address);
    await airdrop.connect(user1).claim();
    const balanceAfter = await token.balanceOf(user1.address);
    expect(balanceAfter - balanceBefore).to.eq(ethers.parseEther('250'));

    await expect(airdrop.connect(user1).claim()).to.revertedWith(
      'Not eligible'
    );
  });

  it('should allow dao fund successfully', async () => {
    await airdrop.allowDaoFund();
    expect(await airdrop.daoFundAllowed()).to.eq(true);

    await expect(airdrop.allowDaoFund()).to.revertedWith('Already allowed');
  });
});
