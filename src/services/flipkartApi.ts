const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const fetchFromServer = async <T>(endpointPath: string, params: Record<string, string>): Promise<T> => {
  const url = new URL(`${BASE_URL}/flipkart/${endpointPath}`);
  Object.keys(params).forEach(key => {
    if (params[key]) url.searchParams.append(key, params[key]);
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Flipkart API Request Failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const flipkartApi = {
  search: async (query: string, page: number = 1): Promise<any[]> => {
    try {
      console.log('Fetching Flipkart Search Results for:', query);
      const res: any = await fetchFromServer('search', { 
        query, 
        page: page.toString(),
        sort: 'relevance'
      });
      return Array.isArray(res) ? res : res?.data || [];
    } catch (error) {
      console.error('Flipkart Search failed:', error);
      return [];
    }
  },

  getProductDetails: async (pid: string, pincode: string = '400001'): Promise<any> => {
    try {
      const res: any = await fetchFromServer('product-details', { 
        pid, 
        pincode
      });
      return res.data || res;
    } catch (error) {
      console.error('Flipkart Details failed:', error);
      return null;
    }
  }
};
