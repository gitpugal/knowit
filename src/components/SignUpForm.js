import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Welcome from './Welcome';
const SignUpForm = () => {
    const [userForm, setUserForm] = useState({
        username : "",
        email: "",
        confirmemail: "",
        password: "",
        confirmpass: "",
        status: "",
        resume: ""
    })

    const navigate = useNavigate();

    function FormHandler(e){
        e.preventDefault();
        let alertText = "";
        if(!userForm.email || !userForm.confirmemail){
            alertText += "Please Enter a valid email \n";
        }
        if(userForm.email != userForm.confirmemail){
            alertText += "Your emails doesn't match \n";
        }
        if(userForm.password != userForm.confirmpass){
            alertText += "Your passwords doesn't match \n";
        }
        if(!userForm.username){
            alertText += "Please provide a username \n";
        }
        if(userForm.status.length <= 0){
            alertText += "Kindly select a status \n";
        }

        alertText.length > 0 && alert(alertText);

        if(alertText.length == 0){
            axios.get(`https://job-site-backend.vercel.app/${userForm.email}`)
            .then(res => {
                if(res.data == null){
                    axios.post("https://job-site-backend.vercel.app/signup", {
                username : userForm.username,
                email: userForm.email,
                password: userForm.password,
                estatus: userForm.status,
                resume: ""
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            alert("Registration successfull..")
            navigate("/welcome", {state: userForm})
            }else{
                alert("This email is already associated with an Account \nKindly login")
                navigate("/signin")
            }
        })
            .catch(err => console.log(err))
            

            
        }
    }
    

    function changeHanlder(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        setUserForm(prevState => ({...prevState, [name]: value, 
            status: document.getElementById("options").value,}));
    }



  return (
    <div className=' absolute flex flex-col items-center justify-center w-full h-fit bg-black text-white pb-10'>
        
        <h1 className='text-3xl font-extrabold font-sans my-20'>Sign Up into <span className='text-teal-300'>HIRED!</span></h1>
        <Link className='bg-gradient-to-r from-teal-400 to-sky-700 mt-8 mb-2
        text-left right-6 px-2 text-white rounded-lg py-1' to="/">Back</Link>
        <form onSubmit={FormHandler}> 
            <label htmlFor="">Email</label><br />
            <input type="email" className='bg-white bg-opacity-20 rounded-xl px-2 h-10  w-[100%]  mb-3' name="email" id="" value={userForm.email} onChange={changeHanlder} required/><br />
            <label htmlFor="">Confirm Email</label><br />
            <input type="email" className='bg-white bg-opacity-20 rounded-xl px-2 h-10  w-[100%] mb-3' name="confirmemail" id="" value={userForm.confirmemail} onChange={changeHanlder} required/><br />
            <label htmlFor="">Username</label><br />
            <input type="text" className='bg-white bg-opacity-20 rounded-xl px-2 h-10  w-[100%] mb-3' name="username" id="" value={userForm.username} onChange={changeHanlder} required/><br />
            <label htmlFor="">Password</label><br />
            <input type="password" className='bg-white bg-opacity-20 rounded-xl px-2  w-[100%] h-10 mb-3' name="password" id="" value={userForm.password} onChange={changeHanlder} required/><br />
            <label htmlFor="">Confirm Password</label><br />
            <input type="password" className='bg-white bg-opacity-20 rounded-xl px-2  w-[100%] h-10' name="confirmpass" id="" value={userForm.confirmpass} onChange={changeHanlder} required/><br />
            <label htmlFor="">Educational status</label><br />
            <select name="status" id="options" className='bg-white bg-opacity-20 rounded-xl px-2 h-10' onChange={changeHanlder} value={userForm.status} >
                <option value="student">student</option>
                <option value="working">working</option>
                <option value="selfemployed">selfemployed</option>
                <option value="other">other</option>
            </select><br />
            <input type="submit" name="" id=""  className='cursor-pointer bg-teal-400 p-2 rounded-lg mt-2'/>
        </form>
    </div>
  )
}

export default SignUpForm
