"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "../lib/utils";
import { useRouter } from "next/router";
import contractConfig from "../config";
import { setLoginStatus } from "./_app";

export const ConnectWalletButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn("Connection failed", err);
      alert("Connection failed");
    }
    if (!sdk) {
      router.reload();
    }
  };

  const disconnect = () => {
    if (sdk) {
      setLoginStatus(false);
      sdk.terminate();
    }
  };

  useEffect(() => {
    if (connected) {
      setLoginStatus(true);
      router.push("/mypage");
    }
  }, [connected]);

  return (
    <div style={{ position: "relative" }}>
      {connected ? (
        <>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
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
        <Button disabled={connecting} onClick={connect} variant="contained">
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export const NavBar = () => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host,
    },
  };

  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <ConnectWalletButton />
    </MetaMaskProvider>
  );
};

export default NavBar;
