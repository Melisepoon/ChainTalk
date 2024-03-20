// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Soulbound is ERC721, ERC721URIStorage {
    uint256 private _tokenIdCounter;
    using Strings for uint256;
    string public constant TOKEN_URI =
        "ipfs://QmacW3dcCGqpsbfsgFJaXpJ2RKZnSTYjUPvyvmZLSnC5iN";
    constructor() ERC721("SoulBound", "SBT") {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(from == address(0), "Token not transferable");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function getTokenCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function safeMint(address to) public {
        _tokenIdCounter += 1;
        _safeMint(to, _tokenIdCounter);
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");

        string memory baseURI = _baseURI();
        if (bytes(baseURI).length > 0) {
            return TOKEN_URI;
        } else {
            return super.tokenURI(tokenId);
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://example.com/token/";
    }
}
