import axios from 'axios';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userAddress, prompt } = req.body;

  // Check if required parameters are provided
  if (!userAddress || !prompt) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    // Define the payload to send to the external URL
    const paraM = {
      userAddress,
      prompt,
    };

    // Send the POST request to the external API
    const response = await axios.post( 'https://hooks.potp.xyz/invoke', paraM,
    // {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    // }
  );

    // Return the response from the external API
    return res.status(200).json(response.data);

  } catch (error) {
    // Handle any errors from the external API or request
    console.error('Error invoking external API:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Error invoking external API', error: error.response?.data || error.message });
  }
}
