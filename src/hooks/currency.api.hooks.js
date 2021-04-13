import axios from 'axios';
import { useMemo } from 'react';

class CurrencyApi {

    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.exchangerate.host'
        });
    }

    async getCurrencyList() {
        const apiResponse = (await this.client.get('/symbols')).data;
        return Object.values(apiResponse.symbols);
    }

    async getConversionRates(baseCurrency = 'ILS') {
        return (await this.client.get('/latest', { params: { base: baseCurrency } })).data.rates;
    }
}

export function useCurrencyApi() {
    return useMemo(() => new CurrencyApi(), []);
}