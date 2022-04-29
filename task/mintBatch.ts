import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("mintBatch", "Mint NumberCollectible nft")
  .addParam("to", "Address of recipient")
  .addParam("ids", "Token ids")
  .addParam("amounts", "Amounts of tokens by id")
  .addParam("data", "Byte data")
  .setAction(async (args, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const nftInstance = await hre.ethers.getContractAt("NumberCollectible2", contractAddress)

    const ids = args.ids.split(",");
    const amounts = args.amounts.split(",");

    const result = await nftInstance.mint(args.to, ids, amounts, args.data);
    console.log(result);
  });

  export default {
    solidity: "0.8.4"
  };