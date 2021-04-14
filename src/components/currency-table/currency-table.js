import React from 'react';
import { useStoreContext } from '../../store';
import './currency-table.css';

export default function CurrencyTable() {

    const { data, actions } = useStoreContext();

    return (
        <>
        <table>
            <thead>
            <tr>
                <th>Symbol</th>
                <th>Exchange Rate</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            {
                data.selectedCurrencies.map(currencySymbol => (
                    <tr key={currencySymbol}>
                        <td>{currencySymbol}</td>
                        <td>{data.exchangeRates[currencySymbol]}</td>
                        <td><button onClick={() => actions.removeCurrency(currencySymbol)}>Remove</button></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        {data.selectedCurrencies?.length === 0 && <h4>Select currencies to see their exchange rates with {data.baseCurrency}</h4>}
        </>
    )
}