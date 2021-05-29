const { Api } = require('@cennznet/api');
const { Keyring, KeyringPair } = require('@polkadot/keyring');
const fs = require('fs');
const { exit } = require('process');
const createKeypair = require('../util/createKeypair');
// A websocket address for some CENNZnet full nodes
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';
const keyPair = require('../accounts/easyRun.js');

// Peter address
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const EZRA = '5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu'

// Asset Id for CENNZ in Nikau
const CENNZ = 16000;

//import { NFTStorage, File } from 'nft.storage'

// const apiKey = 'YOUR_API_KEY'
// const client = new NFTStorage({ token: apiKey })

// const metadata = await client.store({
//   name: 'Pinpie',
//   description: 'Pin is not delicious beef!',
//   image: new File([/* data */], 'pinpie.jpg', { type: 'image/jpg' })
// })
// console.log(metadata.url)

async function main() {
    // Setup a keyring to sign messages
    let delegator = await keyPair;
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    //mint nft
    const collectionId = 29;
    const tokenOwner = PETER;
    //const attributes = [
      //  {'Url': "https://test.test"}, {'Text': "Fonterra"}];
    const attributes = [{'Text': 'string'}, {'Text': 'string'}];
    const tokenExtrinsic = api.tx.nft.mintUnique(collectionId, tokenOwner, attributes, null, null);
    let payload = {}; 

    tokenExtrinsic.signAndSend(delegator, payload, ({ status }) => {
        if (status.isInBlock) {
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        }
    }).catch((error) => {
        console.log(':( transaction failed', error);
    });

    return [tokenExtrinsic];

}

async function mintNFT() {
    // Setup a keyring to sign messages
    let delegator = await keyPair;
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    //mint nft
    const collectionId = 29;
    const tokenOwner = PETER;
    const attributes = [
        {'Url': "https://test.test"}, {'Text': "Fonterra"}];
    const tokenExtrinsic = api.tx.nft.burn([29,0,0]);
    let payload = {}; 

    tokenExtrinsic.signAndSend(delegator, payload, ({ status }) => {
        if (status.isInBlock) {
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        }
    }).catch((error) => {
        console.log(':( transaction failed', error);
    });

    return [tokenExtrinsic];
}





main()
    .then(([message, txHash]) => {
        console.log(`Tx Hash: ${txHash}`)
        //exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });

