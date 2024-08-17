const axios = require('axios');
const iso8583 = require('iso_8583');

// The existing sendTransaction function
async function sendTransaction(apiKey, transactionData) {
    try {
        // Validate that transactionData is not null or empty
        if (!transactionData || typeof transactionData !== 'object' || Object.keys(transactionData).length === 0) {
            throw new Error('Invalid transaction data.');
        }
        
        const paddedDE_37 = transactionData.DE_37.padStart(12, '0');
        let message = new iso8583({
            0: '0200',
            2: transactionData.DE_02,
            3: transactionData.DE_03,
            4: transactionData.DE_04,
            7: transactionData.DE_07,
            11: transactionData.DE_11,
            22: transactionData.DE_22,
            32: transactionData.DE_32,
            35: transactionData.DE_35,
            37: paddedDE_37,
            41: transactionData.DE_41,
            42: transactionData.DE_42,
            49: transactionData.DE_49,
            62: transactionData.DE_62
        });

        // Assuming getBufferMessage returns an object, convert it to Buffer if necessary
        let packedMessage = message.getBufferMessage();
        
        // If packedMessage is not a Buffer, attempt to convert it to a Buffer
        if (!(packedMessage instanceof Buffer)) {
            packedMessage = Buffer.from(JSON.stringify(packedMessage)); // Or other appropriate conversion
        }

        // Convert the packed message to a hex string
        const iso8583Message = packedMessage.toString('hex');
        console.log(iso8583Message);
        
        // Send the iso8583Message to the server
        const response = await axios.post('http://3.250.0.194:8290/iso8583/transactions', { iso8583Message }, {
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log('Transaction successful:', response.data);
            return response.data;
        } else {
            console.error('Unexpected response status:', response.status);
            return null;
        }
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
            return error.response.data; // Return the API error response for better debugging
        } else {
            console.error('Request Error:', error.message);
            return { status: 'error', message: error.message }; // Return the error message
        }
    }
}

// Express route handler
exports.processTransaction = async (req, res) => {
    const transactionData = req.body;
    const apiKey = 'bedd4188-e75d-4f6c-9fac-e3ecdb491b81'; // Replace with your actual API key

    // Validate that the transaction data is provided
    if (!transactionData || typeof transactionData !== 'object' || Object.keys(transactionData).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid transaction data provided',
        });
    }

    // Call the sendTransaction function
    const apiResponse = await sendTransaction(apiKey, transactionData);

    if (apiResponse && apiResponse.status !== 'error') {
        // If the transaction was successful, return the response to the client
        res.status(200).json({
            status: 'success',
            message: 'Transaction processed successfully',
            data: apiResponse
        });
    } else {
        // If there was an error, return an error response
        res.status(500).json({
            status: 'error',
            message: apiResponse.message || 'Failed to process transaction',
        });
    }
};
