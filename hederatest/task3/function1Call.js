const { Client, ContractFunctionParameters, PrivateKey, ContractCallQuery, Hbar } = require("@hashgraph/sdk");

async function callFunction1(myAccountId,privateKey,contractId) {
    
    const myPrivateKey = PrivateKey.fromString(privateKey);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //Create the transaction to update the contract message
    const contractExecTx = new ContractCallQuery()
        //Set the ID of the contract
        .setContractId(contractId)
        //Set the gas for the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction("function1", new ContractFunctionParameters().addUint16(4).addUint16(3))
        // For submiting the query payment
        .setQueryPayment(new Hbar(2))

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx = await contractExecTx.execute(client);
    
    // Output we get
    const output= submitExecTx.getUint16(0).toString();

    //Log the output
    console.log("The outPut of function1 " + output);

    return output;
}

module.exports=callFunction1

