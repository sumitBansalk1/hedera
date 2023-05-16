const config = require('config');
const createTx = require("./createTx");
const signingTx = require("./signingTx")

const AccountId1 = config.get('Account1.AccountId');
const PrivateKey1 = config.get('Account1.PrivateKey')

// If we weren't able to grab it, we should throw a new error
if (AccountId1 == null || PrivateKey1 == null) {
    throw new Error("Environment variables AccountId1 and PrivateKey1 must be present");
}

const AccountId2 = config.get('Account2.AccountId');

// If we weren't able to grab it, we should throw a new error
if (AccountId2 == null) {
    throw new Error("Environment variables AccountId2must be present");
}

const AccountId3 = config.get('Account3.AccountId');
const PrivateKey3 = config.get('Account3.PrivateKey')

// If we weren't able to grab it, we should throw a new error
if (AccountId3 == null|| PrivateKey3 == null) {
    throw new Error("Environment variables AccountId3 and PrivateKey3 must be present");
}

async function main() {
    try {

        // Creating schedule Tx
        const scheduleId= await createTx(AccountId3,PrivateKey3, AccountId1, AccountId2, 10)

        // Transfering to Account3 from treasury
        await signingTx(AccountId1,PrivateKey1, scheduleId)
       
        // For exiting
        process.exit()

    } catch (err) {
        console.log(err.message)

        // For exiting
        process.exit()
    }
}

main()