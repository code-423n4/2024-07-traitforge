// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract TestERC721 is ERC721 {
  uint256 private _tokenIds;

  constructor() ERC721('TraitForgeNft', 'TFGNFT') {}

  function mintToken(address to) external {
    _mint(to, _tokenIds);
    _tokenIds++;
  }
}
