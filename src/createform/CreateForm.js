import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {MdDeleteOutline} from 'react-icons/md'
import {GrFormView} from 'react-icons/gr'
import {FiEdit} from 'react-icons/fi'


export default function CreateForm(props) {
  const [input, setInput] = React.useState([{ name: '', phone: '', email:'' }]);
  const [userData, setData] = React.useState([]);
  const [edit, setEdit] = React.useState(false)
  const [errors, setErros] = React.useState({});
  const [apidata, setApidata] = React.useState([])
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(errors);
  };

  const callApi = async () => {
    await axios
      .get("http://192.168.4.109:8080/api/contacts")
      .then((res) => {
        setApidata(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
      
      if(edit){
        axios.put(`http://192.168.4.109:8080/api/contacts/${input.id}`,{name:input.name, phone:input.phone,email:input.email})
      .then(res=>{
        // console.log(res.data)
        alert("contact updated")
        setEdit(false)
        callApi();
      })
      .catch(e=>{
        console.log(e)
      })
      }
      axios.post('http://192.168.4.109:8080/api/contacts',{name:input.name, phone:input.phone,email:input.email})
      .then(res=>{
        // console.log(res)
        alert(res.data.success)
        callApi();
      
      })
      .catch(e=>{
        console.log(e)
      })
    }
  };

  const editHandler =(val)=>{
   setInput(val)
   if(val!==[]){

   
   setEdit(true)
   } else{
     setEdit(false)
   }
   
  }
  
  const deleteHandler = async(id)=>{
    await axios 
    .delete(`http://192.168.4.109:8080/api/contacts/${id}`)
    .then(res=>{
        alert(res.data.success)
        callApi();
    }).catch(e=>{
        console.log(e)
    })

    
} 
  
  useEffect(()=>{
    callApi()
  },[])
// console.log(apidata,"yuo")
  return (
    <>
    
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
        </div>
      </form>
    <div className="container">
        
        <h1 style={{textAlign : 'left', marginleft:'10px', marginTop:'10px'}}>UserList</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>phone</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {apidata&& apidata.map((val) => {
                return (
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.phone}</td>
                    <td>
                      <button className='table-btn' onClick={()=>deleteHandler(val.id)}><MdDeleteOutline title='Delete'/></button>
                      <button className='table-btn' onClick={()=>editHandler(val)}><FiEdit /></button>
                      <Link to = {`view/${val.id}`} ><GrFormView /></Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
