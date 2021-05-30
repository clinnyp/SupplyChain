const mint = require('../util')
const {Api} = require('@cennznet/api');
const createKeypair = require('./createKeypair')
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

async function main() {
const api = await Api.create({ provider: NIKAU_WS });

const delegator = await createKeypair("./accounts/5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu.json", "supbroimcool12");

const data = await mint.mintNew(api, delegator, "5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu",
 30, "5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu");

 console.log("testing " + data);
}
main();