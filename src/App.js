import UseCurrencyHooks from './Currency.hooks';
import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const data = UseCurrencyHooks();
  const [currencyVal, setcurrencyVal] = useState({});
  const vallCurrency = {}
  const currencyKey = ["CAD","IDR","JPY","CHF","EUR","GBP"]
  useEffect(() => {
    if (!data) {
      return <div>Loading...</div>;
    }
    setIsLoaded(true);
    data.then(data => {
      if (data && data.rates) {
        const currencyKeys = Object.keys(data.rates);
        currencyKeys.forEach(currencyKey => {
          vallCurrency[currencyKey] = data.rates[currencyKey]
          setcurrencyVal(vallCurrency)
        })
      }
    })
    }, [data]);
  return (
    <div className="App">
    <div className="App-header">
      <h1>Project Currency Rates</h1>
      {isLoaded ?(
      <table className='table-currency'>
      <thead>
      <tr>
        <th>Currency</th>
        <th>We Buy</th>
        <th>Exchange Rate</th>
        <th>We Sell</th>
      </tr>
      </thead>
      <tbody>
      {Object.keys(currencyVal).map(item =>{
        const exchangeRates = parseFloat(currencyVal[item])
        const persenRates = exchangeRates*5/100
        const buyRates = (exchangeRates + persenRates).toFixed(4)
        const sellRates = (exchangeRates - persenRates).toFixed(4)
        if(currencyKey.includes(item)){
          return(
          <tr key={item}>
            <td>{item}</td>
            <td>{buyRates}</td>
            <td>{exchangeRates}</td>
            <td>{sellRates}</td>
          </tr>
          )
        }
      })}
      </tbody>
      </table>
      ):(<p>Loading...</p>)}
      </div>
    </div>
  );
}

export default App;
