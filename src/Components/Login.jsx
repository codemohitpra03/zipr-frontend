import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()
    useEffect(() => {
      async function fetchData(){
          try {
              axios.defaults.withCredentials = true;
              const response = await axios.get('http://localhost:8000/auth/protected',{
                  // headers: {
                  //     access_token: token
                  // }
              })
              console.log(response);
              if(response.data){
                  navigate('/protected')
              }
          } catch (error) {
              console.log("not logged in");
              navigate('/login')
          }
      }
      fetchData()
  }, [])
    const handleSubmit = async () => {
        console.log(username, password)
        const user = await axios.post('http://localhost:8000/auth/login',{username,password})
        if(user.status === 200){
          navigate('/protected')
        }
        console.log(user);
        

      }

  return (
    <div>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter username"/>
        <input type="password" value={password} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
        <a href="register">New Here ?</a>
        <button type="submit" onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login