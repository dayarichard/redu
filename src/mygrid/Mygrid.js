
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../createform/CreateForm";
import { Link } from "react-router-dom";
import {MdDeleteOutline} from 'react-icons/md'
import {GrFormView} from 'react-icons/gr'
import {FiEdit} from 'react-icons/fi'
import{FaPlus} from 'react-icons/fa'
import {GrAddCircle} from 'react-icons/gr'
import {Button,Dropdown,DropdownButton,Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Logout from "../logout";
 
function Mygrid(props) {
  const [apiData, setApidata] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const co = useSelector(s=>s)
  const callApi = async () => {
    await 
    axios({
      method:'get',
      url:`http://192.168.4.109:8080/api/contacts`,
      headers:{
          'Authorization':`Bearer  ${co.currentUser}`
      }
     })
      .then((res) => {
        
        setApidata(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  const deleteHandler = async(id)=>{
      await axios 
      .delete(`http://192.168.4.109:8080/api/contacts/${id}`)
      .then(res=>{
          alert(res.data.success)
          handleClose();
          callApi();

      }).catch(e=>{
          console.log(e)
      })

      
  } 
  
 
  useEffect(() => {
    callApi();

  }, []);
  
  return (
    <div className="container">
      <h1>Home</h1>
      {/* <div >
        <a type="button" ><Logout /></a>
        <a type='button' ><Link to='/viewprofile' className="btn btn-primary text-white">profile</Link> </a>
        </div> */}
        <DropdownButton style={{float:'right'}} className='bg-transparent' id="dropdown-basic-button" title="">
  <Dropdown.Item href=""><a type="button" ><Logout /></a></Dropdown.Item>
  <a type='button' ><Link to='/viewprofile' className="btn btn-primary">profile</Link> </a>
</DropdownButton>
        
      <h5 style={{textAlign : 'left', marginleft:'10px', marginTop:'10px'}}>UserList</h5>
      <table className="table table-bordered">
        <thead>
          <tr><th><Link to={'create'}><GrAddCircle /></Link></th></tr>
        </thead>
        <thead className="thead-dark">
    
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>phone</th>
            <th>email</th>
            
          </tr>
        </thead>
        <tbody>
          {apiData&& apiData.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.phone}</td>
                  <td>{val.email}</td>
                  
                </tr>
              );
            })}
        </tbody>
      </table>
      

      
    </div>
  );
        }

export default Mygrid