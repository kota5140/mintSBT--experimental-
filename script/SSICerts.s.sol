// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {Script} from "lib/forge-std/src/Script.sol";
import {SSICerts} from "src/SSICerts.sol";

contract DeploySSICerts is Script {
    function run() external returns (SSICerts) {
        /* vmはfoundryだけで動く!注意
        デプロイしたいコントラクトはstart, stopの間に置く */
        vm.startBroadcast();
        SSICerts ssicerts = new SSICerts(address(this));
        vm.stopBroadcast();
        return ssicerts;
    }
}
