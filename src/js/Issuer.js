import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
import contractConfig from "../../config.js";

const main = () => {
  console.log("main START");

  // html elements
  const accountStatus = document.getElementById("accountStatus");
  const connectButton = document.getElementById("connectButton");

  const mintButton = document.getElementById("mintButton");
  const toAddressInput = document.getElementById("toAddressInput");
  const uriInput = document.getElementById("uriInput");
  const mintStatus = document.getElementById("mintStatus");

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
        mintButton.disabled = false;
        mintButton.onclick = onClickMint;

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

  const onClickMint = async () => {
    console.log("#onClickMint");

    try {
      const toAddress = toAddressInput.value;
      const message = uriInput.value;

      // Ensure there is a valid recipient address
      // Check if the recipient address is valid
      if (!toAddress) {
        alert("Please enter a recipient address");
        return;
      }

      // Ensure there is a message
      if (!message) {
        alert("Please enter a message");
        return;
      }

      // Call the smart contract's safeMint function
      const mintTx = await contract.safeMint(toAddress, message);
      await mintTx.wait();

      // Display success message
      mintStatus.innerHTML = `Minted token to ${toAddress}`;

      // Clear input fields after successful mint
      toAddressInput.value = "";
      uriInput.value = "";
    } catch (error) {
      console.error(error);
      alert("Error while minting token");
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
