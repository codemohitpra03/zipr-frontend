import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Alert from './Alert'
import axios from 'axios'
import { ShimmerThumbnail } from 'react-shimmer-effects'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState({msg:""})
    const [password, setPassword] = useState("")
    const [authorized, setAuthorized] = useState("loading")
    const navigate = useNavigate()

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
				if(response.data.status !== 403){
					navigate('/profile',{
						state:{
							msg:"Already logged in"
						}
					})
					return
				}
				setAuthorized("done")
				
				
			} catch (err) {
				console.log(err);
			}
		}
		fetchData()
	}, [])

    const handleLogin = async(msg)=> {
		console.log("pm");
		

		try {
			const response = await fetch('https://zipr-by-mohit.onrender.com/auth/login',{
     
                // Adding method type
                method: "POST",
                
                // Adding body or contents to send
                body: JSON.stringify({
                    email:email,
                    password
                }),
                credentials:"include",
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
					"Accept":"*/*",
                }
            })
            
            const user = await response.json();
			console.log(user);
            if(user.status === 401){
                setError({msg:user.message,type:"danger"})
                return
            }
            if(user.status === 404){
                setError({msg:user.message,type:"danger"})
                return
            }
            
            navigate("/profile",{
                state:{
                    msg
                }
            })	
		} catch (err) {
			
		}
	}
    const handleSignup = async()=> {
        if(!email || !password){
			setError({msg:"Empty Fields, Please fill all the fields",type:"danger"})
			console.log(error);
            return
    	}
        try {
            const response = await fetch('https://zipr-by-mohit.onrender.com/auth/register',{
     
                // Adding method type
                method: "POST",
                
                // Adding body or contents to send
                body: JSON.stringify({
                    email,
                    password
                }),
                
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            
            const user = await response.json();
            if(user.status === 400){
                setError({msg:user.message,type:"danger"})
                return
            }
            
            console.log(user);
            // navigate("/profile",{
            //     state:{
            //         msg:"Signup success",
            //     }
            // })
            handleLogin("Account created successfully")
            
        } catch (error) {
            
            // console.log(error);
        }
    }


  return authorized === "loading" ? <ShimmerThumbnail height={540}/> :(
    <div>
        <Navbar register={true}/>
        
        {error.msg && <Alert text={error.msg} type={error.type} setter={setError}/>}
        
        <section style={{height:"vh-100"}}>
            <div className="container-fluid h-custom" style={{padding:"5.3%"}}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <center>
                            <h3 className='text-info-emphasis'>URL SHORTNER zipr-by-mohit</h3>
                        </center>
                        <img src="https://media.sproutsocial.com/uploads/2022/04/2204_URL-Shorteners.jpg" className="img-fluid" alt="Sample image"/>
                        {/* <p className='fst-italic'>"Effortlessly shorten URLs to save space and share easily. Streamline links for social media, marketing campaigns, and messaging."</p> */}
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <h1>Signup</h1>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input type="email" id="form3Example3" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control form-control-lg" placeholder="Enter a valid email address" />
                            </div>

            
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                            </div>


                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary " onClick={handleSignup} style={{paddingLeft: "2.5rem", paddingRight:" 2.5rem"}}>Signup</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/login" className='link-danger'>Login</Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
    
        </section>
    </div>
  )
}

export default Signup