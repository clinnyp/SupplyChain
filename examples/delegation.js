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
    
    //console.log("Workaround delegation")
    //await util.delegatePermission(api, fonterra, addr.ALICE);
    await util.getDelegates(api, 75);
    
}

main().then(() => { }).catch((err) => {
    console.log(`Couldn\'t say hello because: ${err}`)
    exit(1)
});
