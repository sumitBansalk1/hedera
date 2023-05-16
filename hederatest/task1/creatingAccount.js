const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar } = require("@hashgraph/sdk");

async function creatingAccount(myAccountId, myPrivateKey) {

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    // This function return a result
    const result = {};

    for (let i = 1; i < 6; i++) {

        // Create new keys
        const newAccountPrivateKey = PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        // Create a new account with 200 Hbar starting balance
        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(new Hbar(200))
            .execute(client);

        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;

        console.log(`The new ${i} account ID is: ` + newAccountId);
        console.log(`The new ${i} account public Key is: ` + newAccountPublicKey.toString());
        console.log(`The new ${i} account private Key is: ` + newAccountPrivateKey.toString());

        // Storing the credential in result
        result[`Account${i}`] = {
            AccountId: newAccountId.toString(),
            PublicKey: newAccountPublicKey.toString(),
            PrivateKey: newAccountPrivateKey.toString()
        };

        // Verify the main account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(myAccountId)
            .execute(client);

        console.log("The main account balance is: " + accountBalance.hbars + " Hbar.");

        // Verify the new account balance
        const newAccountBalance = await new AccountBalanceQuery()
            .setAccountId(newAccountId)
            .execute(client);

        console.log(`The new account balance of ${i} is: ` + newAccountBalance.hbars + "Hbar."+"\n");
    }

    console.log('Account creation completed')
    
    return result;
}

// Exporting creatingAccount function
module.exports = creatingAccount;