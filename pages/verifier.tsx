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
  const [VCURI, setVCURI] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );

  const verify = async () => {
    try {
      console.log("検証スタート");
      // VCのメタデータをIPFSから取得
      const vcResponse = await axios.get(VCURI);
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
      // 検証結果をstateにセット
      /* resultの結果が
            {"checks":["proof"],"warnings":[],"errors":["signature error: Verification equation was not satisfied"]}
            の場合は文字数が46を超えることを利用 */
      setVerificationResult(
        result.length > 46 ? "Verification failed!" : "Verified"
      );
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
            label="VC URI"
            variant="standard"
            fullWidth
            value={VCURI}
            onChange={(e) => setVCURI(e.target.value)}
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
                color={verificationResult === "Verified" ? "green" : "red"}
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
