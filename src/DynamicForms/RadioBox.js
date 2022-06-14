import React, { useEffect, useState } from 'react'

function RadioBox(props) {
    const [user, setUser]=useState('')

    const handleChange =(e)=>{
        setUser(e.target.value)
        let obj = {
            target:{
                name:props.elements.name,
                value:user
            }
        }
        props.onChangeHandler(obj)
    
    }

    useEffect(()=>{
        let obj = {
            target:{
                name:props.elements.name,
                value:user
            }
        }
        props.onChangeHandler(obj)
    },[user])

  return (
    <> <label>
    {props.elements.name}</label>
    {
      props.elements.enum.map((e,i)=>(
        <div key={i}>
        <input type={props.elements.type} name={props.elements.name} value ={e}  required={props.elements.validate.required} onChange = {e=>handleChange(e)}/>{e}</div>
      )
      )
    }
    </>
  )
}

export default RadioBox