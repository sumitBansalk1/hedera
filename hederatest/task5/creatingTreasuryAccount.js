const { Client, AccountAllowanceApproveTransaction, Hbar, PrivateKey, AccountBalanceQuery } = require("@hashgraph/sdk");

const creatingTreasuryAccount = async (AccountId1, PrivateKey1, AccountId2, amount) => {

    const AccountPrivateKey1 = PrivateKey.fromString(PrivateKey1);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(AccountId1, AccountPrivateKey1);

    //Create the transaction
    const transaction = new AccountAllowanceApproveTransaction()
        .approveHbarAllowance(AccountId1, AccountId2, Hbar.from(amount))
        .freezeWith(client);

    //Sign the transaction with the owner account key
    const signTx = await transaction.sign(AccountPrivateKey1);

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " + transactionStatus.toString());

    const queryMine = new AccountBalanceQuery().setAccountId(AccountId1);
    const accountBalanceMine = await queryMine.execute(client);

    console.log('Account1 balance in hbar is : '+ accountBalanceMine.hbars + "\n")

}

module.exports = creatingTreasuryAccount