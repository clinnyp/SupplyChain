const fs = require('fs');
const { Api } = require('@cennznet/api');
const { Keyring, KeyringPair } = require('@polkadot/keyring');
const { exit } = require('process');
const createKeypair = require('./util/createKeypair');
// A websocket address for some CENNZnet full nodes
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';
const keyPair = require('./accounts/easyRun.js');
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const EZRA = '5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu'
// Asset Id for CENNZ in Nikau
const CENNZ = 16000;

module.exports.delegatePermission = async(farmer_address, keypairPath, password) => {
    // Setup a keyring to sign messages
    let myKeyPair = await createKeypair(keypairPath, password);
    // Connect to Nikau network full nodes
    let api = await Api.create({ provider: "wss://nikau.centrality.me/public/ws" });
    console.log(`Connecting to CENNZnet...`);
    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);
    let txHash = await api.tx.genericAsset
    .transfer(16001, farmer_address, 10000)
    .signAndSend(myKeyPair);
    }

module.exports.mintNew = async(user_address) => {
    const ds = require('./util/dataSource.js');
    // Setup a keyring to sign messages
    let delegator = await keyPair;
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);
    const collectionId = 29;
    const tokenOwner = PETER;
    const data = await ds(user_address);
    console.log(`data retrieved`);
    const data_as_string = data;
    const attributes = [
            {
            "Text" : data_as_string
            },
            {
            "Text" : "test"
            },
            {
                "Text" : "test2"
            },
            {
                "Text" : "test3"
            }
    ];
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






