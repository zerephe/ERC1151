import * as dotenv from "dotenv";
import { task } from "hardhat/config";

dotenv.config();

task("checkAll", "Check info about account")
  .addParam("address", "Address of recipient")
  .setAction(async (args, hre) => {
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const nftInstance = await hre.ethers.getContractAt("NumberCollectible2", contractAddress)

    const balance0 = await nftInstance.balanceOf(args.address, 0);
    const balance1 = await nftInstance.totalSupply(1);

    console.log(balance0, balance1);
  });

  export default {
    solidity: "0.8.4"
  };