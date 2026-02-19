import axios from 'axios';

export const fetchPrices = async (productName: string) => {
  try {
    const response = await axios.post('http://localhost:8000/scrape', {
      item: productName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prices from Python scraper:', error);
    // Check for specific error conditions if possible, e.g., network error
    // For now, a general check that implies server might be down
    if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
      throw new Error('Scraper Unavailable: Could not connect to the scraping service.');
    }
    throw new Error('Failed to fetch prices: An unexpected error occurred.');
  }
};
