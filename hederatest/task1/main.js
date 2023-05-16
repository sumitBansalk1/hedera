const creatingAccount = require("./creatingAccount");
const fs = require('fs');
const path = require('path')
// This use the env in which my main credentials are present which is present inside the task1 folder
require("dotenv").config();

// Grabing my Hedera testnet account ID and private key from your .env file
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

// If we weren't able to grab it, we should throw a new error
if (myAccountId == null || myPrivateKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Calling creatingAccount 
creatingAccount(myAccountId, myPrivateKey)
    // Saving the result in config/default.join
    .then(result => fs.writeFileSync(path.join(__dirname, "../config/default.json"), JSON.stringify(result)))
    // For catching error
    .catch(console.error);

