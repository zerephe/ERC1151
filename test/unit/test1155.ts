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

    it("Should have proper initial values", async function() {
      expect(await nftInstance.ONE()).to.eq(0);
      expect(await nftInstance.TWO()).to.eq(1);
      expect(await nftInstance.totalSupply(0)).to.eq(1);
      expect(await nftInstance.totalSupply(1)).to.eq(1);
    });
  });

  describe("Txs", function() {
    it("Should have some nft after minting and total supply change", async function() {
      await nftInstance.mint(owner.address, 0, 1, "0x00");
      expect(await nftInstance.balanceOf(owner.address, 0)).to.eq(2);
      expect(await nftInstance.totalSupply(0)).to.eq(2);
    });

    it("Should have some nft after batch minting and total supply change", async function() {
      const ids = [0, 1];
      const amounts = [1, 1];
      await nftInstance.mintBatch(owner.address, ids, amounts, "0x00");
      expect(await nftInstance.balanceOf(owner.address, 0)).to.eq(2);
      expect(await nftInstance.balanceOf(owner.address, 1)).to.eq(2);
      expect(await nftInstance.totalSupply(0)).to.eq(2);
      expect(await nftInstance.totalSupply(1)).to.eq(2);
    });

    it("Should should be possible to change URI", async function() {
      await nftInstance.setURI("uri");
      expect(await nftInstance.uri(0)).to.eq("uri0.json")
      expect(await nftInstance.uri(1)).to.eq("uri1.json")
    });
  });
});