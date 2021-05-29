module.exports = {
    delegatePermission = async function(farmer_address, keypairPath, password) {
    // Setup a keyring to sign messages
    let myKeyPair = await createKeypair(keypairPath, password);

    // Connect to Nikau network full nodes
    let api = await Api.create({ provider: "wss://nikau.centrality.me/public/ws" });
    console.log(`Connecting to CENNZnet...`);

    // Say hello, signing the message without keypair
    console.log(`Saying hello...\n\n`);

    let txHash = await api.tx.genericAsset
    .transfer(16001, farmer_address, 10000)
    .signAndSend(myKeyPair);
    }
};