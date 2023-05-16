const config = require('config');
const createConsenses = require("./createConsenses")
const submitMessage = require("./submitMessage")

const AccountId1 = config.get('Account1.AccountId');
const PrivateKey1 = config.get('Account1.PrivateKey')

// If we weren't able to grab it, we should throw a new error
if (AccountId1 == null || PrivateKey1 == null) {
    throw new Error("Environment variables AccountId1 and PrivateKey1 must be present");
}

async function main() {
    try {

        // Creating  Consenses
        const topicId = await createConsenses(AccountId1, PrivateKey1)
        // Submitting message
        await submitMessage(AccountId1, PrivateKey1, topicId)

        // For exiting
        process.exit()

    } catch (err) {
        console.log(err.message)
    }
}

main()