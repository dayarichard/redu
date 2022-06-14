import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Profile() {
    const state = useSelector(state=>state)
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('male')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')
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
    axios.get('http://192.168.4.109:8080/api/profile',{headers:{'Authorization': `Bearer ${state.currentUser}`}})
    .then(res=>{
      if(res.data!==""){
        navigate('/viewprofile',{replace:true})
      }
      
    })
    .catch(e=>{
        //console.log(e)
    })
},[])


  const saveData =(e)=>{
      e.preventDefault()
      const formData = new FormData();
      formData.append('first_name',firstname)
      formData.append('last_name',lastname)
      formData.append('gender',gender)
      formData.append('skills',userinfo.languages)
      formData.append('country',country)
      formData.append('image',image)
      
      axios.post(`http://192.168.4.109:8080/api/profile`,formData,{headers:{'Authorization':`Bearer ${state.currentUser}`}},)
      .then(res=>{
          //console.log(res,"sugdusg")
          if(res.status===200){
              navigate("/viewprofile", {replace:true})
              alert("Profile Created Successfully")
              setFirstname('')
              setCountry('')
              setGender('male')
              setImage('')
              setUserInfo(prev=>({...prev, languages:''}))
          }
      })
      .catch(e=>{
          console.log(e)
          if(e.response.error === "profile existed"){
            navigate('/viewprofile')
          }
          
          alert(`
          ${JSON.stringify(e.data.errors)}
          `)
      })
  }
  
  
  return (

    
    <div style={{height:'100vh', backgroundSize:'cover', backgroundColor:'grey', display:'flex',justifyContent:'center',padding:'20px'}}>
        <form style={{border:'2px solid blue',padding:'20px'}}>
            <div  className='d-flex flex-column justify-content-center' >
            <label htmlFor='firstname'>firstname</label>
            <input id='firstname' type = 'text' onChange = {e=>setFirstname(e.target.value)} name ='firstname' placeholder ='firstname'  value={firstname} />
            </div>
            <div className='d-flex flex-column justify-content-center'>
            <label htmlFor='lastname'>lastname</label>
            <input id='lastname' type = 'text' onChange = {(e)=>setLastname(e.target.value)} name ='lastname' placeholder ='lastname'  value={lastname} />
            </div>
            <div className='d-flex flex-column justify-content-center'>
                <label>Gender</label>
                <div><input type='radio' checked={gender === 'Male'} name='gender' onChange={()=>setGender("Male")} value='Male' />Male</div>
                <div><input type='radio' checked={gender==='Female'} name='gender' onChange={()=>setGender("Female")} value='Female' />Female</div>
            </div>
            <div className='d-flex flex-column justify-content-center'>
                <label>Skills</label>
                <div><input type='checkbox' onChange={handleChange} name='skills' value='html'/>Html</div>
                <div><input type='checkbox' onChange={handleChange} name='skills' value='css'/>css</div>
                <div><input type='checkbox' onChange={handleChange} name='skills' value='javascript'/>Html</div>
            </div>
            <div className='d-flex flex-column justify-content-center'>
                <label>
                    Country
                </label>
                <select value={country} onChange = {(e)=>{setCountry(e.target.value)}}>
                    <option>select</option>
                    <option value='india'>
                        India
                    </option>
                    <option value='nepal'>
                        Nepal
                    </option>
                </select>
            </div>
            <div>
                <label>Image</label>
                <input type={'file'}  onChange = {(e)=>setImage(e.target.files[0])}/>
            </div>
            <div>
            <button type='submit' onClick={saveData}>Submit</button>
            </div>
        </form>
    </div>
      )
}

export default Profile