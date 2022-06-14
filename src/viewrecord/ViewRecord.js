import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
export default function ViewRecord() {
    const[viewData, setViewData]=useState([])
    const param = useParams()
    const callApi = async () => {
        
        await axios
         .get(`http://192.168.4.109:8080/api/contacts/${param.id}`)
          .then((res) => {
            setViewData(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      
};
    
      useEffect(() => {
        
        callApi();
     
        
      }, [viewData]);
      
  return (
    <div>
        <table className='table table-hovered'>
          <thead>
            <tr>
              <th>name</th>
              <th>phonenumber</th>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
            {viewData &&
              [viewData].map((val) => (
                
                  <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>{val.phone}</td>
                    <td>{val.email}</td>
                  </tr>
            
              ))}
          </tbody>
        </table>
      </div>
  )
}
