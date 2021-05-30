const { Api } = require('@cennznet/api');
const { exit } = require('process');
const createKeypair = require('../util/createKeypair');
const addr = require('../util/address.exports');
const util = require('../util');

const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

async function main() {
    let fonterra = await createKeypair('./accounts/5GhH2czRJFktx6mtLjj7jcD3fJPCHB3ofo3PMKAT7xzSRso2.json', 'fonterra123');
    let api = await Api.create({ provider: NIKAU_WS });
    console.log(`Connecting to CENNZnet...`);

    const milk_collectionId = 74; //Delegator collection id = 75
    await util.mintNew(api, fonterra, addr.PETER, 74, addr.PETER);
}

main().then(() => { }).catch((err) => {
    console.log(`Couldn\'t say hello because: ${err}`)
    exit(1)
});
