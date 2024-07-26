const keccak256 = require('keccak256');
const { default: MerkleTree } = require('merkletreejs');

const generateMerkleTree = (address: string[]) => {
  //  Hashing All Leaf Individual
  const leaves = address.map(leaf => keccak256(leaf));

  // Constructing Merkle Tree
  const tree = new MerkleTree(leaves, keccak256, {
    sortPairs: true,
  });

  //  Utility Function to Convert From Buffer to Hex
  const buf2Hex = (x: any) => '0x' + x.toString('hex');

  // Get Root of Merkle Tree
  console.log(`Here is Root Hash: ${buf2Hex(tree.getRoot())}`);

  let data = [] as {
    address: string;
    leaf: string;
    proof: string[];
  }[];

  // Pushing all the proof and leaf in data array
  address.forEach(address => {
    const leaf = keccak256(address);

    const proof = tree.getProof(leaf);

    let tempData: string[] = [];

    proof.map((x: any) => tempData.push(buf2Hex(x.data)));

    data.push({
      address: address,
      leaf: buf2Hex(leaf),
      proof: tempData,
    });
  });

  return {
    whitelist: data,
    rootHash: buf2Hex(tree.getRoot()),
  };
};

export default generateMerkleTree;
