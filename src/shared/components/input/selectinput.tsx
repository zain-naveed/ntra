import React, { InputHTMLAttributes, ReactPropTypes, SelectHTMLAttributes } from 'react';
import inputStyle from './input.module.css';

interface PROPS extends SelectHTMLAttributes<HTMLSelectElement>{
    inputname?:string,
}

function SelectInput(props:Partial<PROPS>) {
    console.log(props)
    return ( 
        <div className={inputStyle.inputParent}>
            <select {...props}  />
            <span> {props.inputname}</span>      
        </div>
    );
}

export default SelectInput;