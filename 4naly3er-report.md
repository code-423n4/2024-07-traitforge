# Report

- [Report](#report)
  - [Gas Optimizations](#gas-optimizations)
    - [\[GAS-1\] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)](#gas-1-a--a--b-is-more-gas-effective-than-a--b-for-state-variables-excluding-arrays-and-mappings)
    - [\[GAS-2\] Use assembly to check for `address(0)`](#gas-2-use-assembly-to-check-for-address0)
    - [\[GAS-3\] State variables should be cached in stack variables rather than re-reading them from storage](#gas-3-state-variables-should-be-cached-in-stack-variables-rather-than-re-reading-them-from-storage)
    - [\[GAS-4\] Use calldata instead of memory for function arguments that do not get mutated](#gas-4-use-calldata-instead-of-memory-for-function-arguments-that-do-not-get-mutated)
    - [\[GAS-5\] For Operations that will not overflow, you could use unchecked](#gas-5-for-operations-that-will-not-overflow-you-could-use-unchecked)
    - [\[GAS-6\] Use Custom Errors instead of Revert Strings to save Gas](#gas-6-use-custom-errors-instead-of-revert-strings-to-save-gas)
    - [\[GAS-7\] Stack variable used as a cheaper cache for a state variable is only used once](#gas-7-stack-variable-used-as-a-cheaper-cache-for-a-state-variable-is-only-used-once)
    - [\[GAS-8\] State variables only set in the constructor should be declared `immutable`](#gas-8-state-variables-only-set-in-the-constructor-should-be-declared-immutable)
    - [\[GAS-9\] Functions guaranteed to revert when called by normal users can be marked `payable`](#gas-9-functions-guaranteed-to-revert-when-called-by-normal-users-can-be-marked-payable)
    - [\[GAS-10\] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)](#gas-10-i-costs-less-gas-compared-to-i-or-i--1-same-for---i-vs-i---or-i---1)
    - [\[GAS-11\] Using `private` rather than `public` for constants, saves gas](#gas-11-using-private-rather-than-public-for-constants-saves-gas)
    - [\[GAS-12\] Use shift right/left instead of division/multiplication if possible](#gas-12-use-shift-rightleft-instead-of-divisionmultiplication-if-possible)
    - [\[GAS-13\] Use of `this` instead of marking as `public` an `external` function](#gas-13-use-of-this-instead-of-marking-as-public-an-external-function)
    - [\[GAS-14\] Increments/decrements can be unchecked in for-loops](#gas-14-incrementsdecrements-can-be-unchecked-in-for-loops)
    - [\[GAS-15\] Use != 0 instead of \> 0 for unsigned integer comparison](#gas-15-use--0-instead-of--0-for-unsigned-integer-comparison)
  - [Non Critical Issues](#non-critical-issues)
    - [\[NC-1\] Missing checks for `address(0)` when assigning values to address state variables](#nc-1-missing-checks-for-address0-when-assigning-values-to-address-state-variables)
    - [\[NC-2\] Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`](#nc-2-use-stringconcat-or-bytesconcat-instead-of-abiencodepacked)
    - [\[NC-3\] `constant`s should be defined rather than using magic numbers](#nc-3-constants-should-be-defined-rather-than-using-magic-numbers)
    - [\[NC-4\] Control structures do not follow the Solidity Style Guide](#nc-4-control-structures-do-not-follow-the-solidity-style-guide)
    - [\[NC-5\] Consider disabling `renounceOwnership()`](#nc-5-consider-disabling-renounceownership)
    - [\[NC-6\] Duplicated `require()`/`revert()` Checks Should Be Refactored To A Modifier Or Function](#nc-6-duplicated-requirerevert-checks-should-be-refactored-to-a-modifier-or-function)
    - [\[NC-7\] Events that mark critical parameter changes should contain both the old and the new value](#nc-7-events-that-mark-critical-parameter-changes-should-contain-both-the-old-and-the-new-value)
    - [\[NC-8\] Function ordering does not follow the Solidity style guide](#nc-8-function-ordering-does-not-follow-the-solidity-style-guide)
    - [\[NC-9\] Functions should not be longer than 50 lines](#nc-9-functions-should-not-be-longer-than-50-lines)
    - [\[NC-10\] Change int to int256](#nc-10-change-int-to-int256)
    - [\[NC-11\] Change uint to uint256](#nc-11-change-uint-to-uint256)
    - [\[NC-12\] Lack of checks in setters](#nc-12-lack-of-checks-in-setters)
    - [\[NC-13\] Missing Event for critical parameters change](#nc-13-missing-event-for-critical-parameters-change)
    - [\[NC-14\] NatSpec is completely non-existent on functions that should have them](#nc-14-natspec-is-completely-non-existent-on-functions-that-should-have-them)
    - [\[NC-15\] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor](#nc-15-use-a-modifier-instead-of-a-requireif-statement-for-a-special-msgsender-actor)
    - [\[NC-16\] Consider using named mappings](#nc-16-consider-using-named-mappings)
    - [\[NC-17\] Owner can renounce while system is paused](#nc-17-owner-can-renounce-while-system-is-paused)
    - [\[NC-18\] Adding a `return` statement when the function defines a named return variable, is redundant](#nc-18-adding-a-return-statement-when-the-function-defines-a-named-return-variable-is-redundant)
    - [\[NC-19\] Use scientific notation for readability reasons for large multiples of ten](#nc-19-use-scientific-notation-for-readability-reasons-for-large-multiples-of-ten)
    - [\[NC-20\] Avoid the use of sensitive terms](#nc-20-avoid-the-use-of-sensitive-terms)
    - [\[NC-21\] Strings should use double quotes rather than single quotes](#nc-21-strings-should-use-double-quotes-rather-than-single-quotes)
    - [\[NC-22\] Use Underscores for Number Literals (add an underscore every 3 digits)](#nc-22-use-underscores-for-number-literals-add-an-underscore-every-3-digits)
    - [\[NC-23\] Internal and private variables and functions names should begin with an underscore](#nc-23-internal-and-private-variables-and-functions-names-should-begin-with-an-underscore)
    - [\[NC-24\] Constants should be defined rather than using magic numbers](#nc-24-constants-should-be-defined-rather-than-using-magic-numbers)
    - [\[NC-25\] `public` functions not called by the contract should be declared `external` instead](#nc-25-public-functions-not-called-by-the-contract-should-be-declared-external-instead)
    - [\[NC-26\] Variables need not be initialized to zero](#nc-26-variables-need-not-be-initialized-to-zero)
  - [Low Issues](#low-issues)
    - [\[L-1\] Use a 2-step ownership transfer pattern](#l-1-use-a-2-step-ownership-transfer-pattern)
    - [\[L-2\] Missing checks for `address(0)` when assigning values to address state variables](#l-2-missing-checks-for-address0-when-assigning-values-to-address-state-variables)
    - [\[L-3\] Division by zero not prevented](#l-3-division-by-zero-not-prevented)
    - [\[L-4\] External call recipient may consume all transaction gas](#l-4-external-call-recipient-may-consume-all-transaction-gas)
    - [\[L-5\] Prevent accidentally burning tokens](#l-5-prevent-accidentally-burning-tokens)
    - [\[L-6\] Owner can renounce while system is paused](#l-6-owner-can-renounce-while-system-is-paused)
    - [\[L-7\] Possible rounding issue](#l-7-possible-rounding-issue)
    - [\[L-8\] Loss of precision](#l-8-loss-of-precision)
    - [\[L-9\] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`](#l-9-solidity-version-0820-may-not-work-on-other-chains-due-to-push0)
    - [\[L-10\] Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`](#l-10-use-ownable2steptransferownership-instead-of-ownabletransferownership)
    - [\[L-11\] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting](#l-11-consider-using-openzeppelins-safecast-library-to-prevent-unexpected-overflows-when-downcasting)
    - [\[L-12\] Unsafe ERC20 operation(s)](#l-12-unsafe-erc20-operations)
    - [\[L-13\] Upgradeable contract not initialized](#l-13-upgradeable-contract-not-initialized)
    - [\[L-14\] A year is not always 365 days](#l-14-a-year-is-not-always-365-days)
  - [Medium Issues](#medium-issues)
    - [\[M-1\] `block.number` means different things on different L2s](#m-1-blocknumber-means-different-things-on-different-l2s)
    - [\[M-2\] Centralization Risk for trusted owners](#m-2-centralization-risk-for-trusted-owners)
      - [Impact](#impact)
    - [\[M-3\] `_safeMint()` should be used rather than `_mint()` wherever possible](#m-3-_safemint-should-be-used-rather-than-_mint-wherever-possible)
    - [\[M-4\] Using `transferFrom` on ERC721 tokens](#m-4-using-transferfrom-on-erc721-tokens)
    - [\[M-5\] Fees can be set to be greater than 100%](#m-5-fees-can-be-set-to-be-greater-than-100)

## Gas Optimizations

| |Issue|Instances|
|-|:-|:-:|
| [GAS-1](#GAS-1) | `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings) | 5 |
| [GAS-2](#GAS-2) | Use assembly to check for `address(0)` | 11 |
| [GAS-3](#GAS-3) | State variables should be cached in stack variables rather than re-reading them from storage | 1 |
| [GAS-4](#GAS-4) | Use calldata instead of memory for function arguments that do not get mutated | 1 |
| [GAS-5](#GAS-5) | For Operations that will not overflow, you could use unchecked | 143 |
| [GAS-6](#GAS-6) | Use Custom Errors instead of Revert Strings to save Gas | 1 |
| [GAS-7](#GAS-7) | Stack variable used as a cheaper cache for a state variable is only used once | 1 |
| [GAS-8](#GAS-8) | State variables only set in the constructor should be declared `immutable` | 2 |
| [GAS-9](#GAS-9) | Functions guaranteed to revert when called by normal users can be marked `payable` | 25 |
| [GAS-10](#GAS-10) | `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`) | 10 |
| [GAS-11](#GAS-11) | Using `private` rather than `public` for constants, saves gas | 1 |
| [GAS-12](#GAS-12) | Use shift right/left instead of division/multiplication if possible | 2 |
| [GAS-13](#GAS-13) | Use of `this` instead of marking as `public` an `external` function | 1 |
| [GAS-14](#GAS-14) | Increments/decrements can be unchecked in for-loops | 6 |
| [GAS-15](#GAS-15) | Use != 0 instead of > 0 for unsigned integer comparison | 13 |

### <a name="GAS-1"></a>[GAS-1] `a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)

This saves **16 gas per instance.**

*Instances (5)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

18:       totalRewardDebt += amountPerWeight;

36:     totalDevWeight += weight;

45:     info.pendingRewards += (totalRewardDebt - info.rewardDebt) * info.weight;

55:     info.pendingRewards += (totalRewardDebt - info.rewardDebt) * info.weight;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

44:     fund += remainingFund; // Update the fund balance

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="GAS-2"></a>[GAS-2] Use assembly to check for `address(0)`

*Saves 6 gas per instance*

*Instances (11)*:

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

69:     require(listing.seller != address(0), 'NFT is not listed for sale.');

113:     require(nukeFundAddress != address(0), 'NukeFund address not set');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

119:     require(nftContract.ownerOf(tokenId) != address(0), 'Token does not exist');

138:       nftContract.ownerOf(tokenId) != address(0),

187:       nftContract.ownerOf(tokenId) != address(0),

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

77:     require(entityForgingAddress_ != address(0), 'Invalid address');

85:     require(entropyGeneratorAddress_ != address(0), 'Invalid address');

91:     require(airdrop_ != address(0), 'Invalid address');

236:       ownerOf(tokenId) != address(0),

258:       ownerOf(tokenId) != address(0),

268:       ownerOf(tokenId) != address(0),

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-3"></a>[GAS-3] State variables should be cached in stack variables rather than re-reading them from storage

The instances below point to the second+ access of a state variable within a function. Caching of a state variable replaces each Gwarmaccess (100 gas) with a much cheaper stack read. Other less obvious fixes/optimizations include having local memory caches of state variable structs, or having local caches of state variable contracts/addresses.

*Saves 100 gas per instance*

*Instances (1)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

303:       currentGeneration,

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-4"></a>[GAS-4] Use calldata instead of memory for function arguments that do not get mutated

When a function with a `memory` array is called externally, the `abi.decode()` step has to use a for-loop to copy each index of the `calldata` to the `memory` index. Each iteration of this for-loop costs at least 60 gas (i.e. `60 * <mem_array>.length`). Using `calldata` directly bypasses this loop.

If the array is passed to an `internal` function which passes the array to another internal function where the array is modified and therefore `memory` is used in the `external` call, it's still more gas-efficient to use `calldata` when the `external` function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one.

 *Saves 60 gas per instance*

*Instances (1)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

157:     string memory

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-5"></a>[GAS-5] For Operations that will not overflow, you could use unchecked

*Instances (143)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

4: import '@openzeppelin/contracts/access/Ownable.sol';

5: import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

6: import '@openzeppelin/contracts/security/Pausable.sol';

7: import './IDevFund.sol';

16:       uint256 amountPerWeight = msg.value / totalDevWeight;

17:       uint256 remaining = msg.value - (amountPerWeight * totalDevWeight);

18:       totalRewardDebt += amountPerWeight;

36:     totalDevWeight += weight;

44:     totalDevWeight = totalDevWeight - info.weight + weight;

45:     info.pendingRewards += (totalRewardDebt - info.rewardDebt) * info.weight;

54:     totalDevWeight -= info.weight;

55:     info.pendingRewards += (totalRewardDebt - info.rewardDebt) * info.weight;

64:     uint256 pending = info.pendingRewards +

65:       (totalRewardDebt - info.rewardDebt) *

70:       info.pendingRewards = pending - claimedAmount;

80:       info.pendingRewards + (totalRewardDebt - info.rewardDebt) * info.weight;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

4: import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

5: import '@openzeppelin/contracts/access/Ownable.sol';

6: import '@openzeppelin/contracts/security/Pausable.sol';

7: import './IEntityForging.sol';

8: import '../TraitForgeNft/ITraitForgeNft.sol';

22:   mapping(uint256 => uint8) public forgingCounts; // track forgePotential

49:     _listings = new Listing[](listingCount + 1);

50:     for (uint256 i = 1; i <= listingCount; ++i) {

85:     uint256 entropy = nftContract.getTokenEntropy(tokenId); // Retrieve entropy for tokenId

86:     uint8 forgePotential = uint8((entropy / 10) % 10); // Extract the 5th digit from the entropy

92:     bool isForger = (entropy % 3) == 0; // Determine if the token is a forger based on entropy

95:     ++listingCount;

128:     _resetForgingCountIfNeeded(forgerTokenId); // Reset for forger if needed

129:     _resetForgingCountIfNeeded(mergerTokenId); // Reset for merger if needed

133:     forgingCounts[forgerTokenId]++;

138:     uint8 mergerForgePotential = uint8((mergerEntropy / 10) % 10); // Extract the 5th digit from the entropy

139:     forgingCounts[mergerTokenId]++;

146:     uint256 devFee = forgingFee / taxCut;

147:     uint256 forgerShare = forgingFee - devFee;

196:     emit CancelledListingForForging(tokenId); // Emitting with 0 fee to denote cancellation

203:     } else if (block.timestamp >= lastForgeResetTimestamp[tokenId] + oneYear) {

204:       forgingCounts[tokenId] = 0; // Reset to the forge potential

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

4: import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

5: import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

6: import '@openzeppelin/contracts/access/Ownable.sol';

7: import '@openzeppelin/contracts/security/Pausable.sol';

8: import './IEntityTrading.sol';

9: import '../TraitForgeNft/ITraitForgeNft.sol';

53:     nftContract.transferFrom(msg.sender, address(this), tokenId); // trasnfer NFT to contract

55:     ++listingCount;

72:     uint256 nukeFundContribution = msg.value / taxCut;

73:     uint256 sellerProceeds = msg.value - nukeFundContribution;

74:     transferToNukeFund(nukeFundContribution); // transfer contribution to nukeFund

81:     nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer NFT to the buyer

83:     delete listings[listedTokenIds[tokenId]]; // remove listing

91:     ); // emit an event for the sale

104:     nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer the nft back to seller

106:     delete listings[listedTokenIds[tokenId]]; // mark the listing as inactive or delete it

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

4: import '@openzeppelin/contracts/access/Ownable.sol';

5: import '@openzeppelin/contracts/security/Pausable.sol';

6: import './IEntropyGenerator.sol';

10:   uint256[770] private entropySlots; // Array to store entropy values

11:   uint256 private lastInitializedIndex = 0; // Indexes to keep track of the initialization and usage of entropy values

38:     emit AllowedCallerUpdated(_allowedCaller); // Emit an event for this update.

50:     uint256 endIndex = lastInitializedIndex + batchSize1; // calculate the end index for the batch

52:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

55:         ) % uint256(10) ** 78; // generate a  pseudo-random value using block number and index

57:         entropySlots[i] = pseudoRandomValue; // store the value in the slots array

70:     uint256 endIndex = lastInitializedIndex + batchSize1;

72:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

75:         ) % uint256(10) ** 78;

90:       for (uint256 i = lastInitializedIndex; i < maxSlotIndex; i++) {

93:         ) % uint256(10) ** 78;

105:     if (currentNumberIndex >= maxNumberIndex - 1) {

107:       if (currentSlotIndex >= maxSlotIndex - 1) {

110:         currentSlotIndex++;

113:       currentNumberIndex++;

152:     nukeFactor = entropy / 4000000;

160:     return (nukeFactor, forgePotential, performanceFactor, isForger); // return derived parammeters

177:     uint256 position = numberIndex * 6; // calculate the position for slicing the entropy value

180:     uint256 slotValue = entropySlots[slotIndex]; // slice the required [art of the entropy value

181:     uint256 entropy = (slotValue / (10 ** (72 - position))) % 1000000; // adjust the entropy value based on the number of digits

182:     uint256 paddedEntropy = entropy * (10 ** (6 - numberOfDigits(entropy)));

184:     return paddedEntropy; // return the caculated entropy value

191:       number /= 10;

192:       digits++;

200:       number /= 10;

208:       keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))

211:     uint256 slotIndexSelection = (hashValue % 258) + 512;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

4: import '@openzeppelin/contracts/access/Ownable.sol';

5: import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

6: import '@openzeppelin/contracts/security/Pausable.sol';

7: import './INukeFund.sol';

8: import '../TraitForgeNft/ITraitForgeNft.sol';

9: import '../Airdrop/IAirdrop.sol';

22:   uint256 public nukeFactorMaxParam = MAX_DENOMINATOR / 2;

35:     devAddress = _devAddress; // Set the developer's address

41:     uint256 devShare = msg.value / taxCut; // Calculate developer's share (10%)

42:     uint256 remainingFund = msg.value - devShare; // Calculate remaining funds to add to the fund

44:     fund += remainingFund; // Update the fund balance

59:     emit FundReceived(msg.sender, msg.value); // Log the received funds

60:     emit FundBalanceUpdated(fund); // Update the fund balance

86:     emit TraitForgeNftAddressUpdated(_traitForgeNft); // Emit an event when the address is updated.

91:     emit AirdropAddressUpdated(_airdrop); // Emit an event when the address is updated.

121:     uint256 daysOld = (block.timestamp -

122:       nftContract.getTokenCreationTimestamp(tokenId)) /

123:       60 /

124:       60 /

128:     uint256 age = (daysOld *

129:       perfomanceFactor *

130:       MAX_DENOMINATOR *

131:       ageMultiplier) / 365; // add 5 digits for decimals

145:     uint256 initialNukeFactor = entropy / 40; // calcualte initalNukeFactor based on entropy, 5 digits

147:     uint256 finalNukeFactor = ((adjustedAge * defaultNukeFactorIncrease) /

148:       MAX_DENOMINATOR) + initialNukeFactor;

165:     uint256 finalNukeFactor = calculateNukeFactor(tokenId); // finalNukeFactor has 5 digits

166:     uint256 potentialClaimAmount = (fund * finalNukeFactor) / MAX_DENOMINATOR; // Calculate the potential claim amount based on the finalNukeFactor

167:     uint256 maxAllowedClaimAmount = fund / maxAllowedClaimDivisor; // Define a maximum allowed claim amount as 50% of the current fund size

174:     fund -= claimAmount; // Deduct the claim amount from the fund

176:     nftContract.burn(tokenId); // Burn the token

180:     emit Nuked(msg.sender, tokenId, claimAmount); // Emit the event with the actual claim amount

181:     emit FundBalanceUpdated(fund); // Update the fund balance

190:     uint256 tokenAgeInSeconds = block.timestamp -

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

4: import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

5: import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

6: import '@openzeppelin/contracts/access/Ownable.sol';

7: import '@openzeppelin/contracts/security/Pausable.sol';

8: import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

9: import './ITraitForgeNft.sol';

10: import '../EntityForging/IEntityForging.sol';

11: import '../EntropyGenerator/IEntropyGenerator.sol';

12: import '../Airdrop/IAirdrop.sol';

62:     whitelistEndTime = block.timestamp + 24 hours;

70:     emit NukeFundContractUpdated(_nukeFundAddress); // Consider adding an event for this.

163:     uint256 newGeneration = getTokenGeneration(parent1Id) + 1;

173:     uint256 newEntropy = (forgerEntropy + mergerEntropy) / 2;

195:     uint256 excessPayment = msg.value - mintPrice;

217:       amountMinted++;

218:       budgetLeft -= mintPrice;

229:     uint256 priceIncrease = priceIncrement * currentGenMintCount;

230:     uint256 price = startPrice + priceIncrease;

285:     _tokenIds++;

293:     generationMintCounts[currentGeneration]++;

321:     _tokenIds++;

328:     generationMintCounts[gen]++;

350:     currentGeneration++;

352:     priceIncrement = priceIncrement + priceIncrementByGen;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-6"></a>[GAS-6] Use Custom Errors instead of Revert Strings to save Gas

Custom errors are available from solidity version 0.8.4. Custom errors save [**~50 gas**](https://gist.github.com/IllIllI000/ad1bd0d29a0101b25e57c293b4b0c746) each time they're hit by [avoiding having to allocate and store the revert string](https://blog.soliditylang.org/2021/04/21/custom-errors/#errors-in-depth). Not defining the strings also save deployment gas

Additionally, custom errors can be used inside and outside of contracts (including interfaces and libraries).

Source: <https://blog.soliditylang.org/2021/04/21/custom-errors/>:

> Starting from [Solidity v0.8.4](https://github.com/ethereum/solidity/releases/tag/v0.8.4), there is a convenient and gas-efficient way to explain to users why an operation failed through the use of custom errors. Until now, you could already use strings to give more information about failures (e.g., `revert("Insufficient funds.");`), but they are rather expensive, especially when it comes to deploy cost, and it is difficult to use dynamic information in them.

Consider replacing **all revert strings** with custom errors in the solution, and particularly those that have multiple occurrences:

*Instances (1)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

166:     require(newGeneration <= maxGeneration, "can't be over max generation");

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-7"></a>[GAS-7] Stack variable used as a cheaper cache for a state variable is only used once

If the variable is only accessed once, it's cheaper to use the state variable directly that one time, and save the **3 gas** the extra stack assignment would spend

*Instances (1)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

200:     uint256 oneYear = oneYearInDays;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

### <a name="GAS-8"></a>[GAS-8] State variables only set in the constructor should be declared `immutable`

Variables only set in the constructor and never edited afterwards should be marked as immutable, as it would avoid the expensive storage-writing operation in the constructor (around **20 000 gas** per variable) and replace the expensive storage-reading operations (around **2100 gas** per reading) to a less expensive value reading (**3 gas**)

*Instances (2)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

26:     nftContract = ITraitForgeNft(_traitForgeNft);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

23:     nftContract = ITraitForgeNft(_traitForgeNft);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

### <a name="GAS-9"></a>[GAS-9] Functions guaranteed to revert when called by normal users can be marked `payable`

If a function modifier such as `onlyOwner` is used, the function will revert if a normal user tries to pay the function. Marking the function as `payable` will lower the gas cost for legitimate callers because the compiler will not include checks for whether a payment was provided.

*Instances (25)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

30:   function addDev(address user, uint256 weight) external onlyOwner {

40:   function updateDev(address user, uint256 weight) external onlyOwner {

51:   function removeDev(address user) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

36:   function setTaxCut(uint256 _taxCut) external onlyOwner {

40:   function setOneYearInDays(uint256 value) external onlyOwner {

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

33:   function setTaxCut(uint256 _taxCut) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

36:   function setAllowedCaller(address _allowedCaller) external onlyOwner {

101:   function getNextEntropy() public onlyAllowedCaller returns (uint256) {

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

63:   function setTaxCut(uint256 _taxCut) external onlyOwner {

67:   function setMinimumDaysHeld(uint256 value) external onlyOwner {

71:   function setDefaultNukeFactorIncrease(uint256 value) external onlyOwner {

75:   function setMaxAllowedClaimDivisor(uint256 value) external onlyOwner {

79:   function setNukeFactorMaxParam(uint256 value) external onlyOwner {

84:   function setTraitForgeNftContract(address _traitForgeNft) external onlyOwner {

89:   function setAirdropContract(address _airdrop) external onlyOwner {

109:   function setAgeMultplier(uint256 _ageMultiplier) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

90:   function setAirdropContract(address airdrop_) external onlyOwner {

96:   function startAirdrop(uint256 amount) external whenNotPaused onlyOwner {

100:   function setStartPrice(uint256 _startPrice) external onlyOwner {

104:   function setPriceIncrement(uint256 _priceIncrement) external onlyOwner {

114:   function setMaxGeneration(uint maxGeneration_) external onlyOwner {

122:   function setRootHash(bytes32 rootHash_) external onlyOwner {

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-10"></a>[GAS-10] `++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)

Pre-increments and pre-decrements are cheaper.

For a `uint256 i` variable, the following is true with the Optimizer enabled at 10k:

**Increment:**

- `i += 1` is the most expensive form
- `i++` costs 6 gas less than `i += 1`
- `++i` costs 5 gas less than `i++` (11 gas less than `i += 1`)

**Decrement:**

- `i -= 1` is the most expensive form
- `i--` costs 11 gas less than `i -= 1`
- `--i` costs 5 gas less than `i--` (16 gas less than `i -= 1`)

Note that post-increments (or post-decrements) return the old value before incrementing or decrementing, hence the name *post-increment*:

```solidity
uint i = 1;  
uint j = 2;
require(j == i++, "This will be false as i is incremented after the comparison");
```
  
However, pre-increments (or pre-decrements) return the new value:
  
```solidity
uint i = 1;  
uint j = 2;
require(j == ++i, "This will be true as i is incremented before the comparison");
```

In the pre-increment case, the compiler has to create a temporary variable (when used) for returning `1` instead of `2`.

Consider using pre-increments and pre-decrements where they are relevant (meaning: not where post-increments/decrements logic are relevant).

*Saves 5 gas per instance*

*Instances (10)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

52:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

72:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

90:       for (uint256 i = lastInitializedIndex; i < maxSlotIndex; i++) {

110:         currentSlotIndex++;

113:       currentNumberIndex++;

192:       digits++;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

217:       amountMinted++;

285:     _tokenIds++;

321:     _tokenIds++;

350:     currentGeneration++;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-11"></a>[GAS-11] Using `private` rather than `public` for constants, saves gas

If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table

*Instances (1)*:

```solidity
File: ./contracts/NukeFund/NukeFund.sol

12:   uint256 public constant MAX_DENOMINATOR = 100000;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="GAS-12"></a>[GAS-12] Use shift right/left instead of division/multiplication if possible

While the `DIV` / `MUL` opcode uses 5 gas, the `SHR` / `SHL` opcode only uses 3 gas. Furthermore, beware that Solidity's division operation also includes a division-by-0 prevention which is bypassed using shifting. Eventually, overflow checks are never performed for shift operations as they are done for arithmetic operations. Instead, the result is always truncated, so the calculation can be unchecked in Solidity version `0.8+`

- Use `>> 1` instead of `/ 2`
- Use `>> 2` instead of `/ 4`
- Use `<< 3` instead of `* 8`
- ...
- Use `>> 5` instead of `/ 2^5 == / 32`
- Use `<< 6` instead of `* 2^6 == * 64`

TL;DR:

- Shifting left by N is like multiplying by 2^N (Each bits to the left is an increased power of 2)
- Shifting right by N is like dividing by 2^N (Each bits to the right is a decreased power of 2)

*Saves around 2 gas + 20 for unchecked per instance*

*Instances (2)*:

```solidity
File: ./contracts/NukeFund/NukeFund.sol

22:   uint256 public nukeFactorMaxParam = MAX_DENOMINATOR / 2;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

173:     uint256 newEntropy = (forgerEntropy + mergerEntropy) / 2;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-13"></a>[GAS-13] Use of `this` instead of marking as `public` an `external` function

Using `this.` is like making an expensive external call. Consider marking the called function as public

*Saves around 2000 gas per instance*

*Instances (1)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

70:     emit NukeFundContractUpdated(_nukeFundAddress); // Consider adding an event for this.

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="GAS-14"></a>[GAS-14] Increments/decrements can be unchecked in for-loops

In Solidity 0.8+, there's a default overflow check on unsigned integers. It's possible to uncheck this in for-loops and save some gas at each iteration, but at the cost of some code readability, as this uncheck cannot be made inline.

[ethereum/solidity#10695](https://github.com/ethereum/solidity/issues/10695)

The change would be:

```diff
- for (uint256 i; i < numIterations; i++) {
+ for (uint256 i; i < numIterations;) {
 // ...  
+   unchecked { ++i; }
}  
```

These save around **25 gas saved** per instance.

The same can be applied with decrements (which should use `break` when `i == 0`).

The risk of overflow is non-existent for `uint256`.

*Instances (6)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

50:     for (uint256 i = 1; i <= listingCount; ++i) {

133:     forgingCounts[forgerTokenId]++;

139:     forgingCounts[mergerTokenId]++;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

52:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

72:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

90:       for (uint256 i = lastInitializedIndex; i < maxSlotIndex; i++) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

### <a name="GAS-15"></a>[GAS-15] Use != 0 instead of > 0 for unsigned integer comparison

*Instances (13)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

15:     if (totalDevWeight > 0) {

19:       if (remaining > 0) {

32:     require(weight > 0, 'Invalid weight');

42:     require(weight > 0, 'Invalid weight');

43:     require(info.weight > 0, 'Not dev address');

53:     require(info.weight > 0, 'Not dev address');

68:     if (pending > 0) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

88:       forgePotential > 0 && forgingCounts[tokenId] <= forgePotential,

141:       mergerForgePotential > 0 &&

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

42:     require(price > 0, 'Price must be greater than zero');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

196:     if (excessPayment > 0) {

221:     if (budgetLeft > 0) {

381:     if (listedId > 0) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

## Non Critical Issues

| |Issue|Instances|
|-|:-|:-:|
| [NC-1](#NC-1) | Missing checks for `address(0)` when assigning values to address state variables | 3 |
| [NC-2](#NC-2) | Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked` | 6 |
| [NC-3](#NC-3) | `constant`s should be defined rather than using magic numbers | 46 |
| [NC-4](#NC-4) | Control structures do not follow the Solidity Style Guide | 10 |
| [NC-5](#NC-5) | Consider disabling `renounceOwnership()` | 5 |
| [NC-6](#NC-6) | Duplicated `require()`/`revert()` Checks Should Be Refactored To A Modifier Or Function | 21 |
| [NC-7](#NC-7) | Events that mark critical parameter changes should contain both the old and the new value | 7 |
| [NC-8](#NC-8) | Function ordering does not follow the Solidity style guide | 5 |
| [NC-9](#NC-9) | Functions should not be longer than 50 lines | 53 |
| [NC-10](#NC-10) | Change int to int256 | 3 |
| [NC-11](#NC-11) | Change uint to uint256 | 4 |
| [NC-12](#NC-12) | Lack of checks in setters | 23 |
| [NC-13](#NC-13) | Missing Event for critical parameters change | 21 |
| [NC-14](#NC-14) | NatSpec is completely non-existent on functions that should have them | 48 |
| [NC-15](#NC-15) | Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor | 1 |
| [NC-16](#NC-16) | Consider using named mappings | 13 |
| [NC-17](#NC-17) | Owner can renounce while system is paused | 2 |
| [NC-18](#NC-18) | Adding a `return` statement when the function defines a named return variable, is redundant | 1 |
| [NC-19](#NC-19) | Use scientific notation for readability reasons for large multiples of ten | 3 |
| [NC-20](#NC-20) | Avoid the use of sensitive terms | 9 |
| [NC-21](#NC-21) | Strings should use double quotes rather than single quotes | 85 |
| [NC-22](#NC-22) | Use Underscores for Number Literals (add an underscore every 3 digits) | 7 |
| [NC-23](#NC-23) | Internal and private variables and functions names should begin with an underscore | 16 |
| [NC-24](#NC-24) | Constants should be defined rather than using magic numbers | 1 |
| [NC-25](#NC-25) | `public` functions not called by the contract should be declared `external` instead | 19 |
| [NC-26](#NC-26) | Variables need not be initialized to zero | 7 |

### <a name="NC-1"></a>[NC-1] Missing checks for `address(0)` when assigning values to address state variables

*Instances (3)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

31:     allowedCaller = _traitForgetNft;

37:     allowedCaller = _allowedCaller;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

69:     nukeFundAddress = _nukeFundAddress;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-2"></a>[NC-2] Use `string.concat()` or `bytes.concat()` instead of `abi.encodePacked`

Solidity version 0.8.4 introduces `bytes.concat()` (vs `abi.encodePacked(<bytes>,<bytes>)`)

Solidity version 0.8.12 introduces `string.concat()` (vs `abi.encodePacked(<str>,<str>), which catches concatenation errors (in the event of a`bytes`data mixed in the concatenation)`)

*Instances (6)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

54:           keccak256(abi.encodePacked(block.number, i))

74:           keccak256(abi.encodePacked(block.number, i))

92:           keccak256(abi.encodePacked(block.number, i))

208:       keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

188:     onlyWhitelisted(proof, keccak256(abi.encodePacked(msg.sender)))

209:     onlyWhitelisted(proof, keccak256(abi.encodePacked(msg.sender)))

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-3"></a>[NC-3] `constant`s should be defined rather than using magic numbers

Even [assembly](https://github.com/code-423n4/2022-05-opensea-seaport/blob/9d7ce4d08bf3c3010304a0476a785c70c0e90ae7/contracts/lib/TokenTransferrer.sol#L35-L39) can benefit from using readable constants instead of hex/numeric literals

*Instances (46)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

13:   uint256 public taxCut = 10;

14:   uint256 public oneYearInDays = 365 days;

86:     uint8 forgePotential = uint8((entropy / 10) % 10); // Extract the 5th digit from the entropy

92:     bool isForger = (entropy % 3) == 0; // Determine if the token is a forger based on entropy

137:     require(mergerEntropy % 3 != 0, 'Not merger');

138:     uint8 mergerForgePotential = uint8((mergerEntropy / 10) % 10); // Extract the 5th digit from the entropy

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

14:   uint256 public taxCut = 10;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

14:   uint256 private batchSize1 = 256;

15:   uint256 private batchSize2 = 512;

17:   uint256 private maxSlotIndex = 770;

18:   uint256 private maxNumberIndex = 13;

55:         ) % uint256(10) ** 78; // generate a  pseudo-random value using block number and index

56:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

67:       'Batch 2 not ready or already initialized.'

75:         ) % uint256(10) ** 78;

76:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

87:       'Batch 3 not ready or already completed.'

93:         ) % uint256(10) ** 78;

152:     nukeFactor = entropy / 4000000;

154:     performanceFactor = entropy % 10;

157:     uint256 role = entropy % 3;

174:       return 999999;

177:     uint256 position = numberIndex * 6; // calculate the position for slicing the entropy value

178:     require(position <= 72, 'Position calculation error');

181:     uint256 entropy = (slotValue / (10 ** (72 - position))) % 1000000; // adjust the entropy value based on the number of digits

191:       number /= 10;

199:     while (number >= 10) {

200:       number /= 10;

211:     uint256 slotIndexSelection = (hashValue % 258) + 512;

212:     uint256 numberIndexSelection = hashValue % 13;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

19:   uint256 public taxCut = 10;

20:   uint256 public defaultNukeFactorIncrease = 250;

21:   uint256 public maxAllowedClaimDivisor = 2;

22:   uint256 public nukeFactorMaxParam = MAX_DENOMINATOR / 2;

23:   uint256 public minimumDaysHeld = 3 days;

123:       60 /

124:       60 /

125:       24;

126:     uint256 perfomanceFactor = nftContract.getTokenEntropy(tokenId) % 10;

131:       ageMultiplier) / 365; // add 5 digits for decimals

145:     uint256 initialNukeFactor = entropy / 40; // calcualte initalNukeFactor based on entropy, 5 digits

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

22:   uint256 public maxTokensPerGen = 10000;

35:   uint256 public maxGeneration = 10;

62:     whitelistEndTime = block.timestamp + 24 hours;

173:     uint256 newEntropy = (forgerEntropy + mergerEntropy) / 2;

276:     uint256 roleIndicator = entropy % 3;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-4"></a>[NC-4] Control structures do not follow the Solidity Style Guide

See the [control structures](https://docs.soliditylang.org/en/latest/style-guide.html#control-structures) section of the Solidity Style Guide

*Instances (10)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

88:     if (amount > _rewardBalance) amount = _rewardBalance;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

83:     _resetForgingCountIfNeeded(tokenId);

92:     bool isForger = (entropy % 3) == 0; // Determine if the token is a forger based on entropy

117:       'Caller should be different from forger token owner'

128:     _resetForgingCountIfNeeded(forgerTokenId); // Reset for forger if needed

129:     _resetForgingCountIfNeeded(mergerTokenId); // Reset for merger if needed

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

170:     if (

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

54:         MerkleProof.verify(proof, rootHash, leaf),

331:     if (

385:       if (

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-5"></a>[NC-5] Consider disabling `renounceOwnership()`

If the plan for your project does not include eventually giving up all ownership control, consider overwriting OpenZeppelin's `Ownable`'s `renounceOwnership()` function in order to disable it.

*Instances (5)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

9: contract DevFund is IDevFund, Ownable, ReentrancyGuard, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

10: contract EntityForging is IEntityForging, ReentrancyGuard, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

11: contract EntityTrading is IEntityTrading, ReentrancyGuard, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

9: contract EntropyGenerator is IEntropyGenerator, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

11: contract NukeFund is INukeFund, ReentrancyGuard, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="NC-6"></a>[NC-6] Duplicated `require()`/`revert()` Checks Should Be Refactored To A Modifier Or Function

*Instances (21)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

21:         require(success, 'Failed to send Ether to owner');

25:       require(success, 'Failed to send Ether to owner');

32:     require(weight > 0, 'Invalid weight');

42:     require(weight > 0, 'Invalid weight');

43:     require(info.weight > 0, 'Not dev address');

53:     require(info.weight > 0, 'Not dev address');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

74:     require(

180:     require(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

56:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

76:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

48:       require(success, 'ETH send failed');

52:       require(success, 'ETH send failed');

55:       require(success, 'ETH send failed');

137:     require(

186:     require(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

77:     require(entityForgingAddress_ != address(0), 'Invalid address');

85:     require(entropyGeneratorAddress_ != address(0), 'Invalid address');

91:     require(airdrop_ != address(0), 'Invalid address');

235:     require(

257:     require(

267:     require(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-7"></a>[NC-7] Events that mark critical parameter changes should contain both the old and the new value

This should especially be done if the new value is not required to be different from the old value

*Instances (7)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

40:   function updateDev(address user, uint256 weight) external onlyOwner {
        DevInfo storage info = devInfo[user];
        require(weight > 0, 'Invalid weight');
        require(info.weight > 0, 'Not dev address');
        totalDevWeight = totalDevWeight - info.weight + weight;
        info.pendingRewards += (totalRewardDebt - info.rewardDebt) * info.weight;
        info.rewardDebt = totalRewardDebt;
        info.weight = weight;
        emit UpdateDev(user, weight);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

36:   function setAllowedCaller(address _allowedCaller) external onlyOwner {
        allowedCaller = _allowedCaller;
        emit AllowedCallerUpdated(_allowedCaller); // Emit an event for this update.

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

84:   function setTraitForgeNftContract(address _traitForgeNft) external onlyOwner {
        nftContract = ITraitForgeNft(_traitForgeNft);
        emit TraitForgeNftAddressUpdated(_traitForgeNft); // Emit an event when the address is updated.

89:   function setAirdropContract(address _airdrop) external onlyOwner {
        airdropContract = IAirdrop(_airdrop);
        emit AirdropAddressUpdated(_airdrop); // Emit an event when the address is updated.

94:   function setDevAddress(address payable account) external onlyOwner {
        devAddress = account;
        emit DevAddressUpdated(account);

99:   function setDaoAddress(address payable account) external onlyOwner {
        daoAddress = account;
        emit DaoAddressUpdated(account);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

66:   function setNukeFundContract(
        address payable _nukeFundAddress
      ) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;
        emit NukeFundContractUpdated(_nukeFundAddress); // Consider adding an event for this.

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-8"></a>[NC-8] Function ordering does not follow the Solidity style guide

According to the [Solidity style guide](https://docs.soliditylang.org/en/v0.8.17/style-guide.html#order-of-functions), functions should be laid out in the following order :`constructor()`, `receive()`, `fallback()`, `external`, `public`, `internal`, `private`, but the cases below do not follow this pattern

*Instances (5)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

1: 
   Current order:
   external setNukeFundAddress
   external setTaxCut
   external setOneYearInDays
   external setMinimumListingFee
   external fetchListings
   external getListedTokenIds
   external getListings
   public listForForging
   external forgeWithListed
   external cancelListingForForging
   internal _cancelListingForForging
   private _resetForgingCountIfNeeded
   
   Suggested order:
   external setNukeFundAddress
   external setTaxCut
   external setOneYearInDays
   external setMinimumListingFee
   external fetchListings
   external getListedTokenIds
   external getListings
   external forgeWithListed
   external cancelListingForForging
   public listForForging
   internal _cancelListingForForging
   private _resetForgingCountIfNeeded

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

1: 
   Current order:
   external setNukeFundAddress
   external setTaxCut
   public listNFTForSale
   external buyNFT
   public cancelListing
   private transferToNukeFund
   
   Suggested order:
   external setNukeFundAddress
   external setTaxCut
   external buyNFT
   public listNFTForSale
   public cancelListing
   private transferToNukeFund

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

1: 
   Current order:
   external setAllowedCaller
   external getAllowedCaller
   public writeEntropyBatch1
   public writeEntropyBatch2
   public writeEntropyBatch3
   public getNextEntropy
   public getPublicEntropy
   public getLastInitializedIndex
   public deriveTokenParameters
   private getEntropy
   private numberOfDigits
   private getFirstDigit
   public initializeAlphaIndices
   
   Suggested order:
   external setAllowedCaller
   external getAllowedCaller
   public writeEntropyBatch1
   public writeEntropyBatch2
   public writeEntropyBatch3
   public getNextEntropy
   public getPublicEntropy
   public getLastInitializedIndex
   public deriveTokenParameters
   public initializeAlphaIndices
   private getEntropy
   private numberOfDigits
   private getFirstDigit

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

1: 
   Current order:
   external setTaxCut
   external setMinimumDaysHeld
   external setDefaultNukeFactorIncrease
   external setMaxAllowedClaimDivisor
   external setNukeFactorMaxParam
   external setTraitForgeNftContract
   external setAirdropContract
   external setDevAddress
   external setDaoAddress
   public getFundBalance
   external setAgeMultplier
   public getAgeMultiplier
   public calculateAge
   public calculateNukeFactor
   public nuke
   public canTokenBeNuked
   
   Suggested order:
   external setTaxCut
   external setMinimumDaysHeld
   external setDefaultNukeFactorIncrease
   external setMaxAllowedClaimDivisor
   external setNukeFactorMaxParam
   external setTraitForgeNftContract
   external setAirdropContract
   external setDevAddress
   external setDaoAddress
   external setAgeMultplier
   public getFundBalance
   public getAgeMultiplier
   public calculateAge
   public calculateNukeFactor
   public nuke
   public canTokenBeNuked

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

1: 
   Current order:
   external setNukeFundContract
   external setEntityForgingContract
   external setEntropyGenerator
   external setAirdropContract
   external startAirdrop
   external setStartPrice
   external setPriceIncrement
   external setPriceIncrementByGen
   external setMaxGeneration
   external setRootHash
   external setWhitelistEndTime
   public getGeneration
   public isApprovedOrOwner
   external burn
   external forge
   public mintToken
   public mintWithBudget
   public calculateMintPrice
   public getTokenEntropy
   public getTokenGeneration
   public getEntropiesForTokens
   public getTokenLastTransferredTimestamp
   public getTokenCreationTimestamp
   public isForger
   internal _mintInternal
   private _mintNewEntity
   private _incrementGeneration
   private _distributeFunds
   internal _beforeTokenTransfer
   
   Suggested order:
   external setNukeFundContract
   external setEntityForgingContract
   external setEntropyGenerator
   external setAirdropContract
   external startAirdrop
   external setStartPrice
   external setPriceIncrement
   external setPriceIncrementByGen
   external setMaxGeneration
   external setRootHash
   external setWhitelistEndTime
   external burn
   external forge
   public getGeneration
   public isApprovedOrOwner
   public mintToken
   public mintWithBudget
   public calculateMintPrice
   public getTokenEntropy
   public getTokenGeneration
   public getEntropiesForTokens
   public getTokenLastTransferredTimestamp
   public getTokenCreationTimestamp
   public isForger
   internal _mintInternal
   internal _beforeTokenTransfer
   private _mintNewEntity
   private _incrementGeneration
   private _distributeFunds

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-9"></a>[NC-9] Functions should not be longer than 50 lines

Overly complex code can make understanding functionality more difficult, try to further modularize your code to ensure readability

*Instances (53)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

30:   function addDev(address user, uint256 weight) external onlyOwner {

40:   function updateDev(address user, uint256 weight) external onlyOwner {

51:   function removeDev(address user) external onlyOwner {

61:   function claim() external whenNotPaused nonReentrant {

77:   function pendingRewards(address user) external view returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

36:   function setTaxCut(uint256 _taxCut) external onlyOwner {

40:   function setOneYearInDays(uint256 value) external onlyOwner {

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {

48:   function fetchListings() external view returns (Listing[] memory _listings) {

193:   function _cancelListingForForging(uint256 tokenId) internal {

199:   function _resetForgingCountIfNeeded(uint256 tokenId) private {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

33:   function setTaxCut(uint256 _taxCut) external onlyOwner {

63:   function buyNFT(uint256 tokenId) external payable whenNotPaused nonReentrant {

94:   function cancelListing(uint256 tokenId) public whenNotPaused nonReentrant {

112:   function transferToNukeFund(uint256 amount) private {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

36:   function setAllowedCaller(address _allowedCaller) external onlyOwner {

42:   function getAllowedCaller() external view returns (address) {

101:   function getNextEntropy() public onlyAllowedCaller returns (uint256) {

131:   function getLastInitializedIndex() public view returns (uint256) {

188:   function numberOfDigits(uint256 number) private pure returns (uint256) {

198:   function getFirstDigit(uint256 number) private pure returns (uint256) {

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

63:   function setTaxCut(uint256 _taxCut) external onlyOwner {

67:   function setMinimumDaysHeld(uint256 value) external onlyOwner {

71:   function setDefaultNukeFactorIncrease(uint256 value) external onlyOwner {

75:   function setMaxAllowedClaimDivisor(uint256 value) external onlyOwner {

79:   function setNukeFactorMaxParam(uint256 value) external onlyOwner {

84:   function setTraitForgeNftContract(address _traitForgeNft) external onlyOwner {

89:   function setAirdropContract(address _airdrop) external onlyOwner {

94:   function setDevAddress(address payable account) external onlyOwner {

99:   function setDaoAddress(address payable account) external onlyOwner {

105:   function getFundBalance() public view returns (uint256) {

109:   function setAgeMultplier(uint256 _ageMultiplier) external onlyOwner {

113:   function getAgeMultiplier() public view returns (uint256) {

118:   function calculateAge(uint256 tokenId) public view returns (uint256) {

136:   function calculateNukeFactor(uint256 tokenId) public view returns (uint256) {

153:   function nuke(uint256 tokenId) public whenNotPaused nonReentrant {

184:   function canTokenBeNuked(uint256 tokenId) public view returns (bool) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

90:   function setAirdropContract(address airdrop_) external onlyOwner {

96:   function startAirdrop(uint256 amount) external whenNotPaused onlyOwner {

100:   function setStartPrice(uint256 _startPrice) external onlyOwner {

104:   function setPriceIncrement(uint256 _priceIncrement) external onlyOwner {

114:   function setMaxGeneration(uint maxGeneration_) external onlyOwner {

122:   function setRootHash(bytes32 rootHash_) external onlyOwner {

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {

130:   function getGeneration() public view returns (uint256) {

141:   function burn(uint256 tokenId) external whenNotPaused nonReentrant {

227:   function calculateMintPrice() public view returns (uint256) {

234:   function getTokenEntropy(uint256 tokenId) public view returns (uint256) {

242:   function getTokenGeneration(uint256 tokenId) public view returns (uint256) {

274:   function isForger(uint256 tokenId) public view returns (bool) {

280:   function _mintInternal(address to, uint256 mintPrice) internal {

358:   function _distributeFunds(uint256 totalAmount) private {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-10"></a>[NC-10] Change int to int256

Throughout the code base, some variables are declared as `int`. To favor explicitness, consider changing all instances of `int` to `int256`

*Instances (3)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

171:       slotIndex == slotIndexSelectionPoint &&

214:     slotIndexSelectionPoint = slotIndexSelection;

215:     numberIndexSelectionPoint = numberIndexSelection;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

### <a name="NC-11"></a>[NC-11] Change uint to uint256

Throughout the code base, some variables are declared as `uint`. To favor explicitness, consider changing all instances of `uint` to `uint256`

*Instances (4)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

56:     uint tokenId_

62:     uint id

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

114:   function setMaxGeneration(uint maxGeneration_) external onlyOwner {

375:     uint listedId = entityForgingContract.getListedTokenIds(firstTokenId);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-12"></a>[NC-12] Lack of checks in setters

Be it sanity checks (like checks against `0`-values) or initial setting checks: it's best for Setter functions to have them

*Instances (23)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

30:   function setNukeFundAddress(
        address payable _nukeFundAddress
      ) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;

36:   function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;

40:   function setOneYearInDays(uint256 value) external onlyOwner {
        oneYearInDays = value;

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {
        minimumListFee = _fee;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

27:   function setNukeFundAddress(
        address payable _nukeFundAddress
      ) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;

33:   function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

36:   function setAllowedCaller(address _allowedCaller) external onlyOwner {
        allowedCaller = _allowedCaller;
        emit AllowedCallerUpdated(_allowedCaller); // Emit an event for this update.

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

63:   function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;

67:   function setMinimumDaysHeld(uint256 value) external onlyOwner {
        minimumDaysHeld = value;

71:   function setDefaultNukeFactorIncrease(uint256 value) external onlyOwner {
        defaultNukeFactorIncrease = value;

75:   function setMaxAllowedClaimDivisor(uint256 value) external onlyOwner {
        maxAllowedClaimDivisor = value;

79:   function setNukeFactorMaxParam(uint256 value) external onlyOwner {
        nukeFactorMaxParam = value;

84:   function setTraitForgeNftContract(address _traitForgeNft) external onlyOwner {
        nftContract = ITraitForgeNft(_traitForgeNft);
        emit TraitForgeNftAddressUpdated(_traitForgeNft); // Emit an event when the address is updated.

89:   function setAirdropContract(address _airdrop) external onlyOwner {
        airdropContract = IAirdrop(_airdrop);
        emit AirdropAddressUpdated(_airdrop); // Emit an event when the address is updated.

94:   function setDevAddress(address payable account) external onlyOwner {
        devAddress = account;
        emit DevAddressUpdated(account);

99:   function setDaoAddress(address payable account) external onlyOwner {
        daoAddress = account;
        emit DaoAddressUpdated(account);

109:   function setAgeMultplier(uint256 _ageMultiplier) external onlyOwner {
         ageMultiplier = _ageMultiplier;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

66:   function setNukeFundContract(
        address payable _nukeFundAddress
      ) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;
        emit NukeFundContractUpdated(_nukeFundAddress); // Consider adding an event for this.

100:   function setStartPrice(uint256 _startPrice) external onlyOwner {
         startPrice = _startPrice;

104:   function setPriceIncrement(uint256 _priceIncrement) external onlyOwner {
         priceIncrement = _priceIncrement;

108:   function setPriceIncrementByGen(
         uint256 _priceIncrementByGen
       ) external onlyOwner {
         priceIncrementByGen = _priceIncrementByGen;

122:   function setRootHash(bytes32 rootHash_) external onlyOwner {
         rootHash = rootHash_;

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {
         whitelistEndTime = endTime_;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-13"></a>[NC-13] Missing Event for critical parameters change

Events help non-contract tools to track changes, and events prevent users from being surprised by changes.

*Instances (21)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

30:   function setNukeFundAddress(
        address payable _nukeFundAddress
      ) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;

36:   function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;

40:   function setOneYearInDays(uint256 value) external onlyOwner {
        oneYearInDays = value;

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {
        minimumListFee = _fee;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

27:   function setNukeFundAddress(
        address payable _nukeFundAddress
      ) external onlyOwner {
        nukeFundAddress = _nukeFundAddress;

33:   function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

63:   function setTaxCut(uint256 _taxCut) external onlyOwner {
        taxCut = _taxCut;

67:   function setMinimumDaysHeld(uint256 value) external onlyOwner {
        minimumDaysHeld = value;

71:   function setDefaultNukeFactorIncrease(uint256 value) external onlyOwner {
        defaultNukeFactorIncrease = value;

75:   function setMaxAllowedClaimDivisor(uint256 value) external onlyOwner {
        maxAllowedClaimDivisor = value;

79:   function setNukeFactorMaxParam(uint256 value) external onlyOwner {
        nukeFactorMaxParam = value;

109:   function setAgeMultplier(uint256 _ageMultiplier) external onlyOwner {
         ageMultiplier = _ageMultiplier;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

74:   function setEntityForgingContract(
        address entityForgingAddress_
      ) external onlyOwner {
        require(entityForgingAddress_ != address(0), 'Invalid address');
    
        entityForgingContract = IEntityForging(entityForgingAddress_);

82:   function setEntropyGenerator(
        address entropyGeneratorAddress_
      ) external onlyOwner {
        require(entropyGeneratorAddress_ != address(0), 'Invalid address');
    
        entropyGenerator = IEntropyGenerator(entropyGeneratorAddress_);

90:   function setAirdropContract(address airdrop_) external onlyOwner {
        require(airdrop_ != address(0), 'Invalid address');
    
        airdropContract = IAirdrop(airdrop_);

100:   function setStartPrice(uint256 _startPrice) external onlyOwner {
         startPrice = _startPrice;

104:   function setPriceIncrement(uint256 _priceIncrement) external onlyOwner {
         priceIncrement = _priceIncrement;

108:   function setPriceIncrementByGen(
         uint256 _priceIncrementByGen
       ) external onlyOwner {
         priceIncrementByGen = _priceIncrementByGen;

114:   function setMaxGeneration(uint maxGeneration_) external onlyOwner {
         require(
           maxGeneration_ >= currentGeneration,
           "can't below than current generation"
         );
         maxGeneration = maxGeneration_;

122:   function setRootHash(bytes32 rootHash_) external onlyOwner {
         rootHash = rootHash_;

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {
         whitelistEndTime = endTime_;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-14"></a>[NC-14] NatSpec is completely non-existent on functions that should have them

Public and external functions that aren't view or pure should have NatSpec comments

*Instances (48)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

30:   function addDev(address user, uint256 weight) external onlyOwner {

40:   function updateDev(address user, uint256 weight) external onlyOwner {

51:   function removeDev(address user) external onlyOwner {

61:   function claim() external whenNotPaused nonReentrant {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

30:   function setNukeFundAddress(

36:   function setTaxCut(uint256 _taxCut) external onlyOwner {

40:   function setOneYearInDays(uint256 value) external onlyOwner {

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {

67:   function listForForging(

102:   function forgeWithListed(

177:   function cancelListingForForging(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

27:   function setNukeFundAddress(

33:   function setTaxCut(uint256 _taxCut) external onlyOwner {

38:   function listNFTForSale(

63:   function buyNFT(uint256 tokenId) external payable whenNotPaused nonReentrant {

94:   function cancelListing(uint256 tokenId) public whenNotPaused nonReentrant {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

36:   function setAllowedCaller(address _allowedCaller) external onlyOwner {

47:   function writeEntropyBatch1() public {

64:   function writeEntropyBatch2() public {

84:   function writeEntropyBatch3() public {

101:   function getNextEntropy() public onlyAllowedCaller returns (uint256) {

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

63:   function setTaxCut(uint256 _taxCut) external onlyOwner {

67:   function setMinimumDaysHeld(uint256 value) external onlyOwner {

71:   function setDefaultNukeFactorIncrease(uint256 value) external onlyOwner {

75:   function setMaxAllowedClaimDivisor(uint256 value) external onlyOwner {

79:   function setNukeFactorMaxParam(uint256 value) external onlyOwner {

84:   function setTraitForgeNftContract(address _traitForgeNft) external onlyOwner {

89:   function setAirdropContract(address _airdrop) external onlyOwner {

94:   function setDevAddress(address payable account) external onlyOwner {

99:   function setDaoAddress(address payable account) external onlyOwner {

109:   function setAgeMultplier(uint256 _ageMultiplier) external onlyOwner {

153:   function nuke(uint256 tokenId) public whenNotPaused nonReentrant {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

66:   function setNukeFundContract(

74:   function setEntityForgingContract(

82:   function setEntropyGenerator(

90:   function setAirdropContract(address airdrop_) external onlyOwner {

96:   function startAirdrop(uint256 amount) external whenNotPaused onlyOwner {

100:   function setStartPrice(uint256 _startPrice) external onlyOwner {

104:   function setPriceIncrement(uint256 _priceIncrement) external onlyOwner {

108:   function setPriceIncrementByGen(

114:   function setMaxGeneration(uint maxGeneration_) external onlyOwner {

122:   function setRootHash(bytes32 rootHash_) external onlyOwner {

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {

141:   function burn(uint256 tokenId) external whenNotPaused nonReentrant {

153:   function forge(

181:   function mintToken(

202:   function mintWithBudget(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-15"></a>[NC-15] Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor

If a function is supposed to be access-controlled, a `modifier` should be used instead of a `require/if` statement for more readability.

*Instances (1)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

26:     require(msg.sender == allowedCaller, 'Caller is not allowed');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

### <a name="NC-16"></a>[NC-16] Consider using named mappings

Consider moving to solidity version 0.8.18 or later, and using [named mappings](https://ethereum.stackexchange.com/questions/51629/how-to-name-the-arguments-in-mapping/145555#145555) to make it easier to understand the purpose of each mapping

*Instances (13)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

12:   mapping(address => DevInfo) public devInfo;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

19:   mapping(uint256 => uint256) public listedTokenIds;

21:   mapping(uint256 => Listing) public listings;

22:   mapping(uint256 => uint8) public forgingCounts; // track forgePotential

23:   mapping(uint256 => uint256) private lastForgeResetTimestamp;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

18:   mapping(uint256 => uint256) public listedTokenIds;

20:   mapping(uint256 => Listing) public listings;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

42:   mapping(uint256 => uint256) public tokenCreationTimestamps;

43:   mapping(uint256 => uint256) public lastTokenTransferredTimestamp;

44:   mapping(uint256 => uint256) public tokenEntropy;

45:   mapping(uint256 => uint256) public generationMintCounts;

46:   mapping(uint256 => uint256) public tokenGenerations;

47:   mapping(uint256 => address) public initialOwners;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-17"></a>[NC-17] Owner can renounce while system is paused

The contract owner or single user with a role is not prevented from renouncing the role/ownership while the contract is paused, which would cause any user assets stored in the protocol, to be locked indefinitely.

*Instances (2)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

96:   function startAirdrop(uint256 amount) external whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-18"></a>[NC-18] Adding a `return` statement when the function defines a named return variable, is redundant

*Instances (1)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

136:   function deriveTokenParameters(
         uint256 slotIndex,
         uint256 numberIndex
       )
         public
         view
         returns (
           uint256 nukeFactor,
           uint256 forgePotential,
           uint256 performanceFactor,
           bool isForger
         )
       {
         uint256 entropy = getEntropy(slotIndex, numberIndex);
     
         // example calcualtions using entropyto derive game-related parameters
         nukeFactor = entropy / 4000000;
         forgePotential = getFirstDigit(entropy);
         performanceFactor = entropy % 10;
     
         // exmaple logic to determine a boolean property based on entropy
         uint256 role = entropy % 3;
         isForger = role == 0;
     
         return (nukeFactor, forgePotential, performanceFactor, isForger); // return derived parammeters

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

### <a name="NC-19"></a>[NC-19] Use scientific notation for readability reasons for large multiples of ten

The more a number has zeros, the harder it becomes to see with the eyes if it's the intended value. To ease auditing and bug bounty hunting, consider using the scientific notation

*Instances (3)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

152:     nukeFactor = entropy / 4000000;

181:     uint256 entropy = (slotValue / (10 ** (72 - position))) % 1000000; // adjust the entropy value based on the number of digits

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

12:   uint256 public constant MAX_DENOMINATOR = 100000;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="NC-20"></a>[NC-20] Avoid the use of sensitive terms

Use [alternative variants](https://www.zdnet.com/article/mysql-drops-master-slave-and-blacklist-whitelist-terminology/), e.g. allowlist/denylist instead of whitelist/blacklist

*Instances (9)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

39:   uint256 public whitelistEndTime;

51:   modifier onlyWhitelisted(bytes32[] calldata proof, bytes32 leaf) {

52:     if (block.timestamp <= whitelistEndTime) {

55:         'Not whitelisted user'

62:     whitelistEndTime = block.timestamp + 24 hours;

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {

127:     whitelistEndTime = endTime_;

188:     onlyWhitelisted(proof, keccak256(abi.encodePacked(msg.sender)))

209:     onlyWhitelisted(proof, keccak256(abi.encodePacked(msg.sender)))

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-21"></a>[NC-21] Strings should use double quotes rather than single quotes

See the Solidity Style Guide: <https://docs.soliditylang.org/en/v0.8.20/style-guide.html#other-recommendations>

*Instances (85)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

20:         (bool success, ) = payable(owner()).call{ value: remaining }('');

21:         require(success, 'Failed to send Ether to owner');

24:       (bool success, ) = payable(owner()).call{ value: msg.value }('');

25:       require(success, 'Failed to send Ether to owner');

32:     require(weight > 0, 'Invalid weight');

33:     require(info.weight == 0, 'Already registered');

42:     require(weight > 0, 'Invalid weight');

43:     require(info.weight > 0, 'Not dev address');

53:     require(info.weight > 0, 'Not dev address');

89:     (bool success, ) = payable(to).call{ value: amount }('');

90:     require(success, 'Failed to send Reward');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

73:     require(!_listingInfo.isListed, 'Token is already listed for forging');

76:       'Caller must own the token'

80:       'Fee should be higher than minimum listing fee'

89:       'Entity has reached its forging limit'

93:     require(isForger, 'Only forgers can list for forging');

113:       'Caller must own the merger token'

117:       'Caller should be different from forger token owner'

122:       'Invalid token generation'

126:     require(msg.value >= forgingFee, 'Insufficient fee for forging');

137:     require(mergerEntropy % 3 != 0, 'Not merger');

143:       'forgePotential insufficient'

154:       ''

156:     (bool success, ) = nukeFundAddress.call{ value: devFee }('');

157:     require(success, 'Failed to send to NukeFund');

158:     (bool success_forge, ) = forgerOwner.call{ value: forgerShare }('');

159:     require(success_forge, 'Failed to send to Forge Owner');

183:       'Caller must own the token'

187:       'Token not listed for forging'

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

42:     require(price > 0, 'Price must be greater than zero');

45:       'Sender must be the NFT owner.'

50:       'Contract must be approved to transfer the NFT.'

67:       'ETH sent does not match the listing price'

69:     require(listing.seller != address(0), 'NFT is not listed for sale.');

78:       ''

80:     require(success, 'Failed to send to seller');

100:       'Only the seller can canel the listing.'

102:     require(listing.isActive, 'Listing is not active.');

113:     require(nukeFundAddress != address(0), 'NukeFund address not set');

114:     (bool success, ) = nukeFundAddress.call{ value: amount }('');

115:     require(success, 'Failed to send Ether to NukeFund');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

26:     require(msg.sender == allowedCaller, 'Caller is not allowed');

48:     require(lastInitializedIndex < batchSize1, 'Batch 1 already initialized.');

56:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

67:       'Batch 2 not ready or already initialized.'

76:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

87:       'Batch 3 not ready or already completed.'

102:     require(currentSlotIndex <= maxSlotIndex, 'Max slot index reached.');

168:     require(slotIndex <= maxSlotIndex, 'Slot index out of bounds.');

178:     require(position <= 72, 'Position calculation error');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

47:       (bool success, ) = devAddress.call{ value: devShare }('');

48:       require(success, 'ETH send failed');

51:       (bool success, ) = payable(owner()).call{ value: devShare }('');

52:       require(success, 'ETH send failed');

54:       (bool success, ) = daoAddress.call{ value: devShare }('');

55:       require(success, 'ETH send failed');

119:     require(nftContract.ownerOf(tokenId) != address(0), 'Token does not exist');

139:       'ERC721: operator query for nonexistent token'

156:       'ERC721: caller is not token owner or approved'

161:       'Contract must be approved to transfer the NFT.'

163:     require(canTokenBeNuked(tokenId), 'Token is not mature yet');

177:     (bool success, ) = payable(msg.sender).call{ value: claimAmount }('');

178:     require(success, 'Failed to send Ether');

188:       'ERC721: operator query for nonexistent token'

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

55:         'Not whitelisted user'

61:   constructor() ERC721('TraitForgeNft', 'TFGNFT') {

77:     require(entityForgingAddress_ != address(0), 'Invalid address');

85:     require(entropyGeneratorAddress_ != address(0), 'Invalid address');

91:     require(airdrop_ != address(0), 'Invalid address');

144:       'ERC721: caller is not token owner or approved'

161:       'unauthorized caller'

191:     require(msg.value >= mintPrice, 'Insufficient ETH send for minting.');

197:       (bool refundSuccess, ) = msg.sender.call{ value: excessPayment }('');

198:       require(refundSuccess, 'Refund of excess payment failed.');

222:       (bool refundSuccess, ) = msg.sender.call{ value: budgetLeft }('');

223:       require(refundSuccess, 'Refund failed.');

237:       'ERC721: query for nonexistent token'

259:       'ERC721: query for nonexistent token'

269:       'ERC721: query for nonexistent token'

318:       'Exceeds maxTokensPerGen'

348:       'Generation limit not yet reached'

359:     require(address(this).balance >= totalAmount, 'Insufficient balance');

361:     (bool success, ) = nukeFundAddress.call{ value: totalAmount }('');

362:     require(success, 'ETH send failed');

394:     require(!paused(), 'ERC721Pausable: token transfer while paused');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-22"></a>[NC-22] Use Underscores for Number Literals (add an underscore every 3 digits)

*Instances (7)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

56:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

76:         require(pseudoRandomValue != 999999, 'Invalid value, retry.');

152:     nukeFactor = entropy / 4000000;

174:       return 999999;

181:     uint256 entropy = (slotValue / (10 ** (72 - position))) % 1000000; // adjust the entropy value based on the number of digits

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

12:   uint256 public constant MAX_DENOMINATOR = 100000;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

22:   uint256 public maxTokensPerGen = 10000;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-23"></a>[NC-23] Internal and private variables and functions names should begin with an underscore

According to the Solidity Style Guide, Non-`external` variable and function names should begin with an [underscore](https://docs.soliditylang.org/en/latest/style-guide.html#underscore-prefix-for-non-external-functions-and-variables)

*Instances (16)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

83:   function safeRewardTransfer(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

23:   mapping(uint256 => uint256) private lastForgeResetTimestamp;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

112:   function transferToNukeFund(uint256 amount) private {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

10:   uint256[770] private entropySlots; // Array to store entropy values

11:   uint256 private lastInitializedIndex = 0; // Indexes to keep track of the initialization and usage of entropy values

12:   uint256 private currentSlotIndex = 0;

13:   uint256 private currentNumberIndex = 0;

14:   uint256 private batchSize1 = 256;

15:   uint256 private batchSize2 = 512;

17:   uint256 private maxSlotIndex = 770;

18:   uint256 private maxNumberIndex = 13;

22:   address private allowedCaller;

164:   function getEntropy(

188:   function numberOfDigits(uint256 number) private pure returns (uint256) {

198:   function getFirstDigit(uint256 number) private pure returns (uint256) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

14:   uint256 private fund;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="NC-24"></a>[NC-24] Constants should be defined rather than using magic numbers

*Instances (1)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

181:     uint256 entropy = (slotValue / (10 ** (72 - position))) % 1000000; // adjust the entropy value based on the number of digits

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

### <a name="NC-25"></a>[NC-25] `public` functions not called by the contract should be declared `external` instead

*Instances (19)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

67:   function listForForging(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

38:   function listNFTForSale(

94:   function cancelListing(uint256 tokenId) public whenNotPaused nonReentrant {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

47:   function writeEntropyBatch1() public {

64:   function writeEntropyBatch2() public {

84:   function writeEntropyBatch3() public {

101:   function getNextEntropy() public onlyAllowedCaller returns (uint256) {

123:   function getPublicEntropy(

131:   function getLastInitializedIndex() public view returns (uint256) {

136:   function deriveTokenParameters(

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

105:   function getFundBalance() public view returns (uint256) {

113:   function getAgeMultiplier() public view returns (uint256) {

153:   function nuke(uint256 tokenId) public whenNotPaused nonReentrant {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

130:   function getGeneration() public view returns (uint256) {

181:   function mintToken(

202:   function mintWithBudget(

254:   function getTokenLastTransferredTimestamp(

264:   function getTokenCreationTimestamp(

274:   function isForger(uint256 tokenId) public view returns (bool) {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="NC-26"></a>[NC-26] Variables need not be initialized to zero

The default value for variables is zero, so initializing them to zero is superfluous.

*Instances (7)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

15:   uint256 public listingCount = 0;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

16:   uint256 public listingCount = 0;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

11:   uint256 private lastInitializedIndex = 0; // Indexes to keep track of the initialization and usage of entropy values

12:   uint256 private currentSlotIndex = 0;

13:   uint256 private currentNumberIndex = 0;

189:     uint256 digits = 0;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

212:     uint256 amountMinted = 0;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

## Low Issues

| |Issue|Instances|
|-|:-|:-:|
| [L-1](#L-1) | Use a 2-step ownership transfer pattern | 5 |
| [L-2](#L-2) | Missing checks for `address(0)` when assigning values to address state variables | 3 |
| [L-3](#L-3) | Division by zero not prevented | 6 |
| [L-4](#L-4) | External call recipient may consume all transaction gas | 14 |
| [L-5](#L-5) | Prevent accidentally burning tokens | 9 |
| [L-6](#L-6) | Owner can renounce while system is paused | 2 |
| [L-7](#L-7) | Possible rounding issue | 1 |
| [L-8](#L-8) | Loss of precision | 3 |
| [L-9](#L-9) | Solidity version 0.8.20+ may not work on other chains due to `PUSH0` | 6 |
| [L-10](#L-10) | Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership` | 6 |
| [L-11](#L-11) | Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting | 2 |
| [L-12](#L-12) | Unsafe ERC20 operation(s) | 3 |
| [L-13](#L-13) | Upgradeable contract not initialized | 18 |
| [L-14](#L-14) | A year is not always 365 days | 1 |

### <a name="L-1"></a>[L-1] Use a 2-step ownership transfer pattern

Recommend considering implementing a two step process where the owner or admin nominates an account and the nominated account needs to call an `acceptOwnership()` function for the transfer of ownership to fully succeed. This ensures the nominated EOA account is a valid and active account. Lack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.

*Instances (5)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

9: contract DevFund is IDevFund, Ownable, ReentrancyGuard, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

10: contract EntityForging is IEntityForging, ReentrancyGuard, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

11: contract EntityTrading is IEntityTrading, ReentrancyGuard, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

9: contract EntropyGenerator is IEntropyGenerator, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

11: contract NukeFund is INukeFund, ReentrancyGuard, Ownable, Pausable {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="L-2"></a>[L-2] Missing checks for `address(0)` when assigning values to address state variables

*Instances (3)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

31:     allowedCaller = _traitForgetNft;

37:     allowedCaller = _allowedCaller;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

69:     nukeFundAddress = _nukeFundAddress;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-3"></a>[L-3] Division by zero not prevented

The divisions below take an input parameter which does not have any zero-value checks, which may lead to the functions reverting when zero is passed.

*Instances (6)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

16:       uint256 amountPerWeight = msg.value / totalDevWeight;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

146:     uint256 devFee = forgingFee / taxCut;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

72:     uint256 nukeFundContribution = msg.value / taxCut;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

181:     uint256 entropy = (slotValue / (10 ** (72 - position))) % 1000000; // adjust the entropy value based on the number of digits

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

41:     uint256 devShare = msg.value / taxCut; // Calculate developer's share (10%)

167:     uint256 maxAllowedClaimAmount = fund / maxAllowedClaimDivisor; // Define a maximum allowed claim amount as 50% of the current fund size

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="L-4"></a>[L-4] External call recipient may consume all transaction gas

There is no limit specified on the amount of gas used, so the recipient can use up all of the transaction's gas, causing it to revert. Use `addr.call{gas: <amount>}("")` or [this](https://github.com/nomad-xyz/ExcessivelySafeCall) library instead.

*Instances (14)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

20:         (bool success, ) = payable(owner()).call{ value: remaining }('');

24:       (bool success, ) = payable(owner()).call{ value: msg.value }('');

89:     (bool success, ) = payable(to).call{ value: amount }('');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

156:     (bool success, ) = nukeFundAddress.call{ value: devFee }('');

158:     (bool success_forge, ) = forgerOwner.call{ value: forgerShare }('');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

77:     (bool success, ) = payable(listing.seller).call{ value: sellerProceeds }(

114:     (bool success, ) = nukeFundAddress.call{ value: amount }('');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

47:       (bool success, ) = devAddress.call{ value: devShare }('');

51:       (bool success, ) = payable(owner()).call{ value: devShare }('');

54:       (bool success, ) = daoAddress.call{ value: devShare }('');

177:     (bool success, ) = payable(msg.sender).call{ value: claimAmount }('');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

197:       (bool refundSuccess, ) = msg.sender.call{ value: excessPayment }('');

222:       (bool refundSuccess, ) = msg.sender.call{ value: budgetLeft }('');

361:     (bool success, ) = nukeFundAddress.call{ value: totalAmount }('');

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-5"></a>[L-5] Prevent accidentally burning tokens

Minting and burning tokens to address(0) prevention

*Instances (9)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

150:     _burn(tokenId);

176:     uint256 newTokenId = _mintNewEntity(newOwner, newEntropy, newGeneration);

191:     require(msg.value >= mintPrice, 'Insufficient ETH send for minting.');

193:     _mintInternal(msg.sender, mintPrice);

216:       _mintInternal(msg.sender, mintPrice);

287:     _mint(to, newItemId);

300:     emit Minted(

308:     _distributeFunds(mintPrice);

323:     _mint(newOwner, newTokenId);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-6"></a>[L-6] Owner can renounce while system is paused

The contract owner or single user with a role is not prevented from renouncing the role/ownership while the contract is paused, which would cause any user assets stored in the protocol, to be locked indefinitely.

*Instances (2)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

96:   function startAirdrop(uint256 amount) external whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-7"></a>[L-7] Possible rounding issue

Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator. Also, there is indication of multiplication and division without the use of parenthesis which could result in issues.

*Instances (1)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

16:       uint256 amountPerWeight = msg.value / totalDevWeight;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

### <a name="L-8"></a>[L-8] Loss of precision

Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator

*Instances (3)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

16:       uint256 amountPerWeight = msg.value / totalDevWeight;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

166:     uint256 potentialClaimAmount = (fund * finalNukeFactor) / MAX_DENOMINATOR; // Calculate the potential claim amount based on the finalNukeFactor

167:     uint256 maxAllowedClaimAmount = fund / maxAllowedClaimDivisor; // Define a maximum allowed claim amount as 50% of the current fund size

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

### <a name="L-9"></a>[L-9] Solidity version 0.8.20+ may not work on other chains due to `PUSH0`

The compiler for Solidity 0.8.20 switches the default target EVM version to [Shanghai](https://blog.soliditylang.org/2023/05/10/solidity-0.8.20-release-announcement/#important-note), which includes the new `PUSH0` op code. This op code may not yet be implemented on all L2s, so deployment on these chains will fail. To work around this issue, use an earlier [EVM](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html?ref=zaryabs.com#setting-the-evm-version-to-target) [version](https://book.getfoundry.sh/reference/config/solidity-compiler#evm_version). While the project itself may or may not compile with 0.8.20, other projects with which it integrates, or which extend this project may, and those projects will have problems deploying these contracts/libraries.

*Instances (6)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

2: pragma solidity ^0.8.20;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

2: pragma solidity ^0.8.20;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

2: pragma solidity ^0.8.20;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

2: pragma solidity ^0.8.20;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

2: pragma solidity ^0.8.20;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

2: pragma solidity ^0.8.20;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-10"></a>[L-10] Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`

Use [Ownable2Step.transferOwnership](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol) which is safer. Use it as it is more secure due to 2-stage ownership transfer.

**Recommended Mitigation Steps**

Use <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol">Ownable2Step.sol</a>
  
  ```solidity
      function acceptOwnership() external {
          address sender = _msgSender();
          require(pendingOwner() == sender, "Ownable2Step: caller is not the new owner");
          _transferOwnership(sender);
      }
```

*Instances (6)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

4: import '@openzeppelin/contracts/access/Ownable.sol';

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

5: import '@openzeppelin/contracts/access/Ownable.sol';

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

6: import '@openzeppelin/contracts/access/Ownable.sol';

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

4: import '@openzeppelin/contracts/access/Ownable.sol';

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

4: import '@openzeppelin/contracts/access/Ownable.sol';

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

6: import '@openzeppelin/contracts/access/Ownable.sol';

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-11"></a>[L-11] Consider using OpenZeppelin's SafeCast library to prevent unexpected overflows when downcasting

Downcasting from `uint256`/`int256` in Solidity does not revert on overflow. This can result in undesired exploitation or bugs, since developers usually assume that overflows raise errors. [OpenZeppelin's SafeCast library](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast) restores this intuition by reverting the transaction when such an operation overflows. Using this library eliminates an entire class of bugs, so it's recommended to use it always. Some exceptions are acceptable like with the classic `uint256(uint160(address(variable)))`

*Instances (2)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

86:     uint8 forgePotential = uint8((entropy / 10) % 10); // Extract the 5th digit from the entropy

138:     uint8 mergerForgePotential = uint8((mergerEntropy / 10) % 10); // Extract the 5th digit from the entropy

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

### <a name="L-12"></a>[L-12] Unsafe ERC20 operation(s)

*Instances (3)*:

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

53:     nftContract.transferFrom(msg.sender, address(this), tokenId); // trasnfer NFT to contract

81:     nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer NFT to the buyer

104:     nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer the nft back to seller

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

### <a name="L-13"></a>[L-13] Upgradeable contract not initialized

Upgradeable contracts are initialized via an initializer function rather than by a constructor. Leaving such a contract uninitialized may lead to it being taken over by a malicious user

*Instances (18)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

11:   uint256 private lastInitializedIndex = 0; // Indexes to keep track of the initialization and usage of entropy values

32:     initializeAlphaIndices();

48:     require(lastInitializedIndex < batchSize1, 'Batch 1 already initialized.');

50:     uint256 endIndex = lastInitializedIndex + batchSize1; // calculate the end index for the batch

52:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

60:     lastInitializedIndex = endIndex;

66:       lastInitializedIndex >= batchSize1 && lastInitializedIndex < batchSize2,

67:       'Batch 2 not ready or already initialized.'

70:     uint256 endIndex = lastInitializedIndex + batchSize1;

72:       for (uint256 i = lastInitializedIndex; i < endIndex; i++) {

80:     lastInitializedIndex = endIndex;

86:       lastInitializedIndex >= batchSize2 && lastInitializedIndex < maxSlotIndex,

90:       for (uint256 i = lastInitializedIndex; i < maxSlotIndex; i++) {

97:     lastInitializedIndex = maxSlotIndex;

131:   function getLastInitializedIndex() public view returns (uint256) {

132:     return lastInitializedIndex;

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

353:     entropyGenerator.initializeAlphaIndices();

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="L-14"></a>[L-14] A year is not always 365 days

On leap years, the number of days is 366, so calculations during those years will return the wrong value

*Instances (1)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

14:   uint256 public oneYearInDays = 365 days;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

## Medium Issues

| |Issue|Instances|
|-|:-|:-:|
| [M-1](#M-1) | `block.number` means different things on different L2s | 4 |
| [M-2](#M-2) | Centralization Risk for trusted owners | 38 |
| [M-3](#M-3) | `_safeMint()` should be used rather than `_mint()` wherever possible | 2 |
| [M-4](#M-4) | Using `transferFrom` on ERC721 tokens | 3 |
| [M-5](#M-5) | Fees can be set to be greater than 100%. | 1 |

### <a name="M-1"></a>[M-1] `block.number` means different things on different L2s

On Optimism, `block.number` is the L2 block number, but on Arbitrum, it's the L1 block number, and `ArbSys(address(100)).arbBlockNumber()` must be used. Furthermore, L2 block numbers often occur much more frequently than L1 block numbers (any may even occur on a per-transaction basis), so using block numbers for timing results in inconsistencies, especially when voting is involved across multiple chains. As of version 4.9, OpenZeppelin has [modified](https://blog.openzeppelin.com/introducing-openzeppelin-contracts-v4.9#governor) their governor code to use a clock rather than block numbers, to avoid these sorts of issues, but this still requires that the project [implement](https://docs.openzeppelin.com/contracts/4.x/governance#token_2) a [clock](https://eips.ethereum.org/EIPS/eip-6372) for each L2.

*Instances (4)*:

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

54:           keccak256(abi.encodePacked(block.number, i))

74:           keccak256(abi.encodePacked(block.number, i))

92:           keccak256(abi.encodePacked(block.number, i))

208:       keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

### <a name="M-2"></a>[M-2] Centralization Risk for trusted owners

#### Impact

Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.

*Instances (38)*:

```solidity
File: ./contracts/DevFund/DevFund.sol

9: contract DevFund is IDevFund, Ownable, ReentrancyGuard, Pausable {

30:   function addDev(address user, uint256 weight) external onlyOwner {

40:   function updateDev(address user, uint256 weight) external onlyOwner {

51:   function removeDev(address user) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/DevFund/DevFund.sol)

```solidity
File: ./contracts/EntityForging/EntityForging.sol

10: contract EntityForging is IEntityForging, ReentrancyGuard, Ownable, Pausable {

32:   ) external onlyOwner {

36:   function setTaxCut(uint256 _taxCut) external onlyOwner {

40:   function setOneYearInDays(uint256 value) external onlyOwner {

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

11: contract EntityTrading is IEntityTrading, ReentrancyGuard, Ownable, Pausable {

29:   ) external onlyOwner {

33:   function setTaxCut(uint256 _taxCut) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

```solidity
File: ./contracts/EntropyGenerator/EntropyGenerator.sol

9: contract EntropyGenerator is IEntropyGenerator, Ownable, Pausable {

36:   function setAllowedCaller(address _allowedCaller) external onlyOwner {

206:   function initializeAlphaIndices() public whenNotPaused onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntropyGenerator/EntropyGenerator.sol)

```solidity
File: ./contracts/NukeFund/NukeFund.sol

11: contract NukeFund is INukeFund, ReentrancyGuard, Ownable, Pausable {

63:   function setTaxCut(uint256 _taxCut) external onlyOwner {

67:   function setMinimumDaysHeld(uint256 value) external onlyOwner {

71:   function setDefaultNukeFactorIncrease(uint256 value) external onlyOwner {

75:   function setMaxAllowedClaimDivisor(uint256 value) external onlyOwner {

79:   function setNukeFactorMaxParam(uint256 value) external onlyOwner {

84:   function setTraitForgeNftContract(address _traitForgeNft) external onlyOwner {

89:   function setAirdropContract(address _airdrop) external onlyOwner {

94:   function setDevAddress(address payable account) external onlyOwner {

99:   function setDaoAddress(address payable account) external onlyOwner {

109:   function setAgeMultplier(uint256 _ageMultiplier) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/NukeFund/NukeFund.sol)

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

18:   Ownable,

68:   ) external onlyOwner {

76:   ) external onlyOwner {

84:   ) external onlyOwner {

90:   function setAirdropContract(address airdrop_) external onlyOwner {

96:   function startAirdrop(uint256 amount) external whenNotPaused onlyOwner {

100:   function setStartPrice(uint256 _startPrice) external onlyOwner {

104:   function setPriceIncrement(uint256 _priceIncrement) external onlyOwner {

110:   ) external onlyOwner {

114:   function setMaxGeneration(uint maxGeneration_) external onlyOwner {

122:   function setRootHash(bytes32 rootHash_) external onlyOwner {

126:   function setWhitelistEndTime(uint256 endTime_) external onlyOwner {

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="M-3"></a>[M-3] `_safeMint()` should be used rather than `_mint()` wherever possible

`_mint()` is [discouraged](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/d4d8d2ed9798cc3383912a23b5e8d5cb602f7d4b/contracts/token/ERC721/ERC721.sol#L271) in favor of `_safeMint()` which ensures that the recipient is either an EOA or implements `IERC721Receiver`. Both open [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/d4d8d2ed9798cc3383912a23b5e8d5cb602f7d4b/contracts/token/ERC721/ERC721.sol#L238-L250) and [solmate](https://github.com/Rari-Capital/solmate/blob/4eaf6b68202e36f67cab379768ac6be304c8ebde/src/tokens/ERC721.sol#L180) have versions of this function so that NFTs aren't lost if they're minted to contracts that cannot transfer them back out.

Be careful however to respect the CEI pattern or add a re-entrancy guard as `_safeMint` adds a callback-check (`_checkOnERC721Received`) and a malicious `onERC721Received` could be exploited if not careful.

Reading material:

- <https://blocksecteam.medium.com/when-safemint-becomes-unsafe-lessons-from-the-hypebears-security-incident-2965209bda2a>
- <https://samczsun.com/the-dangers-of-surprising-code/>
- <https://github.com/KadenZipfel/smart-contract-attack-vectors/blob/master/vulnerabilities/unprotected-callback.md>

*Instances (2)*:

```solidity
File: ./contracts/TraitForgeNft/TraitForgeNft.sol

287:     _mint(to, newItemId);

323:     _mint(newOwner, newTokenId);

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/TraitForgeNft/TraitForgeNft.sol)

### <a name="M-4"></a>[M-4] Using `transferFrom` on ERC721 tokens

The `transferFrom` function is used instead of `safeTransferFrom` and [it's discouraged by OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/109778c17c7020618ea4e035efb9f0f9b82d43ca/contracts/token/ERC721/IERC721.sol#L84). If the arbitrary address is a contract and is not aware of the incoming ERC721 token, the sent token could be locked.

*Instances (3)*:

```solidity
File: ./contracts/EntityTrading/EntityTrading.sol

53:     nftContract.transferFrom(msg.sender, address(this), tokenId); // trasnfer NFT to contract

81:     nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer NFT to the buyer

104:     nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer the nft back to seller

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityTrading/EntityTrading.sol)

### <a name="M-5"></a>[M-5] Fees can be set to be greater than 100%

There should be an upper limit to reasonable fees.
A malicious owner can keep the fee rate at zero, but if a large value transfer enters the mempool, the owner can jack the rate up to the maximum and sandwich attack a user.

*Instances (1)*:

```solidity
File: ./contracts/EntityForging/EntityForging.sol

44:   function setMinimumListingFee(uint256 _fee) external onlyOwner {
        minimumListFee = _fee;

```

[Link to code](https://github.com/code-423n4/2024-07-traitforge/blob/main/./contracts/EntityForging/EntityForging.sol)
