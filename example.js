const { Api } = require('@cennznet/api');
const { Keyring, KeyringPair } = require('@polkadot/keyring');
const fs = require('fs');
const { exit } = require('process');
const createKeypair = require('./util/createKeypair');
// A websocket address for some CENNZnet full nodes
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

// Peter address
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';

// Asset Id for CENNZ in Nikau
const CENNZ = 16000;

async function sayHello(message, keyPairPath, password, amount) {
    // Setup a keyring to sign messages
    let myKeyPair = await createKeypair(keyPairPath, password);

    // Connect to Nikau network full nodes
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);

    let txHash = (await api.tx.system.remark(message).signAndSend(myKeyPair));

    return [message, txHash];
}

const [message, keyPairPath, password] = process.argv.slice(2);
if (!message) {
    console.log('please provide a message');
    exit(1);
}
if (!keyPairPath) {
    console.log('please provide the key pair path');
    exit(1);
}
if (!password) {
    console.log('please provide a password');
    exit(1);
}


sayHello(message, keyPairPath, password)
    .then(([message, txHash]) => {
        console.log(`Said hello 🚀: '${message}'\nTx Hash: ${txHash}`)
        exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });
