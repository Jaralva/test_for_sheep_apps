import React, {ChangeEvent, useState} from "react";
import s from './window.module.css';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


type WindowPropsType = {
    rates: Array<string>
    currency: string
    onCurrencyChangeHandler: (value: string) => void
    value: number
    onValueChangeHandler: (value: number) => void
    name: string
}

export const ExchangeWindow = (props: WindowPropsType) => {

    return (
        <div className={s.windowContainer}>
            <div className={s.select}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" shrink={true}>
                        {props.name}
                    </InputLabel>
                    <NativeSelect

                        value={props.currency}
                        onChange={e => props.onCurrencyChangeHandler(e.target.value)}
                    >

                        {props.rates.map(rate => (
                                <option value={rate}>{rate}</option>
                            ))}
                    </NativeSelect>
                </FormControl>
            </div>
            <div className={s.input}>
                <TextField
                    fullWidth
                    defaultValue={''}
                    value={props.value}
                    onChange={e => props.onValueChangeHandler(Number(e.currentTarget.value))}
                />
        </div>
        </div>
    )
}