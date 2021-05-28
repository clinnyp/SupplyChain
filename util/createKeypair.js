const { Keyring, KeyringPair } = require('@polkadot/keyring');
const fs = require('fs');

module.exports = async function createKeypair(keyPairPath, password) {
    let keyring = new Keyring({ type: 'sr25519' });
    let keyPairJson = JSON.parse(fs.readFileSync(keyPairPath));
    let myKeyPair = keyring.addFromJson(keyPairJson);
    myKeyPair.decodePkcs8(password); // unlock the keypair
    console.log(`My CENNZnet address is: ${keyring.encodeAddress(myKeyPair.address)}`);
    return myKeyPair;
}