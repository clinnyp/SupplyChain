const { Api } = require('@cennznet/api');
const express = require('express')
var cors = require('cors')
const app = express();

const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';
const PETER = '5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn';
const CENNZ = 16000;

app.use(cors())

app.get('/', function (req, res) {
    let test = { "data": "this is a test object", "array": [0, 1, 2] }
    res.send(test)
})

app.get('/admin/balance', async (req, res) => {
    const api = await Api.create({ provider: NIKAU_WS });
    let CENN_balance =  await api.query.genericAsset.freeBalance(16000, PETER);
    //let CPAY_balance =  await api.query.genericAsset.freeBalance(16001, PETER);
    //console.log(CENN_balance, CPAY_balance)
    res.send({CENNZ: CENN_balance, CPAY: 0});
})


const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})