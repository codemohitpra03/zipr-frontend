import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from './Alert';
import Navbar from './Navbar';
import axios from 'axios';
import Url from './Url';
import completeUrl from '../utils';
import { ShimmerThumbnail } from "react-shimmer-effects";

const Profile = () => {
	const navigate = useNavigate()
  	const location = useLocation();
	
	const [authorized, setAuthorized] = useState("loading")
	const [error, setError] = useState({msg:""}) //url error
	const [user, setUser] = useState(null)
	const [url, setUrl] = useState(null)
	
	const [list, setList] = useState([])
	

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
							msg:"Please Log in"
						}
					})
					return
				}
				setAuthorized("done")
				console.log(response.data);
				setUser(response.data.user)


				
                const allUrls = await instance.post(
                    '/url/all', {
						url,userId:response.data.user.id
					}
                )
				console.log(allUrls.data);
				setList(allUrls.data)
			} catch (err) {
				console.log(err);
				
			}
		}
		fetchData()
	}, [])
	
	
	const handleGenerateUrl = async() => { 
		
		const modifiedUrl = completeUrl(url);
		console.log(modifiedUrl);
		
		
		try {
			const instance = axios.create({
                withCredentials: true,
                baseURL: 'https://zipr-by-mohit.onrender.com',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                credentials: 'include',
            })
            const data = await instance.post(
                '/url', {
					url:modifiedUrl
					,userId:user.id
				}
            )
			console.log(data);
			// if(data.staus === 200){
			// 	document.getElementById('close').click()
			// 	setList([...list,result.data])
			// }
			document.location.reload();
			
		} catch (error) {
			
		}

	}




  return authorized==="loading" ? <ShimmerThumbnail height={540} rounded /> : (
    <div>
		<Navbar logout={true} email={user.email}/>
		
		{/* {authorized === "done" && <Alert text={"Welcome " + user.email} type={"success"} />} */}
		{/* {error.msg && <Alert text={"Enter valid url"} type={"danger"} setter={setError} />} */}



		<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
			<div className="modal-header">
				<h1 className="modal-title fs-5" id="exampleModalLabel">Enter URL to shorten</h1>
				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
				<label className="form-label">Enter URL</label>
				<input type="url" onChange={(e)=>setUrl(e.target.value)} value={url} className="form-control" placeholder='www.codechef.com/profile/somebigname' aria-describedby="emailHelp"/>
			</div>
			<div className="modal-footer">
				<button id='close' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" onClick={handleGenerateUrl} className="btn btn-primary">Get my URL</button>
			</div>
			</div>
		</div>
		</div>

		<div className="container">
			{!list.length ? <center>
				<img src="https://horse-todo-codemohitpra2103.netlify.app/assets/empty-586de26b.png" alt="" />
				<h1>No urls to show</h1>
			</center> :list.toReversed().map((e)=><Url key={e.shortId} setter={setError} url={e}/>)}
		</div>
    </div>
  )
}

export default Profile