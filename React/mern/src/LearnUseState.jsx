import React, { useState } from 'react'

const LearnUseState = () => {

    let [name,setName] =useState("ayush")
  return (
    <div>
        <p>name is {name}</p>
        <button onClick ={()=>{console.log("button is clicked")}}>click</button>
        <button onClick={()=>{
            setName("ram");
            console.log("name has been chnaged")
        }}>

        </button>
    </div>
  )
}

export default LearnUseState