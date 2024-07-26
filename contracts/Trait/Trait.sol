// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol';
import './ITrait.sol';

contract Trait is ITrait, ERC20Pausable {
  uint8 private _decimals;

  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimal,
    uint256 _totalSupply
  ) ERC20(_name, _symbol) {
    _decimals = _decimal;
    _mint(msg.sender, _totalSupply);
  }

  function decimals() public view virtual override returns (uint8) {
    return _decimals;
  }

  function burn(uint256 amount) external returns (bool) {
    _burn(msg.sender, amount);
    return true;
  }
}
