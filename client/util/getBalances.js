const axios = require('axios');

// Make a request for a user with a given ID
function getBalances () {
axios.get('http://localhost:7000/admin/balance')
  .then(res =>  {
    console.log('Testing!!!!!')
    // let balances = {
    //   CENNZ = res.data.CENNZ,
    //   CPAY = res.data.CPAY
    // }
    return balances
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

export default getBalances
