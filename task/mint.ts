import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("mint", "Mint NumberCollectible nft")
  .addParam("to", "Address of recipient")
  .addParam("id", "Token id")
  .addParam("amount", "Amount of tokens")
  .addParam("data", "Byte data")
  .setAction(async (args, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const nftInstance = await hre.ethers.getContractAt("NumberCollectible2", contractAddress)

    const result = await nftInstance.mint(args.to, args.id, args.amount, args.data);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };