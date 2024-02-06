import { type } from 'os';
import React, { InputHTMLAttributes, ReactPropTypes } from 'react';
import inputStyle from './input.module.css';

interface PROPS extends InputHTMLAttributes<HTMLInputElement>{
    inputname?:string,
}


function Input(props:Partial<PROPS>) {
    return ( 
        <div className={inputStyle.inputParent}>
            <input   {...props}  />  
            <span> {props.inputname}</span>      
        </div>
    );
}

export default Input;