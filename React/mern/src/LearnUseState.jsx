import React, { useState } from 'react'

const LearnUseState = () => {

    let [name,setName] =useState("ayush")
    let [count,setCount]=useState(1);
  return (
    <div>
        <p>name is {name}</p>
        <button onClick ={()=>{console.log("button is clicked")}}>click</button>
        <button onClick={()=>{
            setName("ram");
            console.log("name has been chnaged")
        }}>

        </button>
        <button onClick ={()=>{setCount(count+1)}}>+</button>
        <button onClick ={()=>{setCount(count-1)}}>-</button>
        <p>the count is{count}</p>
    </div>
  )
}

export default LearnUseState