import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
import { contractConfig } from "../../config.js";

const main = () => {
  console.log("main START");

  // html elements
  const accountStatus = document.getElementById("accountStatus");
  const connectButton = document.getElementById("connectButton");

  const getOwnedSBTsButton = document.getElementById("getOwnedSBTsButton");
  const ownedSBTsList = document.getElementById("ownedSBTsList");

  const verifyButton = document.getElementById("verifyButton");
  const URIInput = document.getElementById("URIInput");
  const verifyStatus = document.getElementById("verifyStatus");

  const burnButton = document.getElementById("burnButton");
  const idInput = document.getElementById("idInput");
  const burnStatus = document.getElementById("burnStatus");

  // variable
  let account;
  let contract;

  // --------------------
  // Button Functions
  // --------------------
  const onClickConnect = async () => {
    console.log("#onClickConnect");

    try {
      const newAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /* アカウント配列一つ目のやつ */
      account = newAccounts[0];

      accountStatus.innerHTML = account;

      if (account) {
        // enable button
        getOwnedSBTsButton.disabled = false;
        getOwnedSBTsButton.onclick = getOwnedSBTs;
        burnButton.disabled = false;
        verifyButton.disabled = false;
        burnButton.onclick = onClickBurn;
        verifyButton.onclick = onClickVerify;

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOwnedSBTs = async () => {
    try {
      // Call the balanceOf function of the ERC721 contract to get the number of NFTs owned by the user
      const balance = await contract.balanceOf(account);

      // Clear the existing list
      ownedSBTsList.innerHTML = "";

      // Iterate through each NFT owned by the user
      for (let i = 0; i < balance; i++) {
        // Call the tokenOfOwnerByIndex function to get the tokenId of the NFT at index i
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);

        // Call the tokenURI function to get the URI of the token's metadata
        const tokenUri = await contract.tokenURI(tokenId);

        // Fetch metadata from the obtained URI
        const metadataResponse = await fetch(tokenUri);
        const metadata = await metadataResponse.json();

        // Access metadata properties and display them
        const listItem = document.createElement("li");
        // Display Name
        const nameElement = document.createElement("p");
        nameElement.textContent = `Name: ${metadata.name}`;
        // Adjust the font size for Name
        nameElement.style.fontSize = "24px";
        listItem.appendChild(nameElement);
        // Display Token ID
        const tokenIdElement = document.createElement("p");
        tokenIdElement.textContent = `Token ID: ${tokenId}`;
        listItem.appendChild(tokenIdElement);

        // Display Description
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Description: ${metadata.description}`;
        listItem.appendChild(descriptionElement);

        // Display Image
        const imageElement = document.createElement("img");
        imageElement.src = metadata.image;
        imageElement.alt = "Token Image";
        // Set a maximum width to limit the image size
        imageElement.style.maxWidth = "200px";
        listItem.appendChild(imageElement);
        ownedSBTsList.appendChild(listItem);
      }
    } catch (error) {
      console.error(error);
      alert("Error while fetching owned SBTs");
    }
  };

  const onClickBurn = async () => {
    console.log("#onClickBurn");

    try {
      const id = idInput.value;

      // Ensure there is a valid recipient address
      // Check if the recipient address is valid
      if (!id) {
        alert("Please enter an id");
        return;
      }

      // Call the smart contract's burn function
      const burnTx = await contract.burn(id);
      await burnTx.wait();

      // Display success message
      burnStatus.innerHTML = `Burned`;

      // Clear input fields after successful burn
      idInput.value = "";
    } catch (error) {
      console.error(error);
      alert("Error while burning token");
    }
  };

  const onClickVerify = async () => {
    console.log("#onClickVerify");

    try {
      const URI = URIInput.value;

      // Ensure there is a valid URI
      if (!URI) {
        alert("Please enter a URI");
        return;
      }

      // Import didkit module
      const didkit = await import("@spruceid/didkit-wasm");

      console.log(didkit);
      // Sample verifiable credential
      const signedSampleVc = {
        "@context": "https://www.w3.org/2018/credentials/v1",
        id: "urn:uuid:86a109aa-a3f6-4374-b46f-92c58fcb16a1",
        type: ["VerifiableCredential"],
        credentialSubject: {
          id: "did:example:my-data-subject-identifier",
        },
        issuer: "did:key:z6Mkv2hGUtUdKdEVdqc7esowafyriuqPvxQFnVTrRqjMknj2",
        issuanceDate: "2023-01-08T18:23:56Z",
        proof: {
          type: "Ed25519Signature2018",
          proofPurpose: "assertionMethod",
          verificationMethod:
            "did:key:z6Mkv2hGUtUdKdEVdqc7esowafyriuqPvxQFnVTrRqjMknj2#z6Mkv2hGUtUdKdEVdqc7esowafyriuqPvxQFnVTrRqjMknj2",
          created: "2023-01-08T07:43:50.818Z",
          jws: "eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..jyR9O8nb-ino0TXSCAhUdP2Z9iBc0E-aX7tyTHcFuOzOGd_uWpwHhA4gTOX961SUHB0un34e2YV41qc2lk0nCw",
        },
      };

      // Verify the verifiable credential
      const proofOptions = {};
      const result = await didkit.verifyCredential(
        JSON.stringify(signedSampleVc),
        JSON.stringify(proofOptions)
      );

      console.log(result);

      // Display success message
      verifyStatus.innerHTML = `Verified`;

      // Clear input field after successful verification
      URIInput.value = "";
    } catch (error) {
      console.error(error);
      alert("Error while verifying token");
    }
  };

  // --------------------
  // Initialize Functions
  // --------------------
  const checkMetaMaskClient = async () => {
    console.log("#checkMetaMaskClient");
    console.log("window.ethereum", window.ethereum);

    if (!window.ethereum) {
      connectButton.innerText = "Please Install MetaMask";
      connectButton.disabled = true;
    } else {
      connectButton.innerText = "Connect";
      connectButton.onclick = onClickConnect;
      connectButton.disabled = false;
    }
  };
  checkMetaMaskClient();
};

window.addEventListener("DOMContentLoaded", main);
