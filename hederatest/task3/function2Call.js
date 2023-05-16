const { Client, ContractFunctionParameters, ContractExecuteTransaction, PrivateKey } = require("@hashgraph/sdk");

const Web3 = require('web3');
const web3 = new Web3;
let abi;

async function callFunction2(myAccountId,privateKey,contractId, input) {

    const myPrivateKey = PrivateKey.fromString(privateKey);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Create the transaction to update the contract message
    const contractExecTx = new ContractExecuteTransaction()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction("function2", new ContractFunctionParameters().addUint16(input))

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx = await contractExecTx.execute(client);

    //Get the receipt of the transaction
    const receipt2 = await submitExecTx.getReceipt(client);

    //Confirm the transaction was executed successfully
    console.log("The transaction status is " + receipt2.status.toString());

    // a record contains the output of the function
    // as well as events, let's get events for this transaction
    const record = await submitExecTx.getRecord(client);
    
    // the events from the function call are in record.contractFunctionResult.logs.data
    // let's parse the logs using web3.js
    // there may be several log entries
    record.contractFunctionResult.logs.forEach(log => {
        // convert the log.data (uint8Array) to a string
        let logStringHex = '0x'.concat(Buffer.from(log.data).toString('hex'));

        // get topics from log
        let logTopics = [];
        log.topics.forEach(topic => {
            logTopics.push('0x'.concat(Buffer.from(topic).toString('hex')));
        });

        // decode the event data
        decodeEvent("function2", logStringHex, logTopics.slice(1));

    });

}

/**
 * Decodes event contents using the ABI definition of the event
 * @param eventName the name of the event
 * @param log log data as a Hex string
 * @param topics an array of event topics
 */
function decodeEvent(eventName, log, topics) {
    const contract = require("./artifacts/contract.json");
    abi = contract.abi;
    const eventAbi = abi.find(event => (event.name === eventName && event.type === "function"));
    const decodedLog = web3.eth.abi.decodeLog(eventAbi.inputs, log, topics);
    console.log(decodedLog);
    return decodedLog;
}

module.exports = callFunction2


