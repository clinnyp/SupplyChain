module.exports = async (user_address) => {
    const address = user_address;
    const fs = require('fs');
    const map = fs.readFile('C:/Users/peter/Documents/NFThackathon/hackathon-setup/util/config.json', 'utf8', function(err, return_data){
        var obj = JSON.parse(return_data);
        var fileName = obj[address];
        var path = 'C:/Users/peter/Documents/NFThackathon/hackathon-setup/util/'
        var dataSource = path.concat(fileName);
        const test = fileName;
        return fs.readFile(dataSource, 'utf8', function(err, iot_data){
            return new Promise((resolve, reject) => {
            // Display the file content
            console.log("reading data file: " + iot_data);
            resolve(iot_data);
            })
        }); 
    })
}