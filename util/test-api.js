const mint = require('../util')
const {Api} = require('@cennznet/api');
const createKeypair = require('./createKeypair')
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

async function main() {
const api = await Api.create({ provider: NIKAU_WS });

const delegator = await createKeypair("C:/Users/peter/Documents/NFThackathon/hackathon-setup/accounts/5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn.json", "re343bnm");

const data = await mint.mintNew(api, delegator, "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn",
 29, "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn");

 console.log("testing " + data);
}
main();