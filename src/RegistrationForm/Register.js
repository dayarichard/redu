   
import React, { useState } from 'react';
import useForm from "../useForm";
import validate from './LoginFormValidationRules';
import './index.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Form = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);
  const [IsUserAlreadyExists, setIsUserAlreadyExists]=useState('')
  const navigate = useNavigate()

   function login () {
    let loginDetails = {
      name : values.username,
      email : values.email,
      password :values.password,
     c_password  :values.confirmpassword
    }
    //console.log(loginDetails,"ajabj")
     axios.post('http://192.168.4.109:8080/api/register', loginDetails)
    .then(res=>{
      if(res.status===200){
        alert("user successfully Register")
        navigate("/login")
      }
    })
    .catch(e=>{
    if(e.response.data.error){
      //console.log(e.response.data.error.email.toString(), "dfsd")
      setIsUserAlreadyExists(
        `${e.response.data.error.name ? e.response.data.error.name.toString() :''}
        ${e.response.data.error.email?e.response.data.error.email.toString():''}
        ${e.response.data.error.password ?e.response.data.error.password.toString():''}
        ${e.response.data.error['c_password'] ? e.response.data.error['c_password'].toString() :''}
        `
        )
    }
  })
      
        
  }

  return (
    <div className="section is-fullheight">
          <div className="box">
            <form  onSubmit={handleSubmit} noValidate>
                <h1>Register Form</h1>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input autoComplete="off" className={`input ${errors.username && 'is-danger'}`} type="username" name="username" onChange={handleChange} value={values.username || ''} required />
                  {errors.username && (
                    <p className="text-danger">{errors.username}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                  <input autoComplete="off" className={`input ${errors.email && 'is-danger'}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                  {errors.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input className={`input ${errors.confirmpassword && 'text-danger'}`} type="password" name="confirmpassword" onChange={handleChange} value={values.confirmpassword || ''} required />
                </div>
                {errors.confirmpassword && (
                  <p className="text-danger">{errors.confirmpassword}</p>
                )}
              </div>
              {IsUserAlreadyExists !== ''?<p className='text-danger'>{IsUserAlreadyExists}</p>:""}
              <button type="submit" className="btn btn-primary is-block is-info mt-2">Register</button>
            </form>
          </div>
        
      
    </div>
  );
};

export default Form;