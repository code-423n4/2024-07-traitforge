// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEntityTrading {
  struct Listing {
    address seller; // address of NFT seller
    uint256 tokenId; // token id of NFT
    uint256 price; // Price of the NFT in wei
    bool isActive; // flag to check if the listing is active
  }
  event NFTListed(
    uint256 indexed tokenId,
    address indexed seller,
    uint256 price
  );
  event NFTSold(
    uint256 indexed tokenId,
    address indexed seller,
    address indexed buyer,
    uint256 price,
    uint256 nukeFundContribution
  );
  event ListingCanceled(uint256 indexed tokenId, address indexed seller);
  event NukeFundContribution(address indexed from, uint256 amount);

  // allows the owner to set NukeFund address
  function setNukeFundAddress(address payable _nukeFundAddress) external;

  function setTaxCut(uint256 _taxCut) external;

  // function to lsit NFT for sale
  function listNFTForSale(uint256 tokenId, uint256 price) external;

  // function to buy an NFT listed for sale
  function buyNFT(uint256 tokenId) external payable;

  function cancelListing(uint256 tokenId) external;
}
