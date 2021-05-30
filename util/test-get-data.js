const https = require('https')
const fs = require('fs')

https.get("https://api.openweathermap.org/data/2.5/weather?q="+
"Auckland&units=metric&apikey=8d343b51b0e086789768ce27868abf1c", (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
    fs.writeFile('helloworld.txt', data, function (err) {
        if (err) return console.log(err);
        console.log('done');
        });

  });



}).on("error", (err) => {
  console.log("Error: " + err.message);
});