const config = require('config');
const creatingTreasuryAccount = require("./creatingTreasuryAccount");
const transferHbar = require("./transferHbar")

const AccountId1 = config.get('Account1.AccountId');
const PrivateKey1 = config.get('Account1.PrivateKey')

// If we weren't able to grab it, we should throw a new error
if (AccountId1 == null || PrivateKey1 == null) {
    throw new Error("Environment variables AccountId1 and PrivateKey1 must be present");
}

const AccountId2 = config.get('Account2.AccountId');
const PrivateKey2 = config.get('Account2.PrivateKey')

// If we weren't able to grab it, we should throw a new error
if (AccountId2 == null || PrivateKey2 == null) {
    throw new Error("Environment variables AccountId2 and PrivateKey2 must be present");
}

const AccountId3 = config.get('Account3.AccountId');

// If we weren't able to grab it, we should throw a new error
if (AccountId3 == null) {
    throw new Error("Environment variables AccountId3 must be present");
}

const AccountId4 = config.get('Account4.AccountId');

// If we weren't able to grab it, we should throw a new error
if (AccountId4 == null) {
    throw new Error("Environment variables AccountId4 must be present");
}

const treasuryAmount = 35

async function main() {
    try {

        // Creating treasury Account
        await creatingTreasuryAccount(AccountId1, PrivateKey1, AccountId2, treasuryAmount)
        // Transfering to Account3 from treasury
        await transferHbar(AccountId2, PrivateKey2, AccountId1, AccountId3, 15)
        // Transfering to Account4 from treasury
        await transferHbar(AccountId2, PrivateKey2, AccountId1, AccountId4, treasuryAmount-15)
        // Repeating the process
        await transferHbar(AccountId2, PrivateKey2, AccountId1, AccountId3, 15)
        await transferHbar(AccountId2, PrivateKey2, AccountId1, AccountId4, treasuryAmount-15)
        
        // For exiting
        process.exit()

    } catch (err) {
        console.log(err.message)
    }
}

main()