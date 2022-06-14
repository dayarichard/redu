import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ElementTypes from './ElementTypes'

function DynamicForm(props) {
    const [formElements, setFormElements]=useState([])
    const [formData, setFormData] = useState({})

    useEffect(()=>{

         axios.get('http://192.168.4.109:8080/api/getForm')
        .then(res=>{
           // console.log(res)
            setFormElements(res.data.success.formControlls)
        })
        .catch(e=>{
            //console.log(e)
        })
    },[])

    const onChangeHandler =(e)=>{
        //console.log(e,"dsfdf")        
        setFormData(
            prev =>({
                ...prev, [e.target.name]:e.target.value
            })
        )

        
    }

   const onSubmitHandler =()=>{
       console.log(formData, 'formData')
       let obj = {}
       setFormData(obj)
   }
  //console.log(formData,"data")
    return(
        <div className='dynamicform'>
            <form >
                {formElements.map((e,i)=>(<ElementTypes key={i} type ={e.type} elements ={e} formdata ={formData} onChangeHandler ={onChangeHandler} /> ))}
            <button type='button' onClick={onSubmitHandler}>
            Submit
            </button>
            </form>
        </div>
    )
}

export default DynamicForm