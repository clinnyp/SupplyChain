const { Api } = require('@cennznet/api');
const express = require('express')
const cors = require('cors');
const app = express();

const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const FONTERRA = '5GhH2czRJFktx6mtLjj7jcD3fJPCHB3ofo3PMKAT7xzSRso2';
const CENNZ = 16000;

async function _initialize(api) {
    let data = {}
    data.stakingAssetId = await api.query.genericAsset.stakingAssetId(); // 1 on MainNet
    data.spendingAssetId = await api.query.genericAsset.spendingAssetId(); // 2 on MainNet
    data.CENNZ = await api.query.genericAsset.freeBalance(16000, FONTERRA);
    data.CPAY = await api.query.genericAsset.freeBalance(16001, FONTERRA);
    data.locks = await api.query.genericAsset.locks(FONTERRA);
    data.asset = await api.rpc.genericAsset.registeredAssets();
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

    const PORT = 7000 || process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })
}

main().then(() => { }).catch((err) => {
    console.log(`Main Error: ${err}`)
    exit(1)
});


