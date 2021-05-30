const fs = require('fs')
const https = require('https')
const request = require('request')
const fetch = require('node-fetch')



module.exports = async (user_address) => {
    // const address = user_address;
    // const path = __dirname + '\\json\\config.json';
    // const map = JSON.parse(await fs.readFileSync(path, 'utf8'));
    // const fileName = map[address].metadata_file;
    // const datasource = __dirname + '\\json\\' + fileName;
    // const data = JSON.parse(await fs.readFileSync(datasource, 'utf8')); //Refactor: readstream?

    
    
    var weather_data = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+
    "Auckland&units=metric&apikey=8d343b51b0e086789768ce27868abf1c")
    .then(res => {
        var result = res.body;
        return result;
    });
    return weather_data;

    // return https.get("https://api.openweathermap.org/data/2.5/weather?q="+
    // "Auckland&units=metric&apikey=8d343b51b0e086789768ce27868abf1c", (resp) => {
    // let data = '';
    // // A chunk of data has been received.
    // resp.on('data', (chunk) => {
    //     data += chunk;
    // });
    // //The whole response has been received. Print out the result.
    // resp.on('end', () => {
    //     console.log("data received " + JSON.stringify(data));
    //     return Promise.resolve(data);
    // })})
}





