import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import withRouter from '../withRouter'
import {BsFillEyeFill,BsFillEyeSlashFill} from 'react-icons/bs'

import './index.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from '../store/auth'
class LoginForm extends Component {
    state={
        myLoginObject:{
            username:{value:'',validation:''},
            password:{value:'',validation:''},
            isVisible:false,
            userDetails:[]
            
        },
        errors:''

        
    }

    componentDidMount(){
        // this.setState({userDetails:JSON.parse(localStorage.getItem("RegisteredUsers"))})
        // console.log(localStorage.getItem("currentUser")!==null,'akjsnaksn')
        // if (localStorage.getItem("currentUser")!==null){
        //     // const {history} = this.props
        //     // history('/home',{replace:true})
        //     <Navigate to="/home" />
        // }
        //console.log(this.props,"sdsdsdsdsd")
        
        
    }

    usernameHandler=(e)=>{
        let value = e.target.value
        let setData = {...this.state.myLoginObject}
        setData['username'].value = value
        this.setState(prevState=>({
            ...prevState,
            myLoginObject:setData
        }))
    }
    passwordHandler=(e)=>{
        let value = e.target.value
        let setData = {...this.state.myLoginObject}
        setData['password'].value = value
        this.setState(prevState=>({
            ...prevState,
            myLoginObject:setData
        }))
    }

    onpasswordView=(e)=>{
        this.setState({isVisible:e})
    }
    validation=()=>{
        const {userDetails} = this.state
        let myObject = {...this.state.myLoginObject}
        if(myObject.username.value===""){
            myObject['username'].validation='Username is required'

         } // else if(userDetails.find(e=>e.username===this.state.myLoginObject.username.value)===undefined){
        //     myObject['username'].validation='Username does not exists'
        // }
        else{
            myObject['username'].validation=''

        }
        if(myObject.password.value===''){
            myObject['password'].validation='Password is required'
        } //else if(userDetails.find(e=> e.username===this.state.myLoginObject.username.value &&  e.password===this.state.myLoginObject.password.value)===undefined){
            //myObject['password'].validation='Password is incorrect'
        //}
        else{
            myObject['password'].validation=''
        }

        this.setState(prevState=>({
            ...prevState,
            myLoginObject:myObject
        }))
    }
    onClickSubmitHandler=async(e)=>{
        e.preventDefault() 
        const {history} = this.props
        this.validation();
        let loginDetails = {
            email:this.state.myLoginObject.username.value,
            password:this.state.myLoginObject.password.value
        }
        
        // if((this.state.myLoginObject.username.value!=="" && this.state.myLoginObject.password.value!=='' &&userDetails.find(e=> e.username===this.state.myLoginObject.username.value &&  e.password===this.state.myLoginObject.password.value)!==undefined) ||( e.keyCode==='Enter')){
        //     localStorage.setItem("currentUser",JSON.stringify({user:this.state.myLoginObject.username.value,isLogin:true}))
            
        //     history("/home",{replace:true})
        // }
        //console.log(loginDetails,"gdg")
         
        
            await axios.post('http://192.168.4.109:8080/api/login', loginDetails)
           .then(res=>{
            this.props.loginUser(res.data.success.token)
            this.props.history("/")})
            .catch(e=>{
                console.log(e)
                this.setState({errors :JSON.stringify( e.response.data.error)})
            })

        
        
    
    }
  render() {
    return (
      <div className='login-form-contaniner d-flex flex-row justify-content-center'>
          <div>
          <h2 className='text-center text-info'>LoginForm</h2>
          <form onSubmit={this.onClickSubmitHandler} className='login-card'>
              <div className='d-flex flex-column'>
                  <label htmlFor='Username'>Username</label>
                  <input id='Username'type='text' value={this.state.myLoginObject.username.value} onChange={e=>this.usernameHandler(e)} />
                  <span className='text-danger'>{this.state.myLoginObject.username.validation}</span>
              </div>
              <div className='d-flex flex-column'>
                  <label htmlFor='Password'>Password</label>
                  <input id='Password' type={this.state.isVisible?"text":'password'} value={this.state.myLoginObject.password.value} onChange={e=>this.passwordHandler(e)} />
                  {this.state.isVisible?<BsFillEyeSlashFill className='eye' onKeyDown={e=>this.onClickSubmitHandle(e)} onClick={()=>this.onpasswordView(false)}/>:<BsFillEyeFill className='eye' onClick={()=>this.onpasswordView(true)}/>}
                  
                  <span className='text-danger'>{this.state.myLoginObject.password.validation}</span>  
              </div>
              <p className='text-danger mt-3'>{this.state.errors.toString()}</p>
              <div>
              <button type='submit' className='loginbtn btn btn-primary mt-3'   >Login</button>
            <Link to={'/register'}><button type='button' className='btn btn-success mt-3'>Register</button></Link>
              
              </div>
              
              
          </form>
          </div>
          

      </div>
    )
  }
}


const mapStateToProps = (dispatch) => {
    return {
        loginUser: (credentials) => dispatch(loginUser(credentials)),
    };
  };

export default connect(null,mapStateToProps)(withRouter(LoginForm))
