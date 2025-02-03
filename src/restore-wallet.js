import { generateWallet, restoreWalletAccounts, generateSecretKey } from '@stacks/wallet-sdk';

const password = '123456789 ';
const secretKey = 'offer junk invest citizen burst dog walnut mechanic pink puppy thumb ensure card since gift pattern divorce choice fitness pattern marble motion circle case';
const baseWallet = generateWallet({
    password,
    secretKey
})

const restoredWallet = await restoreWalletAccounts({
  // `baseWallet` is returned from `generateWallet`
  wallet: baseWallet,
  gaiaHubUrl: 'https://hub.blockstack.org',
});

console.log(restoredWallet)