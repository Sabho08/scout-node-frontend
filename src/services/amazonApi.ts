interface SearchResult {
  asin: string;
  url?: string;
  image?: string;
  title?: string;
  price?: string;
  original_price?: string;
  currency?: string;
  rating?: string;
  reviews_count?: number;
  is_best_seller?: boolean;
  is_prime?: boolean;
}

const LOCAL_SERVER_URL = 'http://localhost:5000/api/amazon';

const fetchFromServer = async <T>(endpoint: string, params: Record<string, string>): Promise<T> => {
  const url = new URL(`${LOCAL_SERVER_URL}/${endpoint}`);
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
    throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const amazonApi = {
  getAutocomplete: async (query: string): Promise<string[]> => {
    try {
      const res: any = await fetchFromServer('autocomplete', { 
        query, 
        marketplace: 'com',
        language: 'en'
      });
      const suggestions = res.data?.suggestions || res.suggestions || [];
      return suggestions.map((s: any) => typeof s === 'string' ? s : (s.value || s.text || ''));
    } catch (error) {
      console.error('Autocomplete failed:', error);
      return [];
    }
  },

  search: async (query: string, page: number = 1): Promise<SearchResult[]> => {
    try {
      const res: any = await fetchFromServer('search', { 
        query, 
        marketplace: 'com', 
        language: 'en',
        page: page.toString(),
        sort: 'relevanceblender'
      });
      const products = res.data?.products || res.products || res.data || [];
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  },

  getProductDetails: async (asin: string): Promise<any> => {
    try {
      const res: any = await fetchFromServer('product-details', { 
        asin, 
        marketplace: 'com',
        language: 'en'
      });
      return res.data || res;
    } catch (error) {
      console.error('Details failed:', error);
      return null;
    }
  },

  getProductOffers: async (asin: string): Promise<any[]> => {
    try {
      const res: any = await fetchFromServer('product-offers', { 
        asin, 
        marketplace: 'com',
        language: 'en',
        page: '1'
      });
      const data = res.data || res;
      return data.offers || [];
    } catch (error) {
      console.error('Offers failed:', error);
      return [];
    }
  },

  getRelatedProducts: async (asin: string): Promise<any[]> => {
    try {
      const res: any = await fetchFromServer('product-related-products', { 
        asin, 
        marketplace: 'com',
        language: 'en'
      });
      const data = res.data || res;
      return data.related_products || [];
    } catch (error) {
      console.error('Related Products failed:', error);
      return [];
    }
  },

  getDeals: async (page: number = 1): Promise<any[]> => {
    try {
      const res: any = await fetchFromServer('deals', { 
        marketplace: 'com', 
        language: 'en',
        page: page.toString() 
      });
      const data = res.data || res;
      return data.deals || data.products || [];
    } catch (error) {
       console.error('Deals failed:', error);
       return [];
    }
  },

  getBestSellers: async (page: number = 1): Promise<any[]> => {
     try {
       const res: any = await fetchFromServer('best-sellers', {
         marketplace: 'com',
         language: 'en',
         page: page.toString()
       });
       const data = res.data || res;
       return data.products || [];
     } catch (error) {
       console.error('Best sellers failed:', error);
       return [];
     }
  }
};
