// pages/index.tsx

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractConfig from '../config';
import { useSDK } from '@metamask/sdk-react';

const ManageCerts = () => {
    const [contract, setContract] = useState<any | null>(null);

    const [idInputOfBurn, setIdInputOfBurn] = useState('');
    const [burnStatus, setBurnStatus] = useState('');

    const [idInputOfDisclosure, setIdInputOfDisclosure] = useState('');
    const [discloseStatus, setDiscloseStatus] = useState('');

    const [ownedSBTs, setOwnedSBTs] = useState<any[]>([]);

    useEffect(() => {
        const connectcontract = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const newContract = new ethers.Contract(
                contractConfig.address,
                contractConfig.abi,
                signer
            );
            setContract(newContract);
            connectcontract();
        };
        connectcontract();
        // ページが読み込まれたときに実行
    }, []);

    const handleYourCertsClick = () => {
        // Execute getOwnedSBTs when the "Your certs" button is clicked
        getOwnedSBTs();
    };

    const getOwnedSBTs = async () => {
        try {
            /* as string[]を付けないとエラーになるが、解決 */
            const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
            const account = accounts[0];

            console.log(account);
            const balance = await contract.balanceOf(account);
            const newOwnedSBTs = [];

            for (let i = 0; i < balance; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(account, i);
                const tokenUri = await contract.tokenURI(tokenId);
                const metadataResponse = await fetch(tokenUri);
                const metadata = await metadataResponse.json();

                newOwnedSBTs.push({
                    tokenId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                });
            }
            console.log(balance);

            setOwnedSBTs(newOwnedSBTs);
        } catch (error) {
            console.error(error);
            // Handle error fetching owned SBTs
        }
    };

    const burnToken = async () => {
        try {
            await contract.burn(idInputOfBurn);
            setBurnStatus(`Token ${idInputOfBurn} burned successfully`);
            getOwnedSBTs(); // Refresh owned tokens after burning
        } catch (error) {
            console.error(error);
            setBurnStatus(`Error burning token ${idInputOfBurn}`);
        }
    };

    const disclosure = async () => {
        try {
            const idDis = idInputOfDisclosure;

            if (!idDis) {
                // Handle no ID entered
                return;
            }

            await contract.tokenURI(idDis);

            const userChoice1 = confirm('Do you want to disclose full information?');

            if (userChoice1) {
                fullydisclose(idDis);
            } else {
                const userChoice2 = confirm('Are you going to partially disclose information?');
                if (userChoice2) {
                    partiallydisclose();
                }
            }
        } catch (error) {
            console.error(error);
            // Handle disclosure error
        }
    };

    const fullydisclose = async (id: string) => {
        try {
            const sbtMetadataUrl = await contract.tokenURI(id);
            const response = await fetch(sbtMetadataUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${sbtMetadataUrl}`);
            }

            const sbtMetadata = await response.json();

            const vcMetadataUrl = sbtMetadata.verifiableCredentials[0];
            setDiscloseStatus(vcMetadataUrl);
        } catch (error) {
            console.error(error);
            // Handle full disclosure error
        }
    };

    const partiallydisclose = async () => {
        try {
            // Handle partial disclosure
        } catch (error) {
            console.error(error);
            // Handle partial disclosure error
        }
    };

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            {/* Button to trigger getOwnedSBTs */}
            <div>
                <button onClick={handleYourCertsClick}>Display your certs</button>
            </div>
            {/* Display owned tokens */}
            <h2>Owned Certs:</h2>
            <ul>
                {ownedSBTs.map((token) => (
                    <li key={token.tokenId}>
                        <p>{"ID: " + token.tokenId}</p>
                        <p>Name: {token.name}</p>
                        <p>Description: {token.description}</p>
                        <img
                            src={token.image}
                            alt="Token Image"
                            style={{ maxWidth: '200px', maxHeight: '200px', width: 'auto', height: 'auto' }}
                        />
                    </li>
                ))}
            </ul>
            <h2>Burn your certs:</h2>
            {/* Input for burning a token */}
            <div>
                <input
                    type="text"
                    value={idInputOfBurn}
                    onChange={(e) => setIdInputOfBurn(e.target.value)}
                    placeholder="Token ID to burn"
                />
                <button onClick={burnToken}>Burn Token</button>
                <p>Burn Status: {burnStatus}</p>
            </div>
            <h2>Disclose information of your certs to other institutions:</h2>
            {/* Input for disclosing a token */}
            <div>
                <input
                    type="text"
                    value={idInputOfDisclosure}
                    onChange={(e) => setIdInputOfDisclosure(e.target.value)}
                    placeholder="Token ID to disclose"
                />
                <button onClick={disclosure}>Disclose Token</button>
                <p>Disclosure Status: {discloseStatus}</p>
            </div>
        </div>
    );
};

export default ManageCerts;