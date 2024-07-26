// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import './IEntityTrading.sol';
import '../TraitForgeNft/ITraitForgeNft.sol';

contract EntityTrading is IEntityTrading, ReentrancyGuard, Ownable, Pausable {
  ITraitForgeNft public nftContract;
  address payable public nukeFundAddress;
  uint256 public taxCut = 10;

  uint256 public listingCount = 0;
  /// @dev tokenid -> listings index
  mapping(uint256 => uint256) public listedTokenIds;
  /// @dev index -> listing info
  mapping(uint256 => Listing) public listings;

  constructor(address _traitForgeNft) {
    nftContract = ITraitForgeNft(_traitForgeNft);
  }

  // allows the owner to set NukeFund address
  function setNukeFundAddress(
    address payable _nukeFundAddress
  ) external onlyOwner {
    nukeFundAddress = _nukeFundAddress;
  }

  function setTaxCut(uint256 _taxCut) external onlyOwner {
    taxCut = _taxCut;
  }

  // function to lsit NFT for sale
  function listNFTForSale(
    uint256 tokenId,
    uint256 price
  ) public whenNotPaused nonReentrant {
    require(price > 0, 'Price must be greater than zero');
    require(
      nftContract.ownerOf(tokenId) == msg.sender,
      'Sender must be the NFT owner.'
    );
    require(
      nftContract.getApproved(tokenId) == address(this) ||
        nftContract.isApprovedForAll(msg.sender, address(this)),
      'Contract must be approved to transfer the NFT.'
    );

    nftContract.transferFrom(msg.sender, address(this), tokenId); // trasnfer NFT to contract

    ++listingCount;
    listings[listingCount] = Listing(msg.sender, tokenId, price, true);
    listedTokenIds[tokenId] = listingCount;

    emit NFTListed(tokenId, msg.sender, price);
  }

  // function to buy an NFT listed for sale
  function buyNFT(uint256 tokenId) external payable whenNotPaused nonReentrant {
    Listing memory listing = listings[listedTokenIds[tokenId]];
    require(
      msg.value == listing.price,
      'ETH sent does not match the listing price'
    );
    require(listing.seller != address(0), 'NFT is not listed for sale.');

    //transfer eth to seller (distribute to nukefund)
    uint256 nukeFundContribution = msg.value / taxCut;
    uint256 sellerProceeds = msg.value - nukeFundContribution;
    transferToNukeFund(nukeFundContribution); // transfer contribution to nukeFund

    // transfer NFT from contract to buyer
    (bool success, ) = payable(listing.seller).call{ value: sellerProceeds }(
      ''
    );
    require(success, 'Failed to send to seller');
    nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer NFT to the buyer

    delete listings[listedTokenIds[tokenId]]; // remove listing

    emit NFTSold(
      tokenId,
      listing.seller,
      msg.sender,
      msg.value,
      nukeFundContribution
    ); // emit an event for the sale
  }

  function cancelListing(uint256 tokenId) public whenNotPaused nonReentrant {
    Listing storage listing = listings[listedTokenIds[tokenId]];

    // check if caller is the seller and listing is acivte
    require(
      listing.seller == msg.sender,
      'Only the seller can canel the listing.'
    );
    require(listing.isActive, 'Listing is not active.');

    nftContract.transferFrom(address(this), msg.sender, tokenId); // transfer the nft back to seller

    delete listings[listedTokenIds[tokenId]]; // mark the listing as inactive or delete it

    emit ListingCanceled(tokenId, msg.sender);
  }

  // Correct and secure version of transferToNukeFund function
  function transferToNukeFund(uint256 amount) private {
    require(nukeFundAddress != address(0), 'NukeFund address not set');
    (bool success, ) = nukeFundAddress.call{ value: amount }('');
    require(success, 'Failed to send Ether to NukeFund');
    emit NukeFundContribution(address(this), amount);
  }
}
