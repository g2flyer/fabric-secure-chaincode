/*
 * SPDX-License-Identifier: Apache-2.0
 */

// FPC:
//   this is derived from the version in 'fabcar/javascript' in  'fabric-samples.git'.
//   Any changes to that version are marked below with 'FPC'

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function main() {
    try {
	// FPC:  get user, channel, chaincode and chaincode arguments from command line
        var user = process.argv[2]
        var channel = process.argv[3]
        var chaincode = process.argv[4]
	var chaincodeCommand = process.argv.slice(5,process.argv.length)

        // load the network configuration
	const ccpPath = path.resolve(__dirname, 'connection.json'); // FPC: different path ...
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(user); // FPC: user-provided value
        if (!identity) {
            console.log(`An identity for the user "${user}" does not exist in the wallet`); // FPC: user-provided value
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } }); // FPC: user-provided value

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel); // FPC: user-provided value

        // Get the contract from the network.
        const contract = network.getContract(chaincode); // FPC: user-provided value

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(...chaincodeCommand);// FPC: user-provided value & capture result
        console.log(`Transaction has been submitted, result is: ${result.toString()}`); // FPC: capture result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
