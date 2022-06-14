import React, { useEffect, useState } from 'react'

function CheckBox(props) {
   const  [userinfo, setUserInfo] = useState({
        languages: [],
        
      });
      
      const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;
          
        // console.log(`${value} is ${checked}`);
         
        
        if (checked) {
          setUserInfo({
            languages: [...languages, value],
          
          });
        }
        else {
          setUserInfo({
            languages: languages.filter((e) => e !== value),
          
          });
        }
      };

      useEffect(()=>{
        let obj = {
          target:{
            name: props.checkboxElements.name,
            value:userinfo.languages
          }
        }
        props.onChangeHandler(obj)
      },[userinfo])
      
  return (
    
    <> <label>
      {props.checkboxElements.name}</label>
      {
        props.checkboxElements.enum.map((e,i)=>(
          <div key={i}>
          <input type={props.checkboxElements.type} name={props.checkboxElements.name} value ={e}  required={props.checkboxElements.validate.required} onChange = {e=>handleChange(e)}/>{e}</div>
        )
        )
      }
      </>
  )
}

export default CheckBox