const express = require('express')
const utils = require('util')
const app = express()
app.use(express.static('public'))
 
app.get('/', function (req, res) {
    let test = {"data": "this is a test object", "array": [0,1,2]}
    res.sendFile(__dirname + '/public/test.html');
})

app.post('/mint', function (req, res) {
    const farmer_address = req.params.user_address;
    utils.delegatePermissions(farmer_address, keypairPath, password);
    console.log(`permissions successfully delegated`);
    res.sendFile(__dirname + '/public/test.html');
})

 
const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })