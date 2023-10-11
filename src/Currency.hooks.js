import { useEffect, useState } from 'react';

async function UseCurrencyHooks() {
  const [data, setData] = useState(null);
  // const [CAD, setCAD] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=5037fe75e709457fbf807bc1c9d01ab9"); 
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const currency = await response.json();
        setData(currency);
        console.log("Berhasil");
        console.log(currency)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return data;
}

export default UseCurrencyHooks;
