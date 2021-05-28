const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
    let test = {"data": "this is a test object", "array": [0,1,2]}
    res.send(test)
})
 
app.listen(3000)