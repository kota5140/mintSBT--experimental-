import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
// import { verifyCredential } from "../../didkit_vc/didkit-wasm-node/didkit_wasm.js";
import contractConfig from "../../config.js";

/* イベントハンドラ（イベントが発生した際にやる処理. 下に発動条件がある） */
const onClickVerify = () => {
  // 任意のリンクに移動するための URL を指定します
  const verificationSiteLink = "https://vc-verification.vercel.app/";

  // クリックしたら指定のリンクに移動します
  window.location.href = verificationSiteLink;
};

const main = () => {
  console.log("main START");

  // html elements
  const accountStatus = document.getElementById("accountStatus");
  const connectButton = document.getElementById("connectButton");

  const getOwnedSBTsButton = document.getElementById("getOwnedSBTsButton");
  const ownedSBTsList = document.getElementById("ownedSBTsList");

  /* verifyButtonというidが与えられているボタン（要素）を取得 */
  const verifyButton = document.getElementById("verifyButton");
  /* verifyButtonがクリックされた時のイベントハンドラ（イベントが発生した際にやる処理） */
  verifyButton.onclick = onClickVerify;

  const burnButton = document.getElementById("burnButton");
  const idInputOfBurn = document.getElementById("idInputOfBurn");
  const burnStatus = document.getElementById("burnStatus");

  const discloseButton = document.getElementById("discloseButton");
  const idInputOfDisclosure = document.getElementById("idInputOfDisclosure");
  const discloseStatus = document.getElementById("discloseStatus");
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
        burnButton.onclick = onClickBurn;
        discloseButton.disabled = false;
        discloseButton.onclick = disclosure;

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
    console.log("#getOwnedSBTs");
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
  }

  const onClickBurn = async () => {
    console.log("#onClickBurn");

    try {
      const id_burn = idInputOfBurn.value;

      // Ensure there is a valid recipient address
      // Check if the recipient address is valid
      if (!id_burn) {
        alert("Please enter an id");
        return;
      }

      // Call the smart contract's burn function
      const burnTx = await contract.burn(id_burn);
      await burnTx.wait();

      // Display success message
      burnStatus.innerHTML = `Burned`;

      // Clear input fields after successful burn
      idInputOfBurn.value = "";
    } catch (error) {
      console.error(error);
      alert("Error while burning token");
    }
  };

  const disclosure = async () => {
    console.log("#disclosure");

    try {
      const id_dis = idInputOfDisclosure.value;

      if (!id_dis) {
        alert("Please enter an id");
        return;
      }

      /* idからそのtokenが存在しない場合はここでエラーを出す */
      await contract.tokenURI(id_dis);

      const userChoice1 = confirm("Do you want to disclose full information?");

      if (userChoice1) {
        fullydisclose();
      } else {
        const userChoice2 = confirm("Are you going to partially disclose information?");
        if (userChoice2) {
          partiallydisclose();
        }
      }

    } catch (error) {
      console.error(error);
      alert("Error while fetching token");
    }
  }

  const fullydisclose = async (id) => {
    console.log("#fullydisclose");
    /* ちゃんと初期化しましょう */
    id = idInputOfDisclosure.value;
    try {
      const sbtMetadataUrl = await contract.tokenURI(id);
      const response = await fetch(sbtMetadataUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${sbtMetadataUrl}`);
      }

      const sbtMetadata = await response.json();

      // VCのメタデータをIPFSから取得
      const vcMetadataUrl = sbtMetadata.verifiableCredentials[0];
      /* full VCのリンク表示 */
      discloseStatus.innerHTML = vcMetadataUrl;
    } catch (error) {
      console.error(error);
      alert("Error while fetching full VC");
    }
  }

  /* 未実装 */
  const partiallydisclose = async () => {
    console.log("#partiallydisclose");

    try {

      // Display success message
      discloseStatus.innerHTML = "";
    } catch (error) {
      console.error(error);
      alert("Error while fetching partial VC");
    }
  }
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
