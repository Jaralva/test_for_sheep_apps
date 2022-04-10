import React, {useEffect, useState} from 'react';
import s from'./App.module.css';
import {ExchangeWindow} from "./components/window";
import {getExchangeRate} from "./api/api";
import axios from "axios";

function App() {

    const [rates , setrates] = useState('')

    useEffect( ()=> {
        axios.get('http://data.fixer.io/api/latest?access_key=6730edfba906e693b4a62b73487efa34')
            .then(res => {
                setrates(res.data.rates)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

  return (
    <div className={s.App}>
        <div>
      <h2 className={s.title}> Exchange money </h2>
        <div className={s.windowsContainer}>
          <ExchangeWindow rates={rates}/>
          <ExchangeWindow rates={rates}/>
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
