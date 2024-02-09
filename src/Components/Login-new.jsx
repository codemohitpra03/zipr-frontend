import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from './Alert'
import axios from 'axios'
import { ShimmerThumbnail } from 'react-shimmer-effects'

const Login = () => {
	const [email, setEmail] = useState("")
    const [error, setError] = useState({msg:""})
    const [password, setPassword] = useState("")
	const [authorized, setAuthorized] = useState("loading")
	const [user, setUser] = useState(null)
    const navigate = useNavigate()
	const location = useLocation();
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
				setUser(response.data.user)
				
			} catch (err) {
				console.log(err);
			}
		}
		fetchData()
	}, [])
	const handleLogin = async(msg,type)=> {
		console.log("pm");
		if(!email || !password){
			setError({msg:"Empty Fields, Please fill all the fields",type:"danger"})
			console.log(error);
            return
    	}

		try {
			
			const instance = axios.create({
                withCredentials: true,
				
                baseURL: 'https://zipr-by-mohit.onrender.com',

                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                credentials: 'include',
            })
            const user = await instance.post(
                '/auth/login', {
					email,password
				}
            )
            
            // const user = await response.json();
			console.log(user);
            if(user.status === 400){
                setError({msg:user.message,type:"danger"})
                return
            }
            if(user.status === 401){
                setError({msg:user.message,type:"danger"})
                return
            }
            if(user.status === 404){
                setError({msg:user.message,type:"danger"})
                return
            }
            document.cookie = `referral_key=hello;max-age=604800;domain=localhost:5173`
            navigate("/profile",{
                state:{
                    msg,
					type
                }
            })	
		} catch (err) {
			
		}
	}
  return authorized === "loading" ? <ShimmerThumbnail height={540}/> : (
    <div>
        <Navbar login={true} register={false}/>
		{error.msg && <Alert text={error.msg} type={error.type} setter={setError}/>}
		{location.state && <Alert text={location.state.msg} type={location.state.type}/>}
        <section style={{height:"vh-100"}}>
          <div className="container-fluid h-custom" style={{padding:"5.3%"}}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image"/>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <h1>Login</h1>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                </div>

                
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                  <input type="password" id="form3Example4" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control form-control-lg" placeholder="Enter password" />
                </div>


                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary" onClick={()=>handleLogin("Login success","success")} style={{paddingLeft: "2.5rem", paddingRight:" 2.5rem"}}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/" className='link-danger'>Register</Link>
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

export default Login