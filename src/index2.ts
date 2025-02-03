import { deserializeTransaction, publicKeyToAddress, compressPublicKey } from "@stacks/transactions";

const raw = "0x8080000000040528f565e63a9f9078d6652b81c9832a9eff615ff200000000000000000000000000000dac000000030002e144cc7de3ac87096805c063510b4b8a5bf69d457f742341eaf43d7f2dcbcaa60201db0cfc1ff23d47e9dde808ff968f16c5e35fb777a1b8d5a9bc454427e3cb74835336177d2643f2523d51af335b3ebd18b44ab9372bc58d66bc78fa2f59e784450200afdf32a62f677874c829c0e7b8384e7a6438687e8f5940ef67c1c76ebdc3d8010af7cc8eb5eafb3b267c9e5fc849fcc4a93d2ecd79d8f9eee82cdb7a69c9542f000203020000000000051a779f318db96658234ba5bf41df62f360be729ae5000000000098968000000000000000000000000000000000000000000000000000000000000000000000";
const des = deserializeTransaction(raw);
console.log("Deserialized Transaction:", des);

// Extract the spending condition fields
const fields = (des as any).auth.spendingCondition.fields;

// Array to store signer addresses
const signers: string[] = [];

fields.forEach((el: any, index: any) => {
    console.log("--------------------------------------------------");
    console.log(`This is the field ${index}: `, el);

    let compressedPublicKey: string | Uint8Array;

    // Check if the public key is in Uint8Array format (compressed)
    if (el.contents.data instanceof Uint8Array) {
        compressedPublicKey = el.contents.data;
    }
    // Check if the public key is in hex format (uncompressed)
    else if (typeof el.contents.data === 'string' && el.contents.data.startsWith('04')) {
        // Compress the uncompressed public key
        compressedPublicKey = compressPublicKey(el.contents.data);
    } else {
        console.error(`Unsupported public key format for field ${index}:`, el.contents.data);
        return;
    }

    // Convert the compressed public key to an address
    const address = publicKeyToAddress(compressedPublicKey, 'testnet');
    console.log(`This is the signer of the field ${index}: `, address);

    // Add the address to the signers array
    signers.push(address);

    console.log("--------------------------------------------------");
});

// Display all signers
console.log("Signers of the transaction:", signers);