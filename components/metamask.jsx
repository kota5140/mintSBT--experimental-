"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "../lib/utils";
import { useRouter } from "next/router";
import { setLoginStatus } from "../pages/_app";

export const ConnectWalletButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const [connecting, setConnecting] = React.useState(false);
  const [connected, setConnected] = React.useState(false);
  const { sdk, account } = useSDK();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const connect = async () => {
    try {
      setConnecting(true);
      if (await sdk?.connect()) {
        await checkNetwork();
      }
    } catch (err) {
      setConnecting(false);
      console.warn("Connection failed", err);
      alert("Connection failed.");
      router.reload();
    }
  };

  const checkNetwork = async () => {
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x89") {
        await addNetwork();
      } else {
        setConnected(true);
      }
    } catch (error) {
      setConnecting(false);
      console.error("Error checking network:", error);
      alert("Error checking network.");
    }
  };

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
      setConnected(true);
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x5",
                chainName: "Goerli",
                rpcUrls: ["https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
                nativeCurrency: {
                  name: "Goerli Ether",
                  symbol: "GOETH",
                  decimals: 16,
                },
              },
            ],
          });
          setConnected(true);
        } catch (addError) {
          setConnecting(false);
          console.error("Error adding network:", addError);
          alert("Error adding network.");
        }
      } else {
        setConnecting(false);
        console.error("Error switching network:", switchError);
        alert("Error switching network.");
      }
    }
  };

  useEffect(() => {
    if (connected) {
      setLoginStatus(true); // setLoginStatus 関数の実装が必要です
      setConnecting(false);
      router.push("/mypage");
    }
  }, [connected]);

  const disconnect = async () => {
    if (sdk) {
      await sdk.terminate();
      setConnected(false);
      setLoginStatus(false); // setLoginStatus 関数の実装が必要です
      setAnchorEl(null);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {connected ? (
        <>
          <Button
            aria-describedby={id}
            onClick={handleClick}
            variant="outlined"
            sx={{
              background: "white",
              color: "primary.main",
              fontWeight: 700,
              "&:hover": {
                background: "secondry.main",
                color: "white",
                fontWeight: 700,
              },
            }}
          >
            {formatAddress(account)}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button
              disabled={connecting}
              onClick={disconnect}
              variant="contained"
              sx={{
                background: "white",
                color: "red",
              }}
            >
              <Link
                href="/"
                className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
              >
                Disconnect
              </Link>
            </Button>
          </Popover>
        </>
      ) : (
        <Button
          disabled={connecting}
          onClick={connect}
          variant="contained"
          sx={{
            background: "white",
            color: "primary.main",
            fontWeight: 700,
            "&:hover": {
              background: "secondry.main",
              color: "white",
              fontWeight: 700,
            },
          }}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export const MetaMask = () => {
  return (
    <MetaMaskProvider>
      <ConnectWalletButton />
    </MetaMaskProvider>
  );
};
