import { ethers } from 'hardhat';

export function send(method: string, params?: Array<any>) {
  return ethers.provider.send(method, params === undefined ? [] : params);
}

export function mineBlock() {
  return send('evm_mine', []);
}

export async function fastForward(seconds: number) {
  const method = 'evm_increaseTime';
  const params = [seconds];

  await send(method, params);

  await mineBlock();
}
