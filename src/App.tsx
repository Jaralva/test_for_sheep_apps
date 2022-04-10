import React, {useEffect, useState} from 'react';
import s from'./App.module.css';
import {ExchangeWindow} from "./components/window";
import axios from "axios";



function App() {

    const [rates , setrates] = useState('')
    const [currency1, setCurrency1] = useState('USD')
    const [currency2, setCurrency2] = useState('EUR')
    const [value1,  setValue1] = useState(1)
    const [value2,  setValue2] = useState(1)

    useEffect( ()=> {
        axios.get('http://data.fixer.io/api/latest?access_key=6730edfba906e693b4a62b73487efa34')
            .then(res => {
                setrates(res.data.rates)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const currency1ChangeHandler = (currency: string) => {
        setCurrency1(currency)
    }
    const currency2ChangeHandler = (currency: string) => {
        setCurrency2(currency)
    }


  return (
    <div className={s.App}>
        <div>
      <h2 className={s.title}> Exchange money </h2>
        <div className={s.windowsContainer}>
          <ExchangeWindow
              rates={Object.keys(rates)}
              currency={currency1}
              onCurrencyChangeHandler={currency1ChangeHandler}/>
          <ExchangeWindow
              rates={Object.keys(rates)}
              currency={currency2}
              onCurrencyChangeHandler={currency2ChangeHandler}/>
        </div>
      <div>
          <div>
              <button></button>
          </div>
          <div>
              <div>Current value:</div>
              <div>"VALUE"</div>
          </div>
      </div>
        </div>
    </div>
  );
}

export default App;
