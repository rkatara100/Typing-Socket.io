// QuotableAPI.js
const axios = require('axios');

const uri = 'https://api.quotable.io/random';

module.exports.getData = async () => {
  try {
    const response = await axios.get(uri);
    return response.data.content.split(' ');  
    
  } catch (error) {
    console.error('Error fetching data from Quotable API:', error.message);
  }
};
