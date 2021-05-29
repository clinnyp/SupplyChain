const { Api } = require('@cennznet/api');
const createKeypair = require('./util/createKeypair');
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

const CENNZ = 16000;

module.exports = {

    /**
     * 
     * @param {*} farmer_address 
     * @param {*} keypairPath 
     * @param {*} password 
     */
    delegatePermission: async (farmer_address, keypairPath, password) => {
        let myKeyPair = await createKeypair(keypairPath, password);
        let api = await Api.create({ provider: "wss://nikau.centrality.me/public/ws" });
        console.log(`Connecting to CENNZnet...`);

        let txHash = await api.tx.genericAsset
            .transfer(16001, farmer_address, 10000)
            .signAndSend(myKeyPair);
    },

    createCollection: async (collectionId) => {
        throw new Error('Out of scope')
    },

    /**
     * 
     * @param {Api} api - Api Object 
     * @param {KeyringPair} delegator - Delegator Keypair
     * @param {String} address - User address
     * @param {Number} collectionId - Colletion Id for tokens
     * @param {String} tokenOwner - Token Owner address
     * @description creates new nft containing metadata from 'address' param. Mints on behalf of delgator and sends to tokenOwner
     */
    mintNew: async (api, delegator, address, collectionId, tokenOwner) => {
        const ds = require('./util/dataSource.js');
        const data = await ds(address);
        const data_as_string = JSON.stringify(data);

        const attributes = [
            {
                "Text": data_as_string
            },
            {
                "Timestamp": Date.now()
            }
        ];
        const tokenExtrinsic = api.tx.nft.mintUnique(collectionId, tokenOwner, attributes, null, null);

        tokenExtrinsic.signAndSend(delegator, ({ status }) => {
            if (status.isInBlock) {
                const txId = status.asInBlock.toString();
                console.log(`Completed at block hash #${txId}`);
                return Promise.resolve(txId);
            }
        }).catch((error) => {
            console.log(':( transaction failed', error);
            return Promise.reject(error);
        });
    },

    /**
     * 
     * @param {Api} api 
     * @param {KeyringPair} delegator 
     * @param {Array} tokenId 
     */
    burn: async (api, delegator, tokenId) => {
        api.tx.nft.burn(tokenId)
            .signAndSend(delegator, async ({ status, events }) => {
                if (status.isInBlock) {
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                    });
                    console.log(`txID: ${status.asInBlock.toString()}`);
                }
            });
    }
}







