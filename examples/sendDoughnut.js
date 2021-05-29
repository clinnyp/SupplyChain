const doughnutMaker = require('@plugnet/doughnut-maker');
const cennznut = require('@cennznet/cennznut');
const cennznet = require('@cennznet/api');
//const Keyring = require('@plugnet/keyring');
//const testingPairs = require('@plugnet/keyring/testingPairs');
//const util = require('@plugnet/util');
const _wasmCrypto = require("@plugnet/wasm-crypto");
const Ezra_address = "5DsqHecULBv5F8ELf8BpHcGEYPbZt3B6MFqyUm8RUq5b1Huu";

/// Helper for creating CENNZnuts
function makeCennznut(module, method) {
  return cennznut.encode(0, {
    "modules": {
      [module]: {
        "methods": {
          [method]: {}
        }
      }
    }
  });
}

/// Helper for creating v0 Doughnuts
async function makeDoughnut(
  issuer,
  holder,
  permissions,
) {
  return await doughnutMaker.generate(
    0,
    0,
    {
      issuer: issuer.publicKey,
      holder: holder.publicKey,
      expiry: Math.round(((new Date()).getTime() + 10000) / 1000),
      block_cooldown: 0,
      permissions: permissions,
    },
    issuer
  );
}

async function main() {
    await (0, _wasmCrypto.waitReady)();
    const api = await cennznet.Api.create({provider: 'wss://nikau.centrality.me/public/ws'});

    let doughnut = await makeDoughnut(
      Ezra_address,
      "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn",
      { "cennznet": makeCennznut("generic-asset", "transfer") }
    );
    const options = { doughnut: doughnut.encode() };

    const txHash = await api.tx.genericAsset
    .transfer(16001, "5GWVMKzwKVhdUXAv9dgTUZ4XUxXXTixgFZHnvKHRfwK93Hdn", 10000)
    .signAndSend(Ezra_address, options);
}

main().catch(console.error).finally(() => process.exit());