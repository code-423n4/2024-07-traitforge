// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './IUniswapV2Router.sol';
import '../Trait/ITrait.sol';

contract DAOFund {
  ITrait public token;
  IUniswapV2Router01 public uniswapV2Router;

  constructor(address _token, address _router) {
    token = ITrait(_token);
    uniswapV2Router = IUniswapV2Router02(_router);
  }

  receive() external payable {
    require(msg.value > 0, 'No ETH sent');

    address[] memory path = new address[](2);
    path[0] = uniswapV2Router.WETH();
    path[1] = address(token);

    uniswapV2Router.swapExactETHForTokens{ value: msg.value }(
      0,
      path,
      address(this),
      block.timestamp
    );

    require(
      token.burn(token.balanceOf(address(this))) == true,
      'Token burn failed'
    );
  }
}
