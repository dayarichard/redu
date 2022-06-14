import axios from 'axios';
import React, { useEffect } from 'react';
import { Link,useParams ,useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import {MdDeleteOutline} from 'react-icons/md'
import {GrFormView} from 'react-icons/gr'
import {FiEdit} from 'react-icons/fi'


export default function Create(props) {
  const [input, setInput] = React.useState([{ name: '', phone: '', email:'' }]);
  const [userData, setData] = React.useState([]);
  const [edit, setEdit] = React.useState(false)
  const [errors, setErros] = React.useState({});
  const param = useParams()
  const location = useLocation();
  const navigate = useNavigate()
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name && !input.phone && !input.email) {
      setErros({ name: 'required name', phone: 'required phone', email:'required email' });
      
    } else if (!input.name) {
      setErros({ name: 'required name' });
    } else if (!input.phone) {
      setErros({ phone: 'required phone' });
    } else if ( !input.phone && !input.email){
        setErros({phone:"required phone", email:'required email'})
    }
    else if (!input.email) {
        setErros({ email: 'required email' });
      } 
    else if(input.name !==""&& input.phone !== '' && input.email !=='') {
      setErros({});
      setData((prev) => [...prev, { ...input }]);
      setInput({
        name: '',
        phone: '',
        email:''
      });
      
      if(location.pathname==='/edit'){
        axios.put(`http://192.168.4.109:8080/api/contacts/${location.state.id}`,{name:input.name, phone:input.phone,email:input.email})
      .then(res=>{
        // console.log(res.data)
        alert("contact updated")
        setEdit(false)
        navigate("/",{replace:true})
        setInput({
            name: '',
            phone: '',
            email:''
          });
      })
      .catch(e=>{
        console.log(e)
      })
      }
      else if(location.pathname === '/create'){
      axios.post('http://192.168.4.109:8080/api/contacts',{name:input.name, phone:input.phone,email:input.email})
      .then(res=>{
        // console.log(res)
        alert(res.data.success)
        navigate("/",{replace:true})
        setInput({
            name: '',
            phone: '',
            email:''
          });
        
      
      })
      .catch(e=>{
        console.log(e)
        if(e.response.data.error.email!==undefined && e.response.data.error.name !== undefined&&e.response.data.error.phone !==undefined){
          alert(e.response.data.error.email.toString(),e.response.data.error.name.toString(),e.response.data.error.phone.toString())
        }
        else if(e.response.data.error.email !== undefined && e.response.data.error.phone!==undefined){
          alert(`${e.response.data.error.email.toString()}\n${e.response.data.error.phone.toString()}`)
          setInput(prev=> [...prev,{email :"",phone: '' }])
        }
        else if (e.response.data.error.name!==undefined){
          alert(e.response.data.error.name.toString())
        }

        else if (e.response.data.error.phone!==undefined){
          alert(e.response.data.error.phone.toString())
        }
        else if (e.response.data.error.email!==undefined){
          alert(e.response.data.error.email.toString())
        }
      })
    }}
  };
  const reset = ()=>{
    console.log("asdhnajs")
    let obj = {
      name: '',
      phone: '',
      email:''
    }
    setInput(obj);
  }
  useEffect(()=>{
      
     if(location.pathname === '/edit'){
        setInput(location.state)
      }
      if(location.pathname === '/create'){
       setInput({
           name: '',
           phone: '',
           email:''
          });
            }

            
   },[])

   
  
return(


<form  className='container'  onSubmit={handleSubmit}>
        <h5>Create Contact</h5>
        <div className='form-group'>
        <label htmlFor = "name">Name</label>
        <input
          type="text"
          name={'name'}
          id = 'name'
          onChange={handleChange}
          placeholder='Enter name'
          value={input.name}
        />
        <h4 style={{ color: 'red' }}>{errors && errors.name}</h4>
        </div>
        <div className='form-group'>
        <label htmlFor = "phone">phone</label>
        <input
          type="tel"
          name={'phone'}
          id = 'phone'
          pattern='[0-9]{10}'
          placeholder='enter phonenumber'
          onChange={handleChange}
          value={input.phone}
          maxLength={10}
        />
        <h4 style={{ color: 'red' }}> {errors && errors.phone}</h4>
        </div>
        <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type="email"
          name={'email'}
          id = 'email'
          placeholder='Enter email'
          onChange={handleChange}
          value={input.email}
        />
        <h4 style={{ color: 'red' }}> {errors && errors.email}</h4>
        <button className='btn btn-success'>Submit</button>
        <button onClick={reset} className='btn' type="button">Reset</button>
        </div>
      </form>
)
}