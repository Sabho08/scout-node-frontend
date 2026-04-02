const CACHE_KEY = 'fixed_inr_rate';
const CACHE_TIME = 48 * 60 * 60 * 1000; // 48 hours

let currentUsdToInr = 85.0; // Default fallback

export const fetchExchangeRate = async () => {
    // Check Cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { value, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TIME) {
            currentUsdToInr = value;
            console.log('Currency Pulse [REUSED]: 1 USD = ₹' + value.toFixed(2));
            return;
        }
    }

    try {
        const response = await fetch('https://data.fixer.io/api/latest?symbols=USD,INR&access_key=6613a4275f79afaef00024b2f0e3852f');
        const data = await response.json();
        if (data.success && data.rates.INR && data.rates.USD) {
            currentUsdToInr = data.rates.INR / data.rates.USD;
            localStorage.setItem(CACHE_KEY, JSON.stringify({ value: currentUsdToInr, timestamp: Date.now() }));
            console.log('Currency Pulse [DEPLOYED]: 1 USD = ₹' + currentUsdToInr.toFixed(2));
        }
    } catch (error) {
        console.error('Failed to sync Currency Intel:', error);
    }
};

export const convertToINR = (price: any, isAlreadyINR: boolean = false): string => {
    if (!price || price === 'Price TBA') return 'Price TBA';

    // Safety check: if price is an object, try to extract a numeric field
    if (typeof price === 'object') {
        const potentialPrice = price.value || price.amount || price.sellingPrice || price.raw;
        if (potentialPrice) price = potentialPrice;
        else return 'Price TBA';
    }

    let numericValue: number;
    if (typeof price === 'number') {
        numericValue = price;
    } else {
        const priceStr = String(price);
        numericValue = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    }

    if (isNaN(numericValue)) return 'Price TBA';

    // If it's already INR (Flipkart), don't multiply by exchange rate
    const inrValue = isAlreadyINR ? numericValue : (numericValue * currentUsdToInr);

    return '₹' + inrValue.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

// Initialize rate once
fetchExchangeRate();
