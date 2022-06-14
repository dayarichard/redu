import React from 'react'
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'

function ElementTypes(props) {
  
    switch(props.type){

        case 'text':
            return(
                <>
            <label htmlFor={props.elements.name}>{props.elements.label}</label>
            <input id={props.elements.name} type = {props.elements.type} onChange = {(e)=>props.onChangeHandler(e)} name ={props.elements.name} placeholder ={props.elements.placeholder} required ={props.elements.validate.required} value={props.formdata[props.elements.name]} minLength ={props.elements.validate.minLength} maxLength={props.elements.validate.maxLength}/>
            </>
            )
        case 'email':
            return(
                <>
            <label htmlFor={props.elements.name}>{props.elements.label}</label>
            <input id={props.elements.name} type = {props.elements.type} onChange = {(e)=>props.onChangeHandler(e)} name ={props.elements.name} placeholder ={props.elements.placeholder} required ={props.elements.validate.required} value={props.formdata[props.elements.name]} minLength ={props.elements.validate.minLength} maxLength={props.elements.validate.maxLength}/>
            </>
            )
        case 'radio':
            return(
                <RadioBox  elements = {props.elements} onChangeHandler = {props.onChangeHandler}/>
            )

        case 'select':
            return(
                <>
            <label htmlFor={props.elements.name}>{props.elements.label}</label>
            <select id={props.elements.name} type = {props.elements.type} value={props.formdata[props.elements.name]} onChange = {(e)=>props.onChangeHandler(e)} name ={props.elements.name} required={props.elements.validate.required} >
                {
                    props.elements.enum.map((s,i)=>(
                        <option key = {i}>
                            {s}
                        </option>
                    ))
                }
            </select>
            </>
            )
        case 'checkbox':
            return(
                <CheckBox  checkboxElements ={props.elements} onChangeHandler = {props.onChangeHandler}/>
            )
        case 'textarea':
            return(
                <>
                <label htmlFor={props.elements.name}>{props.elements.label}</label>
                <input id={props.elements.name} onChange = {(e)=>props.onChangeHandler(e)} type = {props.elements.type} name ={props.elements.name} placeholder ={props.elements.placeholder} required ={props.elements.validate.required} value={props.formdata[props.elements.name]}  maxLength={props.elements.validate.maxLength}/>
                </>
            )
        case 'date':
            return(
                <>
                <label htmlFor={props.elements.name}>{props.elements.label}</label>
                <input id={props.elements.name} onChange = {(e)=>props.onChangeHandler(e)} type = {props.elements.type} name ={props.elements.name} placeholder ={props.elements.placeholder} required ={props.elements.validate.required} value={props.formdata[props.elements.name]} min={props.elements.validate.min}  max={props.elements.validate.max}/>
                </>
            )    

            default:
                break


    }


}

export default ElementTypes