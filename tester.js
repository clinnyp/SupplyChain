const m = require('./util.js');

async function main(){
    const response = m.mintNew("5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn");
    return response;
}

main()
    .then(([message, txHash]) => {
        console.log(`Tx Hash: ${txHash}`)
        //exit(0);
    })
    .catch((err) => {
        console.log(`Couldn\'t say hello because: ${err}`)
        exit(1)
    });