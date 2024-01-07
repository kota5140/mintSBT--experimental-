const DIDKit = require("../didkit_vc/didkit-wasm-node/didkit_wasm");
const crypto = require("crypto");

export async function createVerifiableCredential(
    issuerKeyPath: string,
    issuerDid: string,
    holderDid: string,
    name: string,
    issuanceDate: string,
    details: string
): Promise<string> {
    try {
        let issuerKey: string;

        // Node.js 環境かどうかの判定
        if (typeof window === 'undefined') {
            // Node.js 環境の場合
            throw new Error("This function is intended for use in a browser environment.");
        } else {
            // ブラウザ環境の場合
            const response = await fetch(issuerKeyPath);
            issuerKey = await response.text();
        }

        const unsignedVc = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1",
            ],
            "id": `urn:uuid:${crypto.randomUUID()}`,
            "type": ["VerifiableCredential"],
            "issuer": issuerDid,
            "issuanceDate": issuanceDate,
            "credentialSubject": {
                "id": holderDid,
                "name": name,
                "details": details,
            },
        };

        const proofOptions = {};
        const signedVc = await DIDKit.issueCredential(
            JSON.stringify(unsignedVc),
            JSON.stringify(proofOptions),
            issuerKey
        );

        return signedVc;
    } catch (error) {
        throw new Error(`Error creating Verifiable Credential: ${error}`);
    }
}
