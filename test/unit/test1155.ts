import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

describe("NumberCollectible NFTs", function () {

  let nftInstance: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function(){
    const Token = await ethers.getContractFactory("NumberCollectible2");
    nftInstance = await Token.deploy();
    [owner, addr1] = await ethers.getSigners();

    await nftInstance.deployed();
  });

  describe("Deploy", function(){
    it("Should return proper token addresses on deploy", async function() {
      expect(nftInstance.address).to.be.properAddress;
    });

    it("Should should support 1155 interface", async function() {
      expect(await nftInstance.supportsInterface(0xd9b67a26)).to.eq(true);
    });
  });

  describe("Txs", function() {
    it("Should have some nft after minting and total supply change", async function() {
      await nftInstance.mint(owner.address, 0, 1, "0x00");
      expect(await nftInstance.balanceOf(owner.address, 0)).to.eq(1);
    });

    it("Should have some nft after batch minting and total supply change", async function() {
      const ids = [0, 1];
      const amounts = [1, 1];
      await nftInstance.mintBatch(owner.address, ids, amounts, "0x00");
      expect(await nftInstance.balanceOf(owner.address, 0)).to.eq(1);
      expect(await nftInstance.balanceOf(owner.address, 1)).to.eq(1);
    });

    it("Should have some nft after minting with uri and total supply, uri change", async function() {
      await nftInstance.mintWithURI("new uri",owner.address, 0, 1, "0x00");
      expect(await nftInstance.balanceOf(owner.address, 0)).to.eq(1);
      expect(await nftInstance.uri(0)).to.eq("new uri");
    });

    it("Should have some nft after batch minting and total supply change", async function() {
      const ids = [0, 1];
      const amounts = [1, 1];
      await nftInstance.mintBatchWithURI(["new uri", "two uri"], owner.address, ids, amounts, "0x00");
      expect(await nftInstance.balanceOf(owner.address, 0)).to.eq(1);
      expect(await nftInstance.balanceOf(owner.address, 1)).to.eq(1);
      expect(await nftInstance.uri(0)).to.eq("new uri/{id}.json");
      expect(await nftInstance.uri(1)).to.eq("two uri/{id}.json");
    });
  });
});