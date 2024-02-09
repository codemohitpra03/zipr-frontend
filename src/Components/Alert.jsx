import React from 'react'

const Alert = ({text,type,setter}) => {
  return (
    <div className={`alert alert-${!type ? "warning" : type} alert-dismissible fade show`} role="alert">
        <strong>{type !== "success" && "Error -" } {text}</strong>
        <button type="button" className="btn-close" onClick={()=>{
			if(text.split(' ')[0] === "Empty" || text.split(' ')[0] === "Invalid" || type==="danger"){
				setter({msg:""})
			}else{

			}
        }} data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert