import { HDKey } from '@scure/bip32';
import { mnemonicToSeed } from '@scure/bip39';
import { DerivationType, deriveAccount, deriveWalletKeys, getRootNode, getStxAddress } from '@stacks/wallet-sdk';
import { AddressVersion, privateKeyToAddress, PubKeyEncoding, publicKeyFromSignatureRsv, publicKeyFromSignatureVrs, publicKeyToAddress, publicKeyToAddressSingleSig, signMessageHashRsv, signWithKey } from '@stacks/transactions';
import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';


const SECRET_KEY =
  'sound idle panel often situate develop unit text design antenna ' +
  'vendor screen opinion balcony share trigger accuse scatter visa uniform brass ' +
  'update opinion media';

(async () => {
  const rootPrivateKey = await mnemonicToSeed(SECRET_KEY);
  console.log("rootPrivateKey: ", rootPrivateKey);
  const rootNode1 = HDKey.fromMasterSeed(rootPrivateKey);
  console.log("rootNode1", rootNode1);
  const derived = await deriveWalletKeys(rootNode1);
  console.log("deriveWalletKeys: ", derived);
  const rootNode = HDKey.fromExtendedKey(derived.rootKey);
  console.log("rootnode: ", rootNode);

  // Generate first account
  const account1 = deriveAccount({
    rootNode,
    index: 0,
    salt: derived.salt,
    stxDerivationType: DerivationType.Wallet,
  });
  // console.log("derived account 1: ", account1);
  const stxAddress1 = getStxAddress({ account: account1, network: 'testnet' });
  console.log("stxAddress 1: ", stxAddress1);
  console.log("stxAddress 1 private key: ", account1.stxPrivateKey);

  // Generate second account
  const account2 = deriveAccount({
    rootNode,
    index: 1,
    salt: derived.salt,
    stxDerivationType: DerivationType.Wallet,
  });
  // console.log("derived account 2: ", account2);
  const stxAddress2 = getStxAddress({ account: account2, network: 'testnet' });
  console.log("stxAddress 2: ", stxAddress2);
  console.log("stxAddress 2 private key: ", account2.stxPrivateKey);

  console.log("------------------------------SIGNING MESSAGE WITH ACCOUNT 1 ------------------------------");
  if (true) {
    const message = "Hello, world!";
    const messageHash = bytesToHex(sha256(message));
    const privateKey = account1.stxPrivateKey;
    const signature = signMessageHashRsv({messageHash, privateKey});
    console.log("This is the signature: ", signature);
    const uncompressedPublicKey = publicKeyFromSignatureRsv(
      messageHash,
      signature,
      PubKeyEncoding.Uncompressed
    )
    const compressedPublicKey = publicKeyFromSignatureRsv(
      messageHash,
      signature,
      PubKeyEncoding.Compressed
    )
    const addressGeneratedFromPublicKey = publicKeyToAddressSingleSig(compressedPublicKey, 'testnet');
    const addressGeneratedFromPrivateKey = privateKeyToAddress(privateKey, 'testnet');
    console.log("This is the uncompressed public key: ", uncompressedPublicKey);
    console.log("This is the compressed public key: ", compressedPublicKey);
    console.log("This is the address from the public key: ", addressGeneratedFromPublicKey);
    console.log("This is the address from the private key: ", addressGeneratedFromPrivateKey);
  }
  console.log("------------------------------SIGNING MESSAGE WITH ACCOUNT 2 ------------------------------");
  if (true){
    const message = "Hello, world!";
    const messageHash = bytesToHex(sha256(message));
    const privateKey = account2.stxPrivateKey;
    const signature = signMessageHashRsv({messageHash, privateKey});
    console.log("This is the signature: ", signature);
    const uncompressedPublicKey = publicKeyFromSignatureRsv(
      messageHash,
      signature,
      PubKeyEncoding.Uncompressed
    )
    const compressedPublicKey = publicKeyFromSignatureRsv(
      messageHash,
      signature,
      PubKeyEncoding.Compressed
    )
    const addressGeneratedFromPublicKey = publicKeyToAddressSingleSig(compressedPublicKey, 'testnet');
    const addressGeneratedFromPrivateKey = privateKeyToAddress(privateKey, 'testnet');
    console.log("This is the uncompressed public key: ", uncompressedPublicKey);
    console.log("This is the compressed public key: ", compressedPublicKey);
    console.log("This is the address from the public key: ", addressGeneratedFromPublicKey);
    console.log("This is the address from the private key: ", addressGeneratedFromPrivateKey);
  }
})();