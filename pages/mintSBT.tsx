// pages/mintSBT.tsx

import { useEffect, useState } from 'react';
import React, { InputHTMLAttributes, forwardRef } from "react";
import { ethers } from 'ethers';
import Link from 'next/link'; // Import Link from next/link
import contractConfig from '../config'; // Update the path based on your project structure
import { useRef } from "react";
import InputImage from "../othertsx/index";
import { useGetImageUrl } from "../othertsx/useGetImageUrl";
import { useGetJsonUrl } from "../othertsx/useGetJsonUrl";

const IMAGE_ID = "imageId";
const FIELD_SIZE = 210;
export type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id: InputHTMLAttributes<HTMLInputElement>["id"];
};

const IndexPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<any | null>(null);
    const [toAddress, setToAddress] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mintStatus, setMintStatus] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<any | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget?.files && e.currentTarget.files[0]) {
            const targetFile = e.currentTarget.files[0];
            setImageFile(targetFile);
        }
    };

    const handleClickCancelButton = () => {
        setImageFile(null);
        // <input />タグの値をリセット
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // state (imageFile)が更新されたら、画像URLを作成する。
    const { imageUrl } = useGetImageUrl({ file: imageFile });
    const { jsonUrl } = useGetJsonUrl({ string: jsonData });

    useEffect(() => {
        const checkMetaMaskClient = async () => {
            if (!window.ethereum) {
                // Update UI accordingly
                return;
            }

            // Set up the event listener for account changes
            window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
                setAccount(newAccounts[0]);
            });

            // Enable the Connect button
            // You can also check for other conditions based on your requirements
        };

        checkMetaMaskClient();
    }, []);

    const onClickConnect = async () => {
        try {
            const newAccounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            const currentAccount = newAccounts[0];
            setAccount(currentAccount);

            if (currentAccount) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const newContract = new ethers.Contract(
                    contractConfig.address,
                    contractConfig.abi,
                    signer
                );
                setContract(newContract);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onClickMint = async () => {
        try {
            createJsonData();
            if (!toAddress || !jsonUrl) {
                // Handle validation errors
                return;
            }
            const mintTx = await contract.safeMint(toAddress, jsonUrl);
            await mintTx.wait();

            setMintStatus(`Minted token to ${toAddress}`);
            setToAddress('');
            setJsonData(null);
        } catch (error) {
            console.error(error);
            // Handle minting error
        }
    };

    const createJsonData = async () => {
        // 作成するJSONファイルのデータを構築
        setJsonData({
            name,
            description,
            image: imageUrl, // ここは実際の画像URIに変更する必要があります
            attributes: [{ value: 1 }],
            verifiableCredentials: [""],
        });
        console.log(jsonData);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '30px', margin: '20px 0' }}>SSICerts</h1>
            <Link href="/Verification_verifier">
                <button
                    style={{
                        textDecoration: 'underline',
                        fontSize: '15px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#0070f3'
                    }}
                >
                    Back to verifier&apos;s page
                </button>
            </Link>
            <div>
                <h2>Accounts</h2>
                <p id="accountStatus">{account ? account : 'Not Connected'}</p>
                <button
                    onClick={onClickConnect}
                    type="button"
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontSize: '15px',
                        marginTop: '10px',
                    }}
                >
                    Connect
                </button>
            </div>
            <p><br></br></p>
            <div>
                <input
                    type="text"
                    placeholder="Enter recipient's address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    style={{
                        width: '400px',
                        padding: '8px',
                        margin: '5px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        color: 'black',
                    }}
                />
                <br></br>
                <input
                    type="text"
                    placeholder="Enter the Name of a cert"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        width: '400px',
                        padding: '8px',
                        margin: '5px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        color: 'black',
                    }}
                />
                <br></br>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                        width: '400px',
                        height: '100px',  // 適切な高さに調整してください
                        padding: '8px',
                        margin: '5px 0',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                        color: 'black',
                        resize: 'vertical',  // この行を追加すると縦方向にのみリサイズができます
                    }}
                />
                <br></br>
                <>
                    <label
                        htmlFor={IMAGE_ID}
                        style={{
                            border: "white 3px dotted",
                            width: FIELD_SIZE,
                            height: FIELD_SIZE,
                            display: "flex",
                            borderRadius: 12,
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            cursor: "pointer",
                            color: "white",
                            margin: "0 auto", // これを追加して中央寄せ
                        }}
                    >
                        {imageUrl && imageFile ? (
                            <img
                                src={imageUrl}
                                alt="アップロード画像"
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                        ) : (
                            "+ Upload an image (This might take a while)"
                        )}
                        {/* ダミーインプット: 見えない */}
                        <InputImage
                            ref={fileInputRef}
                            id={IMAGE_ID}
                            onChange={handleFileChange}
                        />
                    </label>

                    <div style={{ height: 20 }} />
                    {/* キャンセルボタン */}
                    <button
                        onClick={handleClickCancelButton}
                        style={{
                            backgroundColor: 'gray',  // Choose a color for the cancel button
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            display: 'block',  // Add this line to ensure the button is displayed
                            margin: '0 auto', // これを追加して中央寄せ
                        }}
                    >
                        Cancel
                    </button>

                </>
                <button
                    onClick={onClickMint}
                    disabled={!contract || !toAddress || !name}
                    type="button"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Mint
                </button>
                <p style={{ fontSize: '16px', marginTop: '10px' }}>{mintStatus}</p>
            </div>
        </div>
    );
};

export default IndexPage;
