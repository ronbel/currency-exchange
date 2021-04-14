import React, { useState, useEffect } from 'react';
import { useStoreContext } from '../../store';
import { useCurrencyApi } from '../../hooks/currency.api.hooks';
import styles from './currency-select.module.css';


export default function CurrencySelect() {

    const { data, actions } = useStoreContext();
    const [currentSelection, setCurrentSelection] = useState(null);
    const [allCurrencies, setAllCurrencies] = useState([]);
    const currencyApi = useCurrencyApi();

    useEffect(() => {
        const init = async () => {
            const currenciesList = await currencyApi.getCurrencyList();
            setAllCurrencies(currenciesList);
            setCurrentSelection(currenciesList[0].code);
        }
        init();
    }, [currencyApi])


    const onSelectionChange = event => setCurrentSelection(event.target.value);
    const addSelectionToTable = () => actions.addCurrency(currentSelection);
    const setSelectionAsBaseCurrency = () => actions.changeBaseCurrency(currentSelection);

    return (
        <div className={styles.container}>
            <select value={currentSelection} onChange={onSelectionChange}>
                {
                    allCurrencies.map(curr => <option key={curr.code} value={curr.code}>{curr.description}</option>)
                }
            </select>

            <div className={styles['buttons-container']}>
                <button disabled={data.selectedCurrencies.includes(currentSelection)} onClick={addSelectionToTable}>Add To Table</button>
                <button disabled={data.baseCurrency === currentSelection} onClick={setSelectionAsBaseCurrency}>Set As Base Currency</button>
            </div>
        </div>
    )


}