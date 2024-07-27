# Traitforge audit details

- Total Prize Pool: $28,000 in USDC
  - HM awards: $22,300 in USDC
  - QA awards: $900 in USDC
  - Judge awards: $2,600 in USDC
  - Validator awards: $1,700 USDC
  - Scout awards: $500 in USDC
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2024-07-traitforge/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts July 29, 2024 20:00 UTC
- Ends August 6, 2024 20:00 UTC

## Automated Findings

The 4naly3er report can be found [here](https://github.com/code-423n4/2024-07-traitforge/blob/main/4naly3er-report.md).

_Note for C4 wardens: Anything included in this `Automated Findings` section is considered a publicly known issue and is ineligible for awards._

# Overview

TraitForge revolutionizes NFT gaming by integrating strategic, value-driven gameplay around a central honeypot, designed to scale and captivate participants across the NFT ecosystem.

## Links

- **Previous audits:**  None
- **Documentation:** <https://github.com/TraitForge/GitBook>
- **Website:** <https://traitforge.info/>
- **X/Twitter:** <https://twitter.com/TraitForge>
- **Discord:** <https://discord.gg/KWHCEY6zFT>

---

# TraitForge: The NFT Honeypot Game

## Introduction

TraitForge offers an enduring game experience, transcending the typical NFT model by providing a dynamic, strategic environment focused on a central honeypot, facilitating continuous engagement and value creation.

## Core Mechanics

- **Entities**: NFTs with unique traits and parameters impacting the game.
- **Generations & Minting**: Starting with Gen 1 entities, the game evolves through a breeding mechanism, expanding the ecosystem.
- **Honeypot/Nuke Fund**: Central economic feature where players can claim shares by "nuking" their entities.
- **Entropy System**: A unique mechanism dictating entity traits and strategic parameters.

## Strategic Gameplay

Involves managing entities through aging, merging, and strategic decisions impacting the honeypot's dynamics and player's potential gains.

## Development and Community

Built with Next.js, Hardhat, and ethers.js, featuring a community-driven approach with DAO governance, allowing token holders to influence game direction.

TraitForge is not just a game; it's an evolving NFT ecosystem designed for strategic depth, community involvement, and sustainable value growth.

# Scope

### Files out of scope

## Scoping Q &amp; A

### General questions

| Question                                | Answer                       |
| --------------------------------------- | ---------------------------- |
| ERC20 used by the protocol              |     None         |
| Test coverage                           | 69.6%                       |
| ERC721 used  by the protocol            |         TraitforgeNFT           |
| ERC777 used by the protocol             |          None              |
| ERC1155 used by the protocol            |             None          |
| Chains the protocol will be deployed on | Base |

### ERC20 token behaviors in scope

| Question                                                                                                                                                   | Answer |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [Missing return values](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#missing-return-values)                                                      |    |
| [Fee on transfer](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#fee-on-transfer)                                                                  |   |
| [Balance changes outside of transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#balance-modifications-outside-of-transfers-rebasingairdrops) |    |
| [Upgradeability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#upgradable-tokens)                                                                 |    |
| [Flash minting](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#flash-mintable-tokens)                                                              |    |
| [Pausability](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#pausable-tokens)                                                                      |    |
| [Approval race protections](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#approval-race-protections)                                              |    |
| [Revert on approval to zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-approval-to-zero-address)                            |    |
| [Revert on zero value approvals](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-approvals)                                    |    |
| [Revert on zero value transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                    |    |
| [Revert on transfer to the zero address](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-transfer-to-the-zero-address)                    |    |
| [Revert on large approvals and/or transfers](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-large-approvals--transfers)                  |    |
| [Doesn't revert on failure](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#no-revert-on-failure)                                                   |    |
| [Multiple token addresses](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#revert-on-zero-value-transfers)                                          |    |
| [Low decimals ( < 6)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#low-decimals)                                                                 |    |
| [High decimals ( > 18)](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#high-decimals)                                                              |    |
| [Blocklists](https://github.com/d-xo/weird-erc20?tab=readme-ov-file#tokens-with-blocklists)                                                                |    |

### External integrations (e.g., Uniswap) behavior in scope

| Question                                                  | Answer |
| --------------------------------------------------------- | ------ |
| Enabling/disabling fees (e.g. Blur disables/enables fees) | No   |
| Pausability (e.g. Uniswap pool gets paused)               |  No   |
| Upgradeability (e.g. Uniswap gets upgraded)               |   No  |

### EIP compliance checklist

N/A

# Additional context

## Main invariants

Most things won’t change aside from settable variables (eg: max generations)

## Attack ideas (where to focus for bugs)

- Possibly re-entry to NukeFund
- Inefficient/fragile mappings (especially with tokens and listings)

## All trusted roles in the protocol

| Role                                | Description                       |
| --------------------------------------- | ---------------------------- |
| Contract Owner                          |                 |

## Describe any novel or unique curve logic or mathematical models implemented in the contracts

But stuffing for entropy generator. 770 UINT256’s, each UINT = 78 digits /13 = 13 x 6 digit entropies

## Running tests

```bash
git clone --recurse https://github.com/code-423n4/2024-07-traitforge.git
cd 2024-07-traitforge
yarn
cp .env.example .env
```

Fill the `.env` file and then:

```bash
yarn compile
yarn test
```

To run code coverage

```bash
npx hardhat coverage
```

# Scope

_See [scope.txt](https://github.com/code-423n4/2024-07-traitforge/blob/main/scope.txt)_

### Files in scope

| File   | Logic Contracts | Interfaces | nSLOC | Purpose | Libraries used |
| ------ | --------------- | ---------- | ----- | -----   | ------------ |
| /contracts/DevFund/DevFund.sol | 1| **** | 77 | |@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/security/Pausable.sol|
| /contracts/EntityForging/EntityForging.sol | 1| **** | 152 | |@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/security/Pausable.sol|
| /contracts/EntityTrading/EntityTrading.sol | 1| **** | 82 | |@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/security/Pausable.sol|
| /contracts/EntropyGenerator/EntropyGenerator.sol | 1| **** | 147 | |@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/security/Pausable.sol|
| /contracts/NukeFund/NukeFund.sol | 1| **** | 150 | |@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/security/Pausable.sol|
| /contracts/TraitForgeNft/TraitForgeNft.sol | 1| **** | 272 | |@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol<br>@openzeppelin/contracts/security/ReentrancyGuard.sol<br>@openzeppelin/contracts/access/Ownable.sol<br>@openzeppelin/contracts/security/Pausable.sol<br>@openzeppelin/contracts/utils/cryptography/MerkleProof.sol|
| **Totals** | **6** | **** | **880** | | |

### Files out of scope

_See [out_of_scope.txt](https://github.com/code-423n4/2024-07-traitforge/blob/main/out_of_scope.txt)_

| File         |
| ------------ |
| ./contracts/Airdrop/Airdrop.sol |
| ./contracts/Airdrop/IAirdrop.sol |
| ./contracts/DAOFund/DAOFund.sol |
| ./contracts/DAOFund/IDAOFund.sol |
| ./contracts/DAOFund/IUniswapV2Router.sol |
| ./contracts/DevFund/IDevFund.sol |
| ./contracts/EntityForging/IEntityForging.sol |
| ./contracts/EntityTrading/IEntityTrading.sol |
| ./contracts/EntropyGenerator/IEntropyGenerator.sol |
| ./contracts/NukeFund/INukeFund.sol |
| ./contracts/Trait/ITrait.sol |
| ./contracts/Trait/Trait.sol |
| ./contracts/TraitForgeNft/ITraitForgeNft.sol |
| ./contracts/test/TestERC721.sol |
| Totals: 14 |

## Miscellaneous

Employees of TraitForge and employees' family members are ineligible to participate in this audit.
