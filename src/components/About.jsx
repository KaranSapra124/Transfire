import React, { useEffect, useState } from 'react'
import { getCookie } from "./constants/Cookie"
const About = () => {
  const UserEmail = getCookie("UserEmail")
  console.log(UserEmail);
  const [DicArr, setDicArr] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/About", {
      method: 'POST',
      body: JSON.stringify({
        emailId: UserEmail
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((response)=>{
      alert("Found Your Account!!!")
     return response.json()
    })
    .then((result)=>{
     return setDicArr({...result.message})
    })
  }, [])


  return (
    <div className='border-2 bg-[#F5F5F5] w-fit m-auto p-5 mt-5 shadow-lg text-2xl font-bold rounded-xl'>
      <div className='p-2'>Hello , <span className="font-extrabold text-[#D83F31]">{DicArr.Name}</span> </div>
      <div className='p-2'>Your Email , <span className="font-extrabold text-[#D83F31]">{UserEmail}</span></div>
      <div className='bg-gray-200 rounded-xl shadow-2xl m-4'>
        <h4>Your Saved Words:-</h4>
       <div className='text-[#D83F31] '>
       {DicArr?.UserDic ?   DicArr?.UserDic?.map((elem)=>{
          return <h1 className='font-extrabold p-2'>👉 {elem}</h1>
        }) : <h1>Loading...</h1>}
       </div>
      </div>
    </div>
  )
}

export default About;
