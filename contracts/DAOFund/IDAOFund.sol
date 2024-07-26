// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDAOFund {
  struct UserInfo {
    uint256 amount;
    uint256 rewardDebt;
    uint256 pendingRewards;
  }

  event Deposit(address indexed account, uint256 amount);
  event Withdraw(address indexed account, uint256 amount);
  event Claim(address indexed account, uint256 amount);
  event FundReceived(address indexed from, uint256 amount); // Log the received funds

  receive() external payable;

  function deposit(uint256 amount) external;

  function withdraw(uint256 amount) external;

  function claim() external;

  function pendingRewards(address account) external view returns (uint256);
}
