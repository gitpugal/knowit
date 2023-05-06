import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  })

  function changeHanlder(e){
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setUserForm(prevState => ({...prevState, [name]: value}));
}

function signInHandler(e){
  e.preventDefault();
  axios.get(`https://job-site-backend.vercel.app/${userForm.email}`)
            .then(res => {
              if(res.data == null){
                alert("Sorry you don't have account in HIRED\n Kindly Signup");
                navigate("/signup")
              }else{
                
                if (res?.data?.password == userForm.password){
                  navigate("/welcome", {state: res.data})
                }else{
                  alert("password wrong!");
                }
              }
            })
            .catch(err => console.log(err))
}


  return (
    <div className=' absolute flex flex-col items-center justify-center w-full h-full bg-black text-white'>
      <h1 className='text-3xl font-extrabold font-sans my-20'>Login into <span className='text-teal-300'>HIRED!</span></h1>
      <Link className='bg-gradient-to-r from-teal-400 to-sky-700 mt-8 mb-2
        text-left right-6 px-2 text-white rounded-lg py-1' to="/">Back</Link>
        <form onSubmit={signInHandler}>
            <label htmlFor="">Email</label><br />
            <input type="email"  className='bg-white bg-opacity-20 rounded-xl px-2 h-10' name="email" id="" value={userForm.email} onChange={changeHanlder}/><br />
            <label htmlFor="">Password</label><br />
            <input type="text" className='bg-white bg-opacity-20 rounded-xl px-2 h-10' name="password" id="" value={userForm.password} onChange={changeHanlder}/><br />
            <input type="submit" name="" id="" className='bg-teal-600 p-2 rounded-lg mt-4 cursor-pointer' value="login"/><br />
            <Link to="/signup" className="underline text-xs top-2">Don't have an account signUp?</Link>
        </form>
    </div>
  )
}

export default SignInForm
