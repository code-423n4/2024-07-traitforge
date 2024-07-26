const fs = require('fs');
import { WHITELIST } from '../consts/whitelist';
import generateMerkleTree from './genMerkleTreeLib';

async function main() {
  const data = generateMerkleTree(WHITELIST);

  const metadata = JSON.stringify(data, null, 2);

  fs.writeFile(`consts/merkle.json`, metadata, (err: any) => {
    if (err) {
      throw err;
    }
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
