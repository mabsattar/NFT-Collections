// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {

    string _baseTokenURI;

    IWhitelist whitelist;

    constructor(string memory _baseURI, address whitelistContract) ERC721("Cryoto Devs", "CD") {
        _baseTokenURI = _baseURI
        whitelist = IWhitelist(whitelistContract);
        
    }

    function startPresale() public onlyOwner {
        presaleStarted = true

    }

    function presaleMint() public payable {

    }

    function mint() public payable {

    }
}