"use client";
import { ethers } from "ethers";
import React, { useState } from "react";
// import contractConfig from "../config.js";

const Login = () => {
  // const [tokenId, setTokenId] = useState("");
  // const [verificationResult, setVerificationResult] = useState<string | null>(
  //   null
  // );
  const [metaMaskConnected, setMetaMaskConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(""); // ここで connectedAccount を useState で宣言

  const connectMetaMask = async () => {
    try {
      // Check if MetaMask is present
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          const connectedAccount = accounts[0];
          setConnectedAccount(connectedAccount);
          setMetaMaskConnected(true);
        }
      } else {
        // Ask for user confirmation before redirecting to MetaMask Mobile installation page
        const userConfirmed = window.confirm("Open in 'MetaMask' app?");

        if (userConfirmed) {
          /* 未実装 */
          window.confirm(
            "We currently do not provide support for mobile phones."
          );
        }
      }
    } catch (error) {
      console.error("MetaMask connection error", error);
      setMetaMaskConnected(false);
    }
  };
};

export default Login;
