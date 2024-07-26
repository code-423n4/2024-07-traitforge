import { expect } from 'chai';
import { ethers } from 'hardhat';
import { EntropyGenerator } from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('EntropyGenerator', function () {
  let entropyGenerator: EntropyGenerator;
  let owner: HardhatEthersSigner;
  let allowedCaller: HardhatEthersSigner;

  before(async function () {
    [owner, allowedCaller] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory('TraitForgeNft');
    const nft = await NFT.deploy();
    await nft.waitForDeployment();

    // Deploy the contract
    const EntropyGenerator = await ethers.getContractFactory(
      'EntropyGenerator'
    );
    entropyGenerator = await EntropyGenerator.deploy(await nft.getAddress());

    await entropyGenerator.waitForDeployment();
  });

  it('should set the allowed caller', async function () {
    await entropyGenerator.connect(owner).setAllowedCaller(allowedCaller);

    // Use the new getter function to retrieve the allowedCaller
    const updatedCaller = await entropyGenerator.getAllowedCaller();
    expect(updatedCaller).to.equal(allowedCaller);
  });

  it('should write entropy batches 1', async function () {
    // Write entropy batch 1
    await entropyGenerator.writeEntropyBatch1();
    const lastIndex = await entropyGenerator.getLastInitializedIndex();
    expect(lastIndex).to.equal(256n);
  });

  it('should write entropy batches 2', async function () {
    // Write entropy batch 2
    await entropyGenerator.writeEntropyBatch2();
    const lastIndexAfterBatch2 =
      await entropyGenerator.getLastInitializedIndex();
    expect(lastIndexAfterBatch2).to.equal(512n);
  });

  it('should write entropy batches 3', async function () {
    // Write entropy batch 3
    await entropyGenerator.writeEntropyBatch3();
    const lastIndexAfterBatch3 =
      await entropyGenerator.getLastInitializedIndex();
    expect(lastIndexAfterBatch3).to.equal(770n);
  });

  it('should retrieve the next entropy', async function () {
    // Call getNextEntropy and wait for the transaction to be mined
    await expect(
      entropyGenerator.connect(allowedCaller).getNextEntropy()
    ).to.emit(entropyGenerator, 'EntropyRetrieved');

    // If you have specific expectations about the entropy value, compare it here
    // For example: expect(entropyValue).to.equal(expectedValue);
  });

  it('should derive token parameters', async function () {
    const slotIndex = 42;
    const numberIndex = 7;

    const [nukeFactor, breedPotential, performanceFactor, isSire] =
      await entropyGenerator.deriveTokenParameters(slotIndex, numberIndex);

    console.log(nukeFactor, breedPotential, performanceFactor, isSire);
  });
});
