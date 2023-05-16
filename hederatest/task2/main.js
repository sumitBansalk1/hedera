const { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenSupplyType,  CustomRoyaltyFee, CustomFixedFee,  Hbar } = require("@hashgraph/sdk");
const config = require('config');
 
// get and prepare credentials
const newAccountId1 = config.get('Account1.AccountId');
const newPrivateKey1 = config.get('Account1.PrivateKey')? PrivateKey.fromString(config.get('Account1.PrivateKey')) :null

 
// Account1 details
const account2Id = config.get('Account2.AccountId');

// check credentials
if(newAccountId1 ===null || newPrivateKey1 === null){
    throw new Error("Environment variables newAccountId1 and newPrivateKey1 must be present");
}
 
// create a Hedera test network
const client = Client.forTestnet();
client.setOperator(newAccountId1, newPrivateKey1);
 
async function createNFT() {
    try {
 
        const fee1 =await new CustomRoyaltyFee()
            .setNumerator(10)
            .setDenominator(100)
            .setFeeCollectorAccountId(account2Id)
            .setFallbackFee(new CustomFixedFee().setHbarAmount(new Hbar(200)));

        const createNFTTransaction = await new TokenCreateTransaction()
            .setTokenName("My TNFT")
            .setTokenSymbol("TNFT")
            .setTokenType(TokenType.NonFungibleUnique)
            .setDecimals(0)
            .setInitialSupply(0)
            .setMaxSupply(5)
            .setCustomFees([fee1])
            .setTreasuryAccountId(newAccountId1)
            .setSupplyType(TokenSupplyType.Finite)
            .setSupplyKey(newPrivateKey1)
            .freezeWith(client);
 
        //Sign the transaction with the treasury key
        let nftCreateTxSign = await createNFTTransaction.sign(newPrivateKey1);
 
        //Submit the transaction to a Hedera network
        let nftCreateSubmit = await nftCreateTxSign.execute(client);
 
        //Get the transaction receipt
        let nftCreateRx = await nftCreateSubmit.getReceipt(client);
 
        //Get the token ID
        let tokenId = nftCreateRx.tokenId;
 
        //Log the token ID
        console.log(`Created NFT with Token ID: ${tokenId}`);
 
    } catch (error) {
        const err = new Error(error);
        const formatErr = JSON.parse(err.message);
        console.log(`Error Status: ${formatErr.status} \n`);
        console.log(formatErr.message);
    }
 
    process.exit();
}
 
createNFT();