import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar';
import axios from 'axios';
import Details from './Details';
import { ShimmerThumbnail } from 'react-shimmer-effects';

const Analytics = () => {
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()
  	const location = useLocation();
	console.log(location);
	const [authorized, setAuthorized] = useState("loading")
	
	const [user, setUser] = useState(null)
	
    const [analytics, setAnalytics] = useState({})
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
                
                console.log(response.data);
				if(response.data.status === 403){
					navigate('/login',{
						state:{
							msg:"Please Log in",
                            type:"danger"
						}
					})
					return
				}
				setAuthorized("done")
				console.log(response.data);
				setUser(response.data.user)


				
                const result = await instance.get(
                    `/url/analytics/${id}`
                )
				console.log(result.data);
				setAnalytics(result.data)
			} catch (err) {
				console.log(err);
				
			}
		}
		fetchData()
	}, [])
  return  authorized==="loading" ? <ShimmerThumbnail height={540}/> :(
    <div>
        <Navbar logout={true} email={user.email}/>
        
        <div className='container'>
            {analytics.totalClicks === undefined ?<ShimmerThumbnail height={50} width={400}/>:<h1>Total Clicks - {analytics.totalClicks} {analytics.totalClicks === 0 && <p>No analytics</p>}</h1>}
            {analytics.totalClicks === undefined ?<h2>No Analytics</h2>:analytics.analytics.map((e)=>{
                console.log(e);
                return <Details analytics={e} />
            })}
        </div>
    </div>
  )
}

export default Analytics