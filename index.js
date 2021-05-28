const { Api } = require('@cennznet/api');

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
    let myKeyPair = createKeypair(keyPairPath, password);

    // Connect to Nikau network full nodes
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);
    
    let txHash = (await api.tx.system.remark(message).signAndSend(myKeyPair));
    const transfer = api.tx.genericAsset.transfer(CENNZ, PETER, amount);
    const transfer_hash = await transfer.signAndSend(myKeyPair);

    return [message, txHash, transfer_hash];
}

const [message, keyPairPath, password, amount] = process.argv.slice(2);
if(!message) {
    console.error('please provide a message');
    exit(1);
}
if(!keyPairPath) {
    console.error('please provide the key pair path');
    exit(1);
}
if(!password) {
    console.error('please provide a password');
    exit(1);
}
if(!amount) {
    console.error('please provide a amount');
    exit(1);
}

sayHello(message, keyPairPath, password, amount)
    .then(([message, txHash]) => {
        console.log(`Said hello 🚀: '${message}'\nTx Hash: ${txHash}`)
        exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });
