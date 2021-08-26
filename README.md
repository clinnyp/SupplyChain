<h1 align="center">SupplyChain</h1>

<img src="https://github.com/clintonphilathong/SupplyChain/blob/main/public/images/hackathon.jpeg">

## The Centrality CENNZnet Hackathon Challenge

CENNZnet is a New Zealand built public blockchain and Decentralised Applications platform - a tech venture in the Centrality ecosystem https://centrality.ai/

The task at hand was broad, leaving plenty of room for teams to be creative and also target their own passions. They were challenged to use the <a href="https://cennz.net/knowledge-hub/core-modules/introducing-the-cennznet-nft-module/">CENNZnet NFT module</a> to build a DApp or integrate them with an existing service.

<h2>Blog by Centrality 
    <a href="https://medium.com/centrality/developing-real-world-use-cases-for-nfts-tech-week-2021-hackathon-a66da020d92a">
        [Link]
    </a>
</h2>  

<b>Commendation: </b> <u>SupplyChain</u>

Not an official placer but commended by our judging panel was team Supply Chain. As the name suggests team SupplyChain’s focus was ironing out some of the many issues of verification in supply chains. Specifically, they were concerned with verifying the authenticity of valuable products such as Manuka honey when sold on the global market.

<p align="center">
    <img src="https://github.com/clintonphilathong/SupplyChain/blob/main/public/images/presentation.jpeg">
</p>

The team impressed the judges with their use of the Doughnut protocol for their authentication solution. This protocol allows individuals or entities to delegate the ability to mint or use their tokens. It’s a powerful tool for users of DApps but one which team Supply Chain has put to use for authentication.

How does their solution work?

1. An authorised and trusted entity (such as the Manuka Honey Association) has the authority to mint NFTs which establish that a product is genuine Manuka honey.

2. The trusted entity uses the Doughnut protocol to delegate the minting of a set number of NFT tokens to other companies. For example, a certified Manuka Honey producer can be given the delegated authority to mint a certain number of Manuka Honey NFTs to authorise their latest batch.

3. The authorised company can then mint these official NFTs and also imbed them with data which further establishes the value of the product. For example the GPS location of hives or purity readings of the honey.

4. When the honey is then sold, buyers can easily check the authenticity of the product by checking its associated NFTs. 

The interesting aspect of team Supply Chain’s solution is that by using the Doughnut protocol, they ensure that the NFT denotes product authenticity. Someone cannot simply mint their own Manuka Honey NFTs, the authenticity is only verified if they can see the NFTs have been delegated by the Manuka Honey Association.

## Install
1) clone the repo
2) `yarn`

## Setup
You can use the [CENNZnet Portal](https://cennznet.io/) to create an account. The keypair.json is downloaded to your machine when you create the account. 

Place the keypair json in the /accounts folder.

## Run it
1) in the root directory, do ```node server.js```
2) cd into the clients/ folder and run ```npm run dev```

The user guide for the CENNZnet Portal can be found [here](https://wiki.cennz.net/#/References/CENNZnet-infrastructures/Exploring-the-CENNZnet-UI).

