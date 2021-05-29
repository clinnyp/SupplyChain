const { Api } = require('@cennznet/api');
const express = require('express')
var cors = require('cors')
const app = express();

const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const CENNZ = 16000;

//Fonterra Account
const FONTERRA_PATH = './accounts/5GhH2czRJFktx6mtLjj7jcD3fJPCHB3ofo3PMKAT7xzSRso2.json'
const FONTERRA = '5GhH2czRJFktx6mtLjj7jcD3fJPCHB3ofo3PMKAT7xzSRso2'
const PASSWORD = 'fonterra123'


let delegators = [
    [0, "farmer0", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [1, "farmer1", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [2, "farmer2", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [3, "farmer3", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [4, "farmer4", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [5, "farmer5", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [6, "farmer6", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
    [7, "farmer7", "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn"],
]

async function _initialize(api, tokenId) {
    let data = {}
    data.stakingAssetId = await api.query.genericAsset.stakingAssetId(); // 1 on MainNet
    data.spendingAssetId = await api.query.genericAsset.spendingAssetId(); // 2 on MainNet
    data.CENNZ = await api.query.genericAsset.freeBalance(16000, FONTERRA);
    data.CPAY = await api.query.genericAsset.freeBalance(16001, FONTERRA);
    data.locks = await api.query.genericAsset.locks(FONTERRA);
    data.asset = await api.rpc.genericAsset.registeredAssets();
    data.delegators = delegators;
    data.delegatorAddresses = delegatorAddresses;
    data.timestamp = Date.now();

    return data;
}

async function main() {
    const api = await Api.create({ provider: NIKAU_WS });
    const init_data = await _initialize(api);

    app.use(cors());

    app.get('/', async function (req, res) {
        res.send(await _initialize(api))
    })

    app.get('/admin/balance', async (req, res) => {
        res.send(await _initialize(api));
    })

    app.get('/admin/delegators', async (req, res) => {
        res.send(delegators);
    })

    app.post('', (req, res) => {

    })

    const PORT = 7000 || process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })
}

main().then(() => { }).catch((err) => {
    console.log(`Main Error: ${err}`)
    exit(1)
});


const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})