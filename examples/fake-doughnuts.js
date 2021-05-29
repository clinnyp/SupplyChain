const { Api } = require('@cennznet/api');
const { Keyring, KeyringPair } = require('@polkadot/keyring');
const fs = require('fs');
const { exit } = require('process');
const createKeypair = require('../util/createKeypair');
// A websocket address for some CENNZnet full nodes
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

// Peter address
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const EZRA = '5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu'

// Asset Id for CENNZ in Nikau
const CENNZ = 16000;

async function main(keyPairPath, password) {
    // Setup a keyring to sign messages
    let delegator = await createKeypair(keyPairPath, password);
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);
    const transfer = api.tx.genericAsset.transfer(16000, PETER, 50000000);

    transfer.signAndSend(delegator, ({ events = [], status }) => {
        if (status.isInBlock) {
            console.log('Successful transfer of ' + 5000 + ' with hash ' + status.asInBlock.toHex());
        } else {
            console.log('Status of transfer: ' + status.type);
        }
        events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(phase.toString() + ' : ' + section + '.' + method + ' ' + data.toString());
        });
    });

    return [transfer];
}


main(keyPairPath, password)
    .then(([message, txHash]) => {
        console.log(`Tx Hash: ${txHash}`)
        //exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });

