const { Api } = require('@cennznet/api');
const createKeypair = require('./util/createKeypair');
const NIKAU_WS = 'wss://nikau.centrality.me/public/ws';

const CENNZ = 16000;

module.exports = {

    /**
     * 
     * @param {Api} api 
     * @param {String} userAddress 
     * @description Delegate authority(doughnuts) to mint an NFT to a user address. 
     * Workaround: Since doughtnuts don't work, mint an NFT that stores the user address set ownership to delgator.
     * For Delegator to "revoke" authority, simply delete the representative NFT.
     */
    delegatePermission: async (api, delegator, userAddress) => {
        const delegatorCollection = 75;
        console.log(`Delegating address ${userAddress} in collection ${delegatorCollection}`)
        const attributes = [
            {
                "Text": userAddress
            },
            {
                "Timestamp": Date.now()
            }
        ];

        //Placeholder doughnut 
        const tokenExtrinsic = api.tx.nft.mintUnique(delegatorCollection, delegator.address, attributes, null, null);

        tokenExtrinsic.signAndSend(delegator, ({ status, events }) => {
            if (status.isInBlock) {
                const txId = status.asInBlock.toString();
                events.forEach(({ phase, event: { data, method, section } }) => {
                    console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                });
                console.log(`Completed at block hash #${txId}`);
            }
        }).catch((error) => {
            console.log(':( transaction failed', error);
        });
    },

    getDelegates: async (api, collectionId) => {
        let collectionName = new TextDecoder().decode(await api.query.nft.collectionName(collectionId));
        console.log(collectionName);

        let delegates = (await api.derive.nft.tokenInfoForCollection(collectionId));

        let list = [];

        for (let i = 0; i < delegates.length; i++) {
            const cId = parseInt(delegates[i].tokenId.get('collectionId'));
            const sId = parseInt(delegates[i].tokenId.get('seriesId'));
            const sN = parseInt(delegates[i].tokenId.get('serialNumber'));
            const delegate = (await api.derive.nft.tokenInfo([cId, sId, sN]));

            list.push(delegate);
        }
        console.log(list)
        return list;

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
                events.forEach(({ phase, event: { data, method, section } }) => {
                    console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                });
                console.log(`Completed at block hash #${txId}`);
            }
        }).catch((error) => {
            console.log(':( transaction failed', error);
        });
    },

    /**
     * 
     * @param {Api} api 
     * @param {KeyringPair} delegator 
     * @param {Array} tokenId 
     */
    revoke: async (api, delegator, tokenId) => {
        api.tx.nft.burn(tokenId)
            .signAndSend(delegator, async ({ status, events }) => {
                if (status.isInBlock) {
                    const txId = status.asInBlock.toString();
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                    });
                    console.log(`Completed at block hash #${txId}`);
                }
            });
    }
}







