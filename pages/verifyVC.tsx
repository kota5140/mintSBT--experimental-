"use client";
import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import axios from "axios";
import { ethers } from "ethers";
import contractConfig from "../config.js";
import { Grid, Paper, TextField, Typography, Box, Button } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { teal } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

const Verification: React.FC = () => {
  const [tokenId, setTokenId] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );

  let contract: ethers.Contract;

  const verify = async () => {
    try {
      console.log("検証スタート");
      // contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      /* Goerliネットワーク上にあるコントラクトを使えるようにしまっせということ */
      contract = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        signer
      );
      console.log(contract);
      if (contract) {
        try {
          // 入力されたSBTのidのURIを取得
          // 失敗したらエラーをキャッチし、Token doesn't existというエラーメッセージを返す
          await contract.tokenURI(tokenId);
        } catch (error) {
          console.error("Error fetching token URI", error);
          // トークンが存在しない場合
          setVerificationResult("Token doesn't exist");
          return;
        }
        const sbtMetadataUrl = await contract.tokenURI(tokenId);
        const response = await axios.get(sbtMetadataUrl);
        const sbtMetadata = response.data;

        // VCのメタデータをIPFSから取得
        const vcMetadataUrl = sbtMetadata.verifiableCredentials[0];
        const vcResponse = await axios.get(vcMetadataUrl);
        const vcMetadata = vcResponse.data;

        // VCデータをJSONファイルに変換
        const vcJsonString = JSON.stringify(vcMetadata);

        // VCの検証
        const didkit = await import("@spruceid/didkit-wasm");
        const proofOptions = {};
        const result = await didkit.verifyCredential(
          vcJsonString,
          JSON.stringify(proofOptions)
        );

        console.log(result);
        console.log(result.length);
        // 検証結果をstateにセット
        /* resultの結果が
                        {"checks":["proof"],"warnings":[],"errors":["signature error: Verification equation was not satisfied"]}
                        の場合は文字数が46を超えることを利用 */
        setVerificationResult(
          result.length > 46 ? "Verification failed!" : "Verified"
        );
      } else {
        console.error(
          "MetaMask is not connected or contract is not initialized."
        );
      }
    } catch (error) {
      console.error("検証エラー", error);

      // エラー時は検証結果をクリア
      setVerificationResult("Verification failed!");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "350px", m: "20px auto" }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: teal[400] }}>
            <PersonSearchIcon />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
            Verify VC
          </Typography>
          <TextField
            label="TokenId"
            variant="standard"
            fullWidth
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={verify}
          >
            Verify
          </Button>
          {verificationResult !== null && (
            <Box mt={2} textAlign="center">
              <Typography
                variant="body1"
                color={verificationResult === "Verified" ? "success" : "error"}
              >
                {verificationResult}
              </Typography>
            </Box>
          )}
          <Typography variant="caption" mt={2}>
            <Link href="#">How To Verify a VC?</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Verification;
