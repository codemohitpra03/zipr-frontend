import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Protected = () => {
    let navigate = useNavigate()
    useEffect(() => {
        async function fetchData(){
            try {
                
                const instance = axios.create({
                    withCredentials: true,
                    baseURL: 'https://zipr-by-mohit.onrender.com',
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    credentials: 'include',
                })
                const response = await instance.get(
                    '/auth/protected', 
                )
                
                console.log(response);
                
            } catch (error) {
                navigate('/login')
            }
        }
        fetchData()
    }, [])
    
    const handleLogout = async () => {
        try {
                
            const token = Cookies.get('username')
            console.log(token);
            axios.defaults.withCredentials = true;
            const response = await axios.get('https://zipr-by-mohit.onrender.com/auth/logout')
            console.log(response);
            navigate('/login')
        } catch (error) {
            console.log("Error in logging out", error);
        }
    }
  return (
    <div>
        Protected
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Protected