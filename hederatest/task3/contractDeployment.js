const { Client, PrivateKey, ContractCreateFlow } = require("@hashgraph/sdk");

async function contractDeployment(myAccountId,privateKey) {

    const myPrivateKey = PrivateKey.fromString(privateKey);

    // Creating the client for signing and exexuting the transaction
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    const contract = require("./artifacts/contract.json");
    const bytecode = contract.bytecode;

    // Instantiate the contract instance
    const contractTx = new ContractCreateFlow()
        .setGas(100000)
        .setBytecode(bytecode);

    //Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(client);

    //Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(client);

    //Get the smart contract ID
    const contractId = contractReceipt.contractId;

    //Log the smart contract ID
    console.log("The smart contract ID is " + contractId);

    return contractId.toString()

}

module.exports=contractDeployment;


