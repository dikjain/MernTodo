import React, { useState, useContext } from 'react'
import axios from 'axios'
import { MyContext } from '../Context/Context.jsx'


function Login() {
  const [datas , setdata] = useState({email: '', password:''})
  const {setUserInfo  , navigate , setsignup  } = useContext(MyContext)


  const handleChange = ((event) => { 
    setdata({...datas, [event.target.name]: event.target.value })
  })
  const sendData = async (e) => {
    e.preventDefault()
    const {  email, password } = datas;
    console.log(email,password);
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data)
      if(data._id && data.email && data.name ){
        navigate("/function")
      }

    } catch (error) {
      console.log(error);
      
    }
  };


  return (
    <div className='w-[90%] h-[90%] my-[20px] bg-[violet] rounded-xl p-2 flex flex-col items-center justify-around'>
    <h1 className='text-white text-3xl font-bold font-sans'>Login</h1>
    <form onSubmit={sendData} className='w-full flex flex-col items-center'>
      <input name='email' onChange={handleChange} type='text' placeholder='Email' className='border-2 my-[3px] bg-black border-gray-200 p-2 w-full rounded-xl' />
      <input name='password' onChange={handleChange} type='password' placeholder='Password' className='border-2 my-[3px] bg-black border-gray-200 p-2 w-full rounded-xl mt-2' />
      <button type='submit' className='bg-blue-500 my-[8px] text-white p-2 rounded-xl w-full'>Login</button>
    </form>
    <p className='text-white text-sm mt-2'>Don't have an account ? <a onClick={() => setsignup("signup")} className='text-blue-500 cursor-pointer'>Sign Up</a></p>
  </div>
  )
}

export default Login