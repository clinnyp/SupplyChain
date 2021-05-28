const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
    let test = {"data": "this is a test object", "array": [0,1,2]}
    res.send(test)
})
 
const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })