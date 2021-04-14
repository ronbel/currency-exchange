import React, { useContext, useReducer, createContext, useEffect } from 'react';
import { useCurrencyApi } from '../hooks/currency.api.hooks';
import {reducer, DEFAULT_STATE} from './reducer';
import {
    ADD_CURRENCY_TO_LIST,
    REMOVE_CURRENCY_FROM_LIST,
    CHANGE_BASE_CURRENCY,
    SET_INITIAL_EXCHANGE_RATES
} from './actions'



const StoreContext = createContext();



export function StoreProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

    const currencyApi = useCurrencyApi();


    useEffect(() => {
        const init = async () => {
            const initialExchangeRate = await currencyApi.getExchangeRates(state.baseCurrency);
            dispatch({ type: SET_INITIAL_EXCHANGE_RATES, payload: { exchangeRates: initialExchangeRate } });
        }
        init();
    }, []);


    const actions = {
        addCurrency: newCurrency => dispatch({ type: ADD_CURRENCY_TO_LIST, payload: { newCurrency } }),

        removeCurrency: currencyToRemove => dispatch({ type: REMOVE_CURRENCY_FROM_LIST, payload: { currencyToRemove } }),

        changeBaseCurrency: async newBaseCurrency => {
            const newExchangeRates = await currencyApi.getExchangeRates(newBaseCurrency);
            dispatch({ type: CHANGE_BASE_CURRENCY, payload: { newBaseCurrency, newExchangeRates } });
        }
    }



    return (
        <StoreContext.Provider value={{ data: state, actions }}>
            {children}
        </StoreContext.Provider>
    )

}

export const useStoreContext = () => useContext(StoreContext);