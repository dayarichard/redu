import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function ViewProfile() {
    const navigate = useNavigate()
    
    const state = useSelector(state=>state)
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://192.168.4.109:8080/api/profile',{headers:{'Authorization': `Bearer ${state.currentUser}`}})
        .then(res=>{
          if(res.data===""){
            navigate('/createprofile',{replace:true})
          }
            //console.log(res.data,"sjdgj")
            setData(res.data)
          
        })
        .catch(e=>{
            console.log(e)
        })
    },[])

    //console.log(data.image.split('/')[2],"adsa")


  return (
<div className='d-flex flex-row justify-content-center align-items-center'>
<img alt='profile-img' src={`http://192.168.4.109:8080/storage/uploads/${data.image?data.image.split('/')[2]:''}`} style={{height:'300px',width:'300px'}} />

  <div>
<h6>Id :{data.id}</h6>
<h6> Firstname: {data.first_name}</h6>
<h6>Lastname :{data.last_name}</h6>
<h6>Gender:{data.gender}</h6>
<h6>Country :{data.country}</h6>
<h6>Skills :{data.skills}</h6>
<button type='button' className='btn btn-primary' onClick={()=>navigate(-1)}>back</button>
</div>


</div>
  )
}

export default ViewProfile