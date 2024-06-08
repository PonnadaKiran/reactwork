import React from 'react'
import {useState,useEffect} from "react";

const User = ({name,location}) => {
  const [count,setCount] = useState(0);
  console.log("functional component is called")
  useEffect(()=>{
    console.log("functional useEffect is called")
  },[])
  return (
    <div className="user-card">
        <h1>{count}</h1>
        <button onClick={()=>{
          setCount(count+1)
        }}>Click-Increase</button>
        <h2>Name : {name}</h2>
        <h3>Location : {location}</h3>
        <h4>Contact : @kiranNov28</h4>
    </div>
  )
}

export default User