import {
    ADD_CURRENCY_TO_LIST,
    REMOVE_CURRENCY_FROM_LIST,
    CHANGE_BASE_CURRENCY,
    SET_INITIAL_EXCHANGE_RATES
} from './actions'

export const DEFAULT_STATE = {
    baseCurrency: JSON.parse(localStorage.getItem('baseCurrency')) || 'ILS',
    selectedCurrencies: JSON.parse(localStorage.getItem('selectedCurrencies')) || [],
    exchangeRates: {}
};



export function reducer(state, action) {

    const { type, payload } = action;

    const nextState = { ...state };

    switch (type) {
        case ADD_CURRENCY_TO_LIST: {
            const { newCurrency } = payload;
            nextState.selectedCurrencies = [...state.selectedCurrencies, newCurrency];
            break;
        }
        case REMOVE_CURRENCY_FROM_LIST: {
            const { currencyToRemove } = payload;
            nextState.selectedCurrencies = state.selectedCurrencies.filter(c => c !== currencyToRemove);
            break;
        }
        case CHANGE_BASE_CURRENCY: {
            const { newBaseCurrency, newExchangeRates } = payload;
            nextState.baseCurrency = newBaseCurrency;
            nextState.exchangeRates = newExchangeRates;
            break;
        }
        case SET_INITIAL_EXCHANGE_RATES: {
            const { exchangeRates } = payload;
            nextState.exchangeRates = exchangeRates;
            break;
        }

        default: return state;
    }

    localStorage.setItem('selectedCurrencies', JSON.stringify(nextState.selectedCurrencies));
    localStorage.setItem('baseCurrency', JSON.stringify(nextState.baseCurrency));

    return nextState;
}
