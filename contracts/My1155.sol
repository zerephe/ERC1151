// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NumberCollectible2 is ERC1155, Ownable, ERC1155Supply {
    uint256 public constant ONE = 0;
    uint256 public constant TWO = 1;
    string private _baseUri = "https://ipfs.io/ipfs/QmV4KdKfFTV8MPkj9ntW41RMY22MgUbrGyKsegi1Ax5P9V/{id}.json";

    constructor() ERC1155(_baseUri) {
        _mint(msg.sender, ONE, 1, "");
        _mint(msg.sender, TWO, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    // function uri(uint256 _tokenId) override public view returns(string memory) {
    //     return string(abi.encodePacked(super.uri(_tokenId), Strings.toString(_tokenId), ".json"));
    // }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) external onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}