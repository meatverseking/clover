// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleNFT is ERC721URIStorage{
         using Counters for Counters.Counter;
         Counters.Counter private tokenCounter;


         constructor() ERC721("Clover FS", "CFS") { }

         function totalMinted() public view returns (uint256){
             return tokenCounter.current();
         }

        function mintTokens(address forUser, string memory tokenURI) public returns(uint256) {
                uint256 newItemId = tokenCounter.current();
                _mint(forUser, newItemId);
                _setTokenURI(newItemId, tokenURI);

                tokenCounter.increment();
                return newItemId;
         } 
}