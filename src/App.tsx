import React, {useEffect, useState} from 'react';
import s from'./App.module.css';
import {ExchangeWindow} from "./components/window";
import axios from "axios";
import Button from "@mui/material/Button";



function App() {

    const [rates , setRates] = useState<{[key:string]:number}>({})
    const [currency1, setCurrency1] = useState<string>('USD')
    const [currency2, setCurrency2] = useState<string>('EUR')
    const [value1,  setValue1] = useState<number>(0)
    const [value2,  setValue2] = useState<number>(0)

    useEffect( ()=> {
        axios.get('http://data.fixer.io/api/latest?access_key=6730edfba906e693b4a62b73487efa34')
            .then(res => {
                setRates(res.data.rates)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


        useEffect(() => {
            if (!!rates) {
                    onValue1ChangeHandler(1);
            }
        }, [rates]);

    const swap = () => {
        let newcur1 = currency2
        let newcur2 = currency1
       setCurrency1(newcur1)
        setCurrency2(newcur2)
        onValue1ChangeHandler(value1)
    }


    const rounding = (num : number) => {
        return Number(num.toFixed(4))
    }

    const currency1ChangeHandler = (currency: string) => {
        setCurrency1(currency)
        setValue2(rounding(value1 * rates[currency2] / rates[currency] ))
    }

    const onValue1ChangeHandler = ( value: number) => {
        if (!value){
            setValue2(0)
            setValue1(0)
            return
        }
        setValue1(value)
        setValue2(rounding(value * rates[currency2] / rates[currency1]))

    }

    const onValue2ChangeHandler = ( value: number) => {
        if (!value){
            setValue2(0)
            setValue1(0)
            return
        }
        setValue2(value)
        setValue1(rounding(value * rates[currency1] / rates[currency2] ))
    }

    const currency2ChangeHandler = (currency: string) => {
        setCurrency2(currency)
        setValue2(rounding(value1 * rates[currency] / rates[currency1] ))
    }

    const rate = ( rates[currency2] / rates[currency1]).toFixed(4)

  return (
    <div className={s.App}>
        <div className={s.AppContainer}>
            <div className={s.header}>
                <h2 className={s.title}> Exchange money </h2>
            </div>
            <div className={s.windowsContainer}>
                <ExchangeWindow
              rates={Object.keys(rates)}
              currency={currency1}
              onCurrencyChangeHandler={currency1ChangeHandler}
              value={value1}
              onValueChangeHandler={onValue1ChangeHandler}
              name={'from'}/>

                <ExchangeWindow
              rates={Object.keys(rates)}
              currency={currency2}
              onCurrencyChangeHandler={currency2ChangeHandler}
              value={value2}
              onValueChangeHandler={onValue2ChangeHandler}
              name={'to'}/>

            </div>
            <div className={s.footer}>
                <div className={s.swapButton}>
                    <Button variant="contained" onClick={swap} fullWidth>Swap</Button>
                </div>
                <div className={s.currentRate}>
                    <div>
                        <span className={s.span}>{rate}</span>
                    </div>
                    <div>Current rate:</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
