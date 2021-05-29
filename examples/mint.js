const { Api } = require('@cennznet/api');
const { Keyring, KeyringPair } = require('@polkadot/keyring');
const { AssetInfo, AssetOptions } = require('@cennznet/types');
const { NFTStorage, File } = require('nft.storage')
const fs = require('fs');
const { exit } = require('process');
const createKeypair = require('../util/createKeypair');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGViRUJjZEI5NEEwMmEwNDVDMjM4YTk1MjUwNmU4YTU3NTNmQzU0RjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMjI1NzcxNjIyNywibmFtZSI6ImNlbm56In0.6FxsoNoNwpdBo-GKndGedV_GW5hk3yCNiv7beqmsPBE'
const client = new NFTStorage({ token: apiKey })

const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const EZRA = '5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu'

const CENNZ = 16000;

async function handleNFT() {
    // Setup a keyring to sign messages
    let keyPairPath = './accounts/5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu.json'
    let password = 'supbroimcool12'
    let delegator = await createKeypair(keyPairPath, password);
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    collectionOwner = delegator;
    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);

    let collectionId = 'test-collection';
    let schema = [
        ['name', 'text'],
        ['fingerprint', 'hash'],
        ['created', 'timestamp']
    ];

    const metadata = await client.store({
        name: 'Pinpie',
        description: 'Pin is not delicious beef!',
        image: new File([/* data */], 'pinpie.jpg', { type: 'image/jpg' })
      })    

    let collection = await api.tx.nft.createCollection(collectionId, metadata.url , null)
        .signAndSend(delegator, async ({ status, events }) => {
            if (status.isInBlock) {
                events.forEach(({ phase, event: { data, method, section } }) => {
                    console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                });
                console.log(await api.query.nft.collectionOwner(collectionId).toString());
            }
        });
    return [collection];
}

handleNFT()
    .then(([txHash]) => {
        console.log(`Tx Hash: ${txHash}`)
        //exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });
