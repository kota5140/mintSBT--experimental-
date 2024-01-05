// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// 簡単に言えば、このinterfaceは特定のデータ構造を定義し、
// その構造を他のコントラクトと共有するためのものです。
interface Interface {
    struct Users {
        string name;
        string school;
        uint256 numOfCerts;
        uint256 year;
        address addr;
    }

    struct Universities {
        string name;
        string teacher;
    }

    struct Vars {
        Users alice;
        Users bob;
        Universities OU;
    }
}
