import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const Navbar = ({login,register,logout,email}) => {
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location.pathname);
    const handleLogout = async(event)=>{
        event.preventDefault()
        try {
            const instance = axios.create({
                withCredentials: true,
                baseURL: 'https://zipr-by-mohit.onrender.com',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                credentials: 'include',
            })
            const response = await instance.get(
                '/auth/logout', 
            )
            console.log(response);
            navigate('/login',{
                state:{
                    msg:"Successfully logged out",
                    type:"success"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" href="/signup">URL Shortner</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">
                <a className="nav-link" href="https://www.linkedin.com/in/mohitkanojia2103/">About - Mohit Kanojia</a>
                </li>
                
                {/* <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>
            {/* <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            <form className="d-flex" role="search">
  
                {(logout && !location.pathname.includes('/analytics')) && <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <b>

                        Add url
                    </b>
                </button>}
                {register && <button type="button" className="btn mx-2 btn-success" onClick={()=>navigate('/login')}>Login</button>}
                {login && <button onClick={()=>navigate('/')} className="btn btn-success mx-2">Signup</button>}
                {logout && <label className='form-label my-2 mx-3'>Hello - <b>{email} </b></label>}
                {logout && <button className="btn btn-danger" onClick={handleLogout}>Logout</button>}
            </form>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar