const { TopicCreateTransaction, Client, PrivateKey } = require("@hashgraph/sdk");

async function createConsenses(myAccountId,privateKey) {

    const myPrivateKey = PrivateKey.fromString(privateKey);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Create a new topic
    const txResponse = await new TopicCreateTransaction().execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Grab the new topic ID from the receipt
    const topicId = receipt.topicId;

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`);

    // Wait 5 seconds between consensus topic creation and subscription
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return topicId
    
}

module.exports=createConsenses
