// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import {Interface} from "src/interfaces/interface.sol";

contract SSICerts is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    ERC721Enumerable,
    Ownable,
    Interface
{
    uint256 private _nextTokenId;

    constructor(
        address initialOwner
    ) ERC721("SSICerts", "MTK") Ownable(initialOwner) {}

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // トークンを破棄する関数
    function burn(uint256 tokenId) public override {
        // ERC721Burnableの内部関数を呼び出してトークンを破棄
        _burn(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // SBTになる. ポイントは、ERC721の中のvirtualの付いている関数をこちらでovverideして書き換えること.
    // 最初は_transfer関数をovverideしてたけど、virtualが付いてないから、overrideできない
    // これまでずっと_beforeTokenTransfer()を探してたが最近のversionで消えたっぽい.
    // 教訓は、ちゃんと継承したERC721コントラクトの中身も見ようねっていうこと.
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal override(ERC721) {
        // mintは許可（そのまま処理を通す）
        // transferは禁止（処理を中断させる）
        require(from == address(0), "Transfer not allowed");
        super._safeTransfer(from, to, tokenId, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(ERC721, IERC721) {
        require(from == address(0), "Trasnfer not allowed");
        super.safeTransferFrom(from, to, tokenId, data);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /* ERC721Enuberableを継承するとこのようにoverrideしなければならない */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
}
