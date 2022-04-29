import { Address } from "cluster";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners()
  const My1155 = await ethers.getContractFactory("NumberCollectible2", owner);
  const numCollectible2 = await My1155.deploy();
 
  await numCollectible2.deployed();

  console.log("Deployed to:", numCollectible2.address);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export default {
  solidity: "0.8.4"
};