import React from 'react'
import { Link } from 'react-router-dom';

const Url = ({analytics}) => {
    console.log(analytics);
  return (
    <div class="card my-3" style={{width: "100%"}}>
        
        <div class="card-body">
            <p><b>Timestamp</b> - {analytics.timestamp}</p>
            <p><b>IP Address</b> - {analytics.ipAddress}</p>
        </div>
    </div>
  )
}

export default Url