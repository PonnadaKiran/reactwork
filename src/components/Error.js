import React from 'react'
import { useRouteError } from 'react-router-dom';
//this is the hook that anything starts with use, we can say it as hook

const Error = () => {
    const err=useRouteError();
    console.log(err);
  return (
    <div>
        <h1>oops! something went wrong</h1>
        <h2>{err.status} : {err.statusText}</h2>
    </div>
  )
}

export default Error