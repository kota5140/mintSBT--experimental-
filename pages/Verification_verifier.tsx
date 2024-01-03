"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from next/link
import axios from "axios";
import { ethers } from "ethers";
import contractConfig from "../config.js";

const Verification: React.FC = () => {
    const [VCURI, setVCURI] = useState("");
    const [verificationResult, setVerificationResult] = useState<string | null>(null);

    let contract: ethers.Contract;

    const verify = async () => {
        try {
            console.log("検証スタート");
            // contract
            let provider;

            if (window.ethereum) {
                // Check if MetaMask is present
                provider = new ethers.BrowserProvider(window.ethereum);
            } else {
                // Handle the case when MetaMask is not present
                console.error("MetaMask not detected.");
                return;
            }

            const signer = await provider.getSigner();
            /* Goerliネットワーク上にあるコントラクトを使えるようにしまっせということ */
            contract = new ethers.Contract(
                contractConfig.address,
                contractConfig.abi,
                signer
            );
            console.log(contract);
            if (contract) {
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
                console.log(result.length);
                // 検証結果をstateにセット
                /* resultの結果が
                {"checks":["proof"],"warnings":[],"errors":["signature error: Verification equation was not satisfied"]}
                の場合は文字数が46を超えることを利用 */
                setVerificationResult(result.length > 46 ? 'Verification failed!' : 'Verified');
            } else {
                console.error("Contract is not initialized.");
            }
        } catch (error) {
            console.error("検証エラー", error);

            // エラー時は検証結果をクリア
            setVerificationResult('Verification failed!');
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '30px' }}>VC Verification for verifiers</h1>
            <p>Although this is the page for verifiers, holders are also able to verifry certs here by filling in VC URI.</p>
            {/* ↓<a></a>は要らない */}
            <Link href="/">
                <h1 style={{ textDecoration: 'underline', fontSize: '15px' }}>Back to holder&apos;s page</h1>
            </Link>
            <p><br></br></p>

            {/* SBTのURI入力フォーム */}
            <label>
                VC URI:
                <input
                    type="text"
                    value={VCURI}
                    onChange={(e) => setVCURI(e.target.value)}
                    style={{
                        padding: '8px',
                        margin: '5px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        color: 'black',
                    }}
                />
            </label>


            {/* 検証ボタン */}
            <button
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={verify}
            >
                Verify
            </button>
            {/* 検証結果をブラウザに表示 */}
            {
                verificationResult !== null && (
                    <div>
                        <h2>Verification Result:</h2>
                        <p style={{ color: verificationResult === 'Verified' ? 'green' : 'red', fontSize: '30px' }}>
                            {verificationResult}
                        </p>
                    </div>
                )
            }
        </div >
    );
};

export default Verification;
