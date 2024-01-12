// pages/index.tsx

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractConfig from '../config';
import { useSDK } from '@metamask/sdk-react';
import { Grid, Paper, TextField, Typography, Box, Button } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { teal } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

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

    const burnToken = async (tokenId: string) => {
        try {
            // await contract.burn(idInputOfBurn);
            // setBurnStatus(`Token ${idInputOfBurn} burned successfully`);
            await contract.burn(tokenId);
            setBurnStatus(`Token ${tokenId} burned successfully`);
            getOwnedSBTs(); // Refresh owned tokens after burning
        } catch (error) {
            console.error(error);
            setBurnStatus(`Error burning token ${tokenId}`);
        }
    };

    const disclosure = async (tokenId: string) => {
        try {
            // const idDis = idInputOfDisclosure;

            // if (!idDis) {
            //     // Handle no ID entered
            //     return;
            // }

            await contract.tokenURI(tokenId);

            const userChoice1 = confirm('Do you want to disclose full information?');

            if (userChoice1) {
                fullydisclose(tokenId);
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
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "100vh" }}
        >
            <Paper elevation={3} sx={{ p: 4, width: "350px", m: "20px auto", mt: 10 }}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: teal[400] }}>
                        <PersonSearchIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
                        Your certs
                    </Typography>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={getOwnedSBTs}
                    >
                        Display your certs
                    </Button>
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => disclosure(token.tokenId)}
                                >
                                    Disclose
                                </Button>
                                {discloseStatus !== null && (
                                    <Box mt={2} textAlign="center">
                                        <Typography
                                            variant="body1"
                                        >
                                            {discloseStatus}
                                        </Typography>
                                    </Box>
                                )}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => burnToken(token.tokenId)}
                                >
                                    Burn
                                </Button>
                            </li>
                        ))}
                    </ul>
                </Grid>
            </Paper>
            {/* <Paper elevation={3} sx={{ p: 4, width: "350px", m: "20px auto", mt: 10 }}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: teal[400] }}>
                        <PersonSearchIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
                        Burn your certs
                    </Typography>
                    <TextField
                        label="TokenId"
                        variant="standard"
                        fullWidth
                        value={idInputOfBurn}
                        onChange={(e) => setIdInputOfBurn(e.target.value)}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={burnToken}
                    >
                        Burn
                    </Button>
                </Grid>
            </Paper>
            <Paper elevation={3} sx={{ p: 4, width: "350px", m: "20px auto", mt: 10 }}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: teal[400] }}>
                        <PersonSearchIcon />
                    </Avatar>
                    <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
                        Disclose
                    </Typography>
                    <TextField
                        label="TokenId"
                        variant="standard"
                        fullWidth
                        value={idInputOfDisclosure}
                        onChange={(e) => setIdInputOfDisclosure(e.target.value)}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={disclosure}
                    >
                        Disclose
                    </Button>
                    {discloseStatus !== null && (
                        <Box mt={2} textAlign="center">
                            <Typography
                                variant="body1"
                            >
                                {discloseStatus}
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Paper> */}
        </Grid>
    );
};

export default ManageCerts;