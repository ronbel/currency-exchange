import './App.css';
import React from 'react';
import { useStoreContext } from './store';
import {CurrencyTable, CurrencySelect} from './components';

function App() {

  const { data } = useStoreContext();

  return (
    <div className="app">
      <h1>Currency Exchange App</h1>
      <h2>Base Currency: {data.baseCurrency}</h2>
      
      <CurrencySelect />

      <CurrencyTable />
    </div>
  );
}

export default App;
