const axios = require('axios');

// The existing sendTransaction function
async function sendTransaction(apiKey, transactionData) {
    try {
        const response = await axios.post('https://iso8583/transactions', transactionData, {
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
        } else {
            console.error('Request Error:', error.message);
        }
        return null;
    }
}

// Express route handler
exports.processTransaction = async (req, res) => {
    const transactionData = req.body;
    const apiKey = 'your-api-key-here'; // Replace with your actual API key

    // Call the sendTransaction function
    const apiResponse = await sendTransaction(apiKey, transactionData);

    if (apiResponse) {
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
            message: 'Failed to process transaction',
        });
    }
};
