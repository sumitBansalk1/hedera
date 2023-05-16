const { PrivateKey, TopicMessageSubmitTransaction, Client } = require("@hashgraph/sdk");

async function submitMessage(myAccountId, privateKey, topicId) {

    const myPrivateKey = PrivateKey.fromString(privateKey);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    // Send one message
    let sendResponse = await new TopicMessageSubmitTransaction({ topicId: topicId, message: `${new Date()}`, })
        .execute(client);

    //Get the receipt of the transaction
    const getReceipt = await sendResponse.getReceipt(client);

    //Get the status of the transaction
    const transactionStatus = getReceipt.status;
    console.log("The message transaction status: " + transactionStatus);
}

module.exports=submitMessage;
