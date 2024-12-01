import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
const [currentState,setCurrentSet]=useState('login');

const {token,setToken,navigate,backendUrl} = useContext(ShopContext);

const [name,setName]=useState("")
const [password,setPassword]=useState("")
const [email,setEmail]=useState("")


const onSubmitHandler=async(event)=>{
  event.preventDefault();
  try {
    if(currentState == 'sign up'){
      const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
    }
    else{

        //login api
        const response = await axios.post(backendUrl + '/api/user/login',{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(()=>{
  if(token){
    navigate('/')
  }
},[token])


  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState=='login'?'':<input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' className='w-full px-3 py-2 border border-gray-500' required/>}
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' className='w-full px-3 py-2 border border-gray-500' required />
      <input type="Password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' className='w-full px-3 py-2 border border-gray-500' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password</p>
        {
          currentState=='login'
          ? <p onClick={()=>setCurrentSet('Sign up')} className='cursor-pointer' >Create Account</p>
          : <p onClick={()=>setCurrentSet('login')} className='cursor-pointer' >Login here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'> {currentState=='login' ? 'Sign In ': 'Sign up'}</button>
    
    </form>
  )
}

export default Login