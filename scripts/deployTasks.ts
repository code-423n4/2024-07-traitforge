import { task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import {
  Airdrop,
  DAOFund,
  DevFund,
  EntityForging,
  EntityTrading,
  EntropyGenerator,
  NukeFund,
  Trait,
  TraitForgeNft,
} from '../typechain-types';
import { ethers } from 'ethers';
import { UNISWAP_ROUTER } from '../consts';
import generateMerkleTree from './genMerkleTreeLib';
import { WHITELIST } from '../consts/whitelist';

task('deploy-all', 'Deploy all the contracts').setAction(async (_, hre) => {
  const token: Trait = await hre.run('deploy-token');
  const nft: TraitForgeNft = await hre.run('deploy-nft');
  const entropyGenerator: EntropyGenerator = await hre.run(
    'deploy-entropy-generator',
    { nft: await nft.getAddress() }
  );
  const entityTrading: EntityTrading = await hre.run('deploy-entity-trading', {
    nft: await nft.getAddress(),
  });
  const entityForging: EntityForging = await hre.run('deploy-entity-forging', {
    nft: await nft.getAddress(),
  });
  const devFund: DevFund = await hre.run('deploy-dev-fund');
  const airdrop: Airdrop = await hre.run('deploy-airdrop');
  const daoFund: DAOFund = await hre.run('deploy-dao-fund', {
    token: await token.getAddress(),
  });
  const nukeFund: NukeFund = await hre.run('deploy-nuke-fund', {
    nft: await nft.getAddress(),
    devFund: await devFund.getAddress(),
    airdrop: await airdrop.getAddress(),
    daoFund: await daoFund.getAddress(),
  });

  await nft.setEntropyGenerator(await entropyGenerator.getAddress());
  await nft.setEntityForgingContract(await entityForging.getAddress());
  await nft.setNukeFundContract(await nukeFund.getAddress());
  await nft.setAirdropContract(await airdrop.getAddress());
  await entityTrading.setNukeFundAddress(await nukeFund.getAddress());
  await entityForging.setNukeFundAddress(await nukeFund.getAddress());
  await airdrop.setTraitToken(await token.getAddress());
  await airdrop.transferOwnership(await nft.getAddress());

  console.log('Generating Merkle Tree...');
  const { rootHash } = generateMerkleTree(WHITELIST);
  await nft.setRootHash(rootHash);
  console.log('Generated & Set the root hash successfully.');

  console.log('Setting DevFund users...');
  await devFund.addDev(WHITELIST[0], 100);
  await devFund.addDev(WHITELIST[1], 100);
  await devFund.addDev(WHITELIST[2], 100);
  console.log('Setting DevFund users done.');

  console.log('Writing EntropyBatch...');
  const tx1 = await entropyGenerator.writeEntropyBatch1();
  tx1.wait();
  const tx2 = await entropyGenerator.writeEntropyBatch2();
  tx2.wait();
  const tx3 = await entropyGenerator.writeEntropyBatch3();
  tx3.wait();
  console.log('Writing EntropyBatch done.');
});

task('deploy-token', 'Deploy Trait Token').setAction(async (_, hre) => {
  const name = 'TRAIT';
  const symbol = 'TRAIT';
  const decimals = 18;
  const totalSupply = ethers.parseEther('1000000');

  try {
    console.log('Deploying Trait...');
    const token = await hre.ethers.deployContract('Trait', [
      name,
      symbol,
      decimals,
      totalSupply,
    ]);
    await token.waitForDeployment();
    console.log('Contract deployed to:', await token.getAddress());
    return token;
  } catch (error) {
    console.error(error);
  }
  return null;
});

task('deploy-nft', 'Deploy TraitForgeNft').setAction(async (_, hre) => {
  try {
    console.log('Deploying TraitForgeNft...');
    const nft = await hre.ethers.deployContract('TraitForgeNft', []);
    await nft.waitForDeployment();
    console.log('Contract deployed to:', await nft.getAddress());
    return nft;
  } catch (error) {
    console.error(error);
  }
  return null;
});

task('deploy-entropy-generator', 'Deploy EntropyGenerator')
  .addParam('nft', 'The address of TraitForgeNft')
  .setAction(async (taskArguments, hre) => {
    try {
      console.log('Deploying EntropyGenerator...');
      const entropyGenerator = await hre.ethers.deployContract(
        'EntropyGenerator',
        [taskArguments.nft]
      );
      await entropyGenerator.waitForDeployment();
      console.log('Contract deployed to:', await entropyGenerator.getAddress());
      return entropyGenerator;
    } catch (error) {
      console.error(error);
    }
    return null;
  });

task('deploy-entity-trading', 'Deploy EntityTrading')
  .addParam('nft', 'The address of TraitForgeNft')
  .setAction(async (taskArguments, hre) => {
    try {
      console.log('Deploying EntityTrading...');
      const entityTrading = await hre.ethers.deployContract('EntityTrading', [
        taskArguments.nft,
      ]);
      await entityTrading.waitForDeployment();
      console.log('Contract deployed to:', await entityTrading.getAddress());
      return entityTrading;
    } catch (error) {
      console.error(error);
    }
    return null;
  });

task('deploy-entity-forging', 'Deploy EntityForging')
  .addParam('nft', 'The address of TraitForgeNft')
  .setAction(async (taskArguments, hre) => {
    try {
      console.log('Deploying EntityForging...');
      const entityForging = await hre.ethers.deployContract('EntityForging', [
        taskArguments.nft,
      ]);
      await entityForging.waitForDeployment();
      console.log('Contract deployed to:', await entityForging.getAddress());
      return entityForging;
    } catch (error) {
      console.error(error);
    }
    return null;
  });

task('deploy-dev-fund', 'Deploy DevFund').setAction(async (_, hre) => {
  try {
    console.log('Deploying DevFund...');
    const devFund = await hre.ethers.deployContract('DevFund', []);
    await devFund.waitForDeployment();
    console.log('Contract deployed to:', await devFund.getAddress());
    return devFund;
  } catch (error) {
    console.error(error);
  }
  return null;
});

task('deploy-airdrop', 'Deploy Airdrop').setAction(async (_, hre) => {
  try {
    console.log('Deploying Airdrop...');
    const airdrop = await hre.ethers.deployContract('Airdrop', []);
    await airdrop.waitForDeployment();
    console.log('Contract deployed to:', await airdrop.getAddress());
    return airdrop;
  } catch (error) {
    console.error(error);
  }
  return null;
});

task('deploy-dao-fund', 'Deploy DAOFund')
  .addParam('token', 'The address of Trait token')
  .setAction(async (taskArguments, hre) => {
    try {
      console.log('Deploying DAOFund...');
      const daoFund = await hre.ethers.deployContract('DAOFund', [
        taskArguments.token,
        UNISWAP_ROUTER.sepolia,
      ]);
      await daoFund.waitForDeployment();
      console.log('Contract deployed to:', await daoFund.getAddress());
      return daoFund;
    } catch (error) {
      console.error(error);
    }
    return null;
  });

task('deploy-nuke-fund', 'Deploy NukeFund')
  .addParam('nft', 'The address of TraitForgeNft')
  .addParam('devFund', 'The address of DevFund')
  .addParam('airdrop', 'The address of Airdrop')
  .addParam('daoFund', 'The address of DaoFund')
  .setAction(async (taskArguments, hre) => {
    try {
      console.log('Deploying NukeFund...');
      const nukeFund = await hre.ethers.deployContract('NukeFund', [
        taskArguments.nft,
        taskArguments.airdrop,
        taskArguments.devFund,
        taskArguments.daoFund,
      ]);
      await nukeFund.waitForDeployment();
      console.log('Contract deployed to:', await nukeFund.getAddress());
      return nukeFund;
    } catch (error) {
      console.error(error);
    }
    return null;
  });
