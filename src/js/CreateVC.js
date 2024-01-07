// const DIDKit = require("../../didkit_vc/didkit-wasm-node/didkit_wasm");
// const fs = require("fs");
// // cryptoモジュールはVCの id フィールドに一意な値を生成するために使用されます。
// const crypto = require("crypto");

// async function main() {
//     // ここでは"issuer_key.jwk" ファイルから秘密鍵（署名に使うやつ）を読み込み、文字列に変換します。
//     const issuerKey = fs.readFileSync("issuer_key.jwk").toString();
//     // 読み込んだ秘密鍵から DID（分散識別子）を生成します。これは VC の issuer フィールドに設定されます。
//     // 注意！！
//     // issuerKey には JSON Web Key (JWK) 形式の秘密鍵が含まれており、その中には公開鍵や鍵の種類などが記述されている. 
//     // DIDKit.keyToDID はこの情報を使って DID を生成し、その DID を issuerDid に格納しています。
//     const issuerDid = DIDKit.keyToDID("key", issuerKey)

//     const holderKey = fs.readFileSync("holder_key.jwk").toString();
//     const holderDid = DIDKit.keyToDID("key", holderKey);
//     const unsignedVc = {
//         "@context": [
//             "https://www.w3.org/2018/credentials/v1",
//             "https://www.w3.org/2018/credentials/examples/v1"
//         ],
//         "id": `urn:uuid:${crypto.randomUUID()}`,
//         "type": ["VerifiableCredential"],
//         "issuer": issuerDid,
//         "issuanceDate": "2024-01-01T00:00:00Z",
//         "credentialSubject": {
//             "id": holderDid,
//             "name": "Haruki",
//             "alumniOf": "Osaka University",
//             "degree": {
//                 "type": "BachelorDegree",
//                 "name": "Bachelor of Science"
//             },
//             "currentStatus": "He successfully got into the exchange program at university, and will be studying abroad at UC next summer. He is incredibly excited about this."
//         }
//     }
//     // ↓ここでは空のオブジェクトとしていますが、
//     // 実際の利用では署名に関する詳細なオプションを
//     // 指定することができます。 "https://www.w3.org/2018/credentials/examples/v1"
//     const proofOptions = {};
//     // DIDKit の issueCredential 関数を使用して 
//     // VC に署名を追加
//     // await を使用して非同期処理の完了を待つ
//     const signedVc = await DIDKit.issueCredential(
//         JSON.stringify(unsignedVc),
//         JSON.stringify(proofOptions),
//         // ↓署名に使う秘密鍵（上で定義）
//         // この秘密鍵の中には公開鍵や鍵の種類の情報も含まれている
//         issuerKey
//     )

//     // 署名された VC を JSON ファイルとして保存
//     fs.writeFileSync("signed-vc4.json", signedVc)
// }

// main().then(() => {
//     console.log("Verifiable Credential created successfully");
// }).catch((err) => {
//     console.error("Error creating Verifiable Credential:", err);
// });
const DIDKit = require("../../didkit_vc/didkit-wasm-node/didkit_wasm");
const crypto = require("crypto");

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
async function main() {
<<<<<<< HEAD
  // ここでは"issuer_key.jwk" ファイルから秘密鍵（署名に使うやつ）を読み込み、文字列に変換します。
  const issuerKey = fs.readFileSync("issuer_key.jwk").toString();
  // 読み込んだ秘密鍵から DID（分散識別子）を生成します。これは VC の issuer フィールドに設定されます。
  // 注意！！
  // issuerKey には JSON Web Key (JWK) 形式の秘密鍵が含まれており、その中には公開鍵や鍵の種類などが記述されている.
  // DIDKit.keyToDID はこの情報を使って DID を生成し、その DID を issuerDid に格納しています。
  const issuerDid = DIDKit.keyToDID("key", issuerKey);

  const holderKey = fs.readFileSync("holder_key.jwk").toString();
  const holderDid = DIDKit.keyToDID("key", holderKey);
  const unsignedVc = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
    ],
    id: `urn:uuid:${crypto.randomUUID()}`,
    type: ["VerifiableCredential"],
    issuer: issuerDid,
    issuanceDate: "2024-01-01T00:00:00Z",
    credentialSubject: {
      id: holderDid,
      name: "Haruki",
      alumniOf: "Osaka University",
      degree: {
        type: "BachelorDegree",
        name: "Bachelor of Science",
      },
      currentStatus:
        "He successfully got into the exchange program at university, and will be studying abroad at UC next summer. He is incredibly excited about this.",
    },
  };
  // ↓ここでは空のオブジェクトとしていますが、
  // 実際の利用では署名に関する詳細なオプションを
  // 指定することができます。 "https://www.w3.org/2018/credentials/examples/v1"
  const proofOptions = {};
  // DIDKit の issueCredential 関数を使用して
  // VC に署名を追加
  // await を使用して非同期処理の完了を待つ
  const signedVc = await DIDKit.issueCredential(
    JSON.stringify(unsignedVc),
    JSON.stringify(proofOptions),
    // ↓署名に使う秘密鍵（上で定義）
    // この秘密鍵の中には公開鍵や鍵の種類の情報も含まれている
    issuerKey
  );

  // 署名された VC を JSON ファイルとして保存
  fs.writeFileSync("signed-vc4.json", signedVc);
=======
    // ここでは"issuer_key.jwk" ファイルから秘密鍵（署名に使うやつ）を読み込み、文字列に変換します。
    const issuerKey = fs.readFileSync("issuer_key.jwk").toString();
    // 読み込んだ秘密鍵から DID（分散識別子）を生成します。これは VC の issuer フィールドに設定されます。
    // 注意！！
    // issuerKey には JSON Web Key (JWK) 形式の秘密鍵が含まれており、その中には公開鍵や鍵の種類などが記述されている. 
    // DIDKit.keyToDID はこの情報を使って DID を生成し、その DID を issuerDid に格納しています。
    const issuerDid = DIDKit.keyToDID("key", issuerKey)
=======
=======
>>>>>>> 5db99e5 (a)
>>>>>>> new_branch
async function createVerifiableCredential(
    issuerKeyPath,
    issuerDid,
    holderDid,
    name,
    issuanceDate,
    details
) {
    try {
        let issuerKey;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> dfc00de (a)
=======
>>>>>>> 5db99e5 (a)
>>>>>>> new_branch

        // Node.js 環境かどうかの判定
        if (typeof window === 'undefined') {
            // Node.js 環境の場合
            throw new Error("This function is intended for use in a browser environment.");
        } else {
            // ブラウザ環境の場合
<<<<<<< HEAD
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

module.exports = createVerifiableCredential;
=======
            // const response = await fetch(issuerKeyPath);
            // issuerKey = await response.text();
            issuerKey = fs.readFileSync(issuerKeyPath).toString();
        }

<<<<<<< HEAD
<<<<<<< HEAD
    // 署名された VC を JSON ファイルとして保存
    fs.writeFileSync("signed-vc4.json", signedVc)
>>>>>>> 2ed7a144c03dd58a99029d0fad71cef59a51a672
}

main()
  .then(() => {
    console.log("Verifiable Credential created successfully");
  })
  .catch((err) => {
    console.error("Error creating Verifiable Credential:", err);
<<<<<<< HEAD
  });
=======
});
>>>>>>> 2ed7a144c03dd58a99029d0fad71cef59a51a672
=======
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

module.exports = createVerifiableCredential;
>>>>>>> dfc00de (a)
=======
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

module.exports = createVerifiableCredential;
>>>>>>> 5db99e5 (a)
>>>>>>> new_branch
