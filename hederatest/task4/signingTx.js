const { ScheduleSignTransaction, Client, PrivateKey } = require("@hashgraph/sdk");

async function main(Account1, privateKey1, scheduleId) {
    console.log({Account1, privateKey1, scheduleId})

    const myPrivateKey = PrivateKey.fromString(privateKey1);

    const serializeScheduleId= Buffer.from(scheduleId, 'base64').toString();
    console.log({serializeScheduleId})

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(Account1, myPrivateKey);

    //Create the transaction
    const transaction = await new ScheduleSignTransaction()
        .setScheduleId(serializeScheduleId)
        .freezeWith(client)
        .sign(myPrivateKey);

    //Sign with the client operator key to pay for the transaction and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction status
    const transactionStatus = receipt.status;
    console.log("The transaction consensus status is " + transactionStatus);

}

module.exports= main
