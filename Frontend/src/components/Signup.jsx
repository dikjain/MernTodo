import React, { useState , useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../Context/Context'

function Signup() {
  const [datas , setdata] = useState({email: '', password:'',name:' '})
  const {setUserInfo , navigate , setsignup } = useContext(MyContext)

  const handleChange = ((event) => { 
    setdata({...datas, [event.target.name]: event.target.value })
  })
  const sendData = async (e) => {
    e.preventDefault()
    const { name, email, password } = datas;
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(name,email,password);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data)
      if(data.name && data.email && data._id){
        navigate("/function")
      }
    } catch (error) {
      
    }
  };


  return (
    <div className='w-[90%] h-[90%] my-[20px] bg-[violet] rounded-xl p-2 flex flex-col items-center justify-around'>
      <h1 className='text-white text-3xl font-bold font-sans'>Sign Up</h1>
      <form onSubmit={sendData}>
        <input type='text' name='name' onChange={handleChange} placeholder='Name' className='bg-black border-2 my-[3px] border-[pink] p-2 w-full rounded-xl' />
        <input type='text' name='email' onChange={handleChange} placeholder='Email' className='bg-black border-2 my-[3px] border-[pink] p-2 w-full rounded-xl mt-2' />
        <input type='password' name='password' onChange={handleChange} placeholder='Password' className='bg-black border-2 my-[3px] border-[pink] p-2 w-full rounded-xl mt-2' />
        <button type='submit' className='bg-blue-500 my-[8px] text-white p-2 rounded-xl w-full'>Sign Up</button>
      </form>
      <p className='text-white text-sm mt-2'>Already have an account? <a onClick={() => setsignup("login")} className='cursor-pointer text-blue-500'>Login</a></p>
    </div>
  )
}

export default Signup