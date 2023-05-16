const config = require('config');
const contractDeployment = require("./contractDeployment");
const function1Call = require("./function1Call");
const function2Call = require("./function2Call");

const AccountId1 = config.get('Account1.AccountId');
const PrivateKey1 = config.get('Account1.PrivateKey')

// If we weren't able to grab it, we should throw a new error
if (AccountId1 == null || PrivateKey1 == null) {
    throw new Error("Environment variables AccountId1 and PrivateKey1 must be present");
}

async function main() {
    try {

        // Creating  Consenses
        const contractId = await contractDeployment(AccountId1, PrivateKey1)

        // Calling function1
        const output1= await function1Call(AccountId1, PrivateKey1, contractId)

        // Calling Function2
        await function2Call(AccountId1, PrivateKey1, contractId, output1)

        // For exiting
        process.exit()

    } catch (err) {
        console.log(err.message)

        // For exiting
        process.exit()
        
    }
}

main()