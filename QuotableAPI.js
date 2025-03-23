const quotes = [
  "The best way to predict the future is to create it. - Abraham Lincoln",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. - Ralph Waldo Emerson",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "You only live once, but if you do it right, once is enough. - Mae West",
  "It is never too late to be what you might have been. - George Eliot",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill"
];

// Function to get a random quote
module.exports.getData = async () => {
  try {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    // Split the quote into words (like we did with the API response)
    
    return randomQuote.split(' ');
  } catch (error) {
    console.error('Error fetching quote:', error.message);
  }
};
