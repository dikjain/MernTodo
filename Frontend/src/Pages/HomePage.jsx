import React, { useState, useEffect , useContext } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { MyContext } from '../Context/Context'


function HomePage() {
  const {signup, setsignup, userInfo, setUserInfo, navigate} = useContext(MyContext)

  useEffect(() => {
    const user = localStorage.getItem("userInfo")
    if(user){
       setUserInfo(JSON.parse(user))
        navigate("/function")
    }
}, [userInfo, navigate])

  useEffect(() => {
    if (!signup) {
      setsignup("signup");
    }
  }, [signup, setsignup]);

  return (
    <div className='homepage w-screen h-screen flex-col bg-[#020202] text-white flex items-center justify-center'>
      <div id="mockup" className='w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] flex items-center border-2 border-[violet] justify-center flex-col py-5 rounded-xl h-[80%] md:h-[70%] lg:h-[60%] xl:h-[60%]'>
        <div id="btns" className='w-full flex items-center justify-around mt-[20px]'>
        <button onClick={() => setsignup("signup")} className={`w-[40%] md:w-[30%] lg:w-[25%] h-[40px] ${signup === "signup" ? "bg-[violet]": "bg-[#212529]" } text-white rounded-xl hover:bg-[violet]`}>Signup</button>
        <button onClick={() => setsignup("login")} className={`w-[40%] md:w-[30%] lg:w-[25%] h-[40px] ${signup === "login" ? "bg-[violet]" : "bg-[#212529]"} text-white rounded-xl hover:bg-[violet]`}>Login</button>
        </div>
      {signup && signup == "signup" ? <Signup />: <Login/>}

      </div>
    </div>
  )
}

export default HomePage