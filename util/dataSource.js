const fs = require('fs')

module.exports = async (user_address) => {
    const address = user_address;
    const path = __dirname + '\\json\\config.json';
    const map = JSON.parse(await fs.readFileSync(path, 'utf8'));
    const fileName = map[address].metadata_file;
    const datasource = __dirname + '\\json\\' + fileName;
    const data = JSON.parse(await fs.readFileSync(datasource, 'utf8')); //Refactor: readstream?
    return Promise.resolve(data);
}
