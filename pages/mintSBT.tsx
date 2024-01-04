// pages/index.tsx

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link'; // Import Link from next/link
import contractConfig from '../config'; // Update the path based on your project structure

const IndexPage: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<any | null>(null);
    const [toAddress, setToAddress] = useState<string>('');
    const [uri, setUri] = useState<string>('');
    const [mintStatus, setMintStatus] = useState<string>('');

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
            if (!toAddress || !uri) {
                // Handle validation errors
                return;
            }

            const mintTx = await contract.safeMint(toAddress, uri);
            await mintTx.wait();

            setMintStatus(`Minted token to ${toAddress}`);
            setToAddress('');
            setUri('');
        } catch (error) {
            console.error(error);
            // Handle minting error
        }
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
                    placeholder="Enter URI"
                    value={uri}
                    onChange={(e) => setUri(e.target.value)}
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
                <button
                    onClick={onClickMint}
                    disabled={!contract || !toAddress || !uri}
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
