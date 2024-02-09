import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Alert from './Alert';

const Url = ({url}) => {
    console.log(url);
	const [error, setError] = useState({msg:""})
    const handleDelete = async() => {
		try {
			const instance = axios.create({
                withCredentials: true,
                baseURL: 'https://zipr-by-mohit.onrender.com',
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                credentials: 'include',
            })
            const data = await instance.post(
                '/url/delete', {
					shortId:url.shortId
				}
            )
			console.log(data);
			document.location.reload();
			setter({msg:"url deleted",type:"danger"})
		} catch (error) {
			
		}
	}
  return (
    <div className="card my-3" style={{width: "100%"}}>
        {error.msg && <Alert text={error.msg} type={error.type} setter={setError}/>}
        <div className="card-body">
            <h5 className="card-title">
                <img src="https://static.thenounproject.com/png/1014254-200.png" width={50} alt="" />
                <a href={url.redirectUrl}>

                  Original URL - {url.redirectUrl}
                </a>
            </h5>
            <p>Shrinked url - <a href={`https://zipr-by-mohit.onrender.com/${url.shortId}`} id='shortUrl'>{`zipr-by-mohit.onrender.com/` + url.shortId}</a></p>
            
            <Link to={`/analytics/${url.shortId}`} className="btn btn-sm btn-primary me-3 my-2">
              <span className='pb-2 mx-1'>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-data-fill mb-1" viewBox="0 0 16 16">
              <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"/>
            </svg>
              </span>
              Get Analytics
            </Link>
            <button onClick={()=>{
				
				
				navigator.clipboard.writeText(document.getElementById('shortUrl').innerText);
				setError({msg:"Copied to clipboard",type:"success"})
			}} className="btn btn-sm btn-dark me-3 my-2">
              <span className='pb-2 mx-1'>

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-fill mb-1" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2"/>
              </svg>
              </span>
              Copy to clipboard
            </button>
            <button onClick={handleDelete} className="btn btn-sm btn-danger my-2">
            <span className='mx-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash mb-1" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </span>
               Delete
            </button>
        </div>
    </div>
  )
}

export default Url