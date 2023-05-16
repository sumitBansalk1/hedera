const {TransferTransaction,Client,ScheduleCreateTransaction,PrivateKey,Hbar} = require("@hashgraph/sdk");

async function main(myAccountId,privateKey, Account1, Account2, amount) {

    const myPrivateKey = PrivateKey.fromString(privateKey);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Create a transaction to schedule
    const transaction = new TransferTransaction()
        .addHbarTransfer(Account1, Hbar.from(-amount))
        .addHbarTransfer(Account2, Hbar.from(amount));

    //Schedule a transaction
    const scheduleTransaction = await new ScheduleCreateTransaction()
        .setScheduledTransaction(transaction)
        .setScheduleMemo("Scheduled TX2!")
        .setAdminKey(myPrivateKey)
        .execute(client);

    //Get the receipt of the transaction
    const receipt = await scheduleTransaction.getReceipt(client);

    //Get the schedule ID
    const scheduleId = receipt.scheduleId;
    console.log("The schedule ID is " +scheduleId);

    //Get the scheduled transaction ID
    const scheduledTxId = receipt.scheduledTransactionId;
    console.log("The scheduled transaction ID is " +scheduledTxId);

    // return the serialize base64 output
    return Buffer.from(scheduleId.toString()).toString('base64')
}

module.exports=main
