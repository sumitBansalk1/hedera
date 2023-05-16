const { Client, AccountBalanceQuery, TransferTransaction, Hbar, PrivateKey } = require("@hashgraph/sdk");

async function transferHbar(AccountId2, PrivateKey2, AccountId1, toAccount, amount) {
    try {

        const AccountPrivateKey1 = PrivateKey.fromString(PrivateKey2);

        // Creating the client for signing and exexuting the transaction
        const client = Client.forTestnet();
        client.setOperator(AccountId2, AccountPrivateKey1);

        // Create the transfer transaction
        const transaction = new TransferTransaction()
            .addApprovedHbarTransfer(AccountId1, new Hbar(amount).negated())
            .addHbarTransfer(toAccount, new Hbar(amount))
            .freezeWith(client);


        // Sign with the client operator key and submit the transaction to a Hedera network
        const txId = await transaction.execute(client);

        // Request the receipt of the transaction
        const receipt = await txId.getReceipt(client);

        // Get the transaction consensus status
        const transactionStatus = receipt.status;

        console.log("The transaction consensus status is " + transactionStatus);

        // Create the queries
        const queryMine = new AccountBalanceQuery().setAccountId(AccountId2);
        const queryOne = new AccountBalanceQuery().setAccountId(AccountId1);
        const queryOther = new AccountBalanceQuery().setAccountId(toAccount);

        const accountBalanceMine = await queryMine.execute(client);
        const accountBalanceOther = await queryOther.execute(client);
        const accountBalanceOne = await queryOne.execute(client);

        console.log(`My account balance ${accountBalanceMine.hbars} HBar, \nother account balance ${accountBalanceOther.hbars} \nAccount1 balance is ${accountBalanceOne.hbars}\n\n`);
    } catch (err) {
        console.log(err.message+"\n")
    }
}

module.exports = transferHbar
