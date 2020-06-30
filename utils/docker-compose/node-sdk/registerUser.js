/*
 * SPDX-License-Identifier: Apache-2.0
 */

// FPC:
//   this is derived from the version in 'fabcar/javascript' in  'fabric-samples.git'.
//   Any changes to that version are marked below with 'FPC'

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function main() {
    try {

        var user = process.argv[2]; // FPC: user-privded arg

        // load the network configuration
	const ccpPath = path.resolve(__dirname, 'connection.json'); // FPC: different path ...
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.example.com'].url; // FPC:: different name
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const  userIdentity = await wallet.get(user); // FPC user-provided user
        if (userIdentity) {
            console.log(`An identity for the user "${user}" already exists in the wallet`); // FPC user-provided user
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: user, // FPC user-provided user
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: user, // FPC user-provided user
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(user, x509Identity); // FPC user-provided user
        console.log(`Successfully registered and enrolled user "${user}" and imported it into the wallet`); // FPC: user-provided user

    } catch (error) {
        console.error(`Failed to register user "${user}": ${error}`); // FPC user-provided user
        process.exit(1);
    }
}

main();
