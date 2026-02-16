import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL || 'http://localhost:8000';

export class IntegrationService {
  async comparePrices(productName: string): Promise<any> {
    try {
      const response = await axios.post(`${FASTAPI_BASE_URL}/compare`, {
        product_name: productName,
      });
      return response.data;
    } catch (error) {
      console.error('Error comparing prices:', error);
      throw error;
    }
  }
}