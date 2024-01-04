const DIDKit = require("../../lib/didkit_vc/didkit-wasm-node/didkit_wasm");
const fs = require("fs");

async function main() {
    generateKey("issuer_key.jwk", "issuer_did");
    generateKey("holder_key.jwk", "holder_did");
}

function generateKey(keyFilePath, didFilePath) {
    const key = DIDKit.generateEd25519Key()
    fs.writeFileSync(keyFilePath, key)

    const did = DIDKit.keyToDID("key", key);
    fs.writeFileSync(didFilePath, did);
}

main().then((res) => {
    console.log("Keys and DIDs generated successfully");
}).catch((err) => {
    console.error("Error generating keys and DIDs:", err);
});