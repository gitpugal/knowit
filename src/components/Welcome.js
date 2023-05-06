import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import eye from "../eye.png" ;
import jobData from '../constants';
const Welcome = () => {
    const location = useLocation();
    const [cuurentUser, setCurrentUser] = useState({});
    const [isInProfile, setIsInProfile] = useState(false);
  const [isUploading,  setIsUploading] = useState(false);
  const [response, setResponse] = useState({});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
    useEffect(() => {
        axios.get(`http://localhost:5000/${location.state?.email}`)
            .then(res => setCurrentUser(res.data))
            .catch(err => console.log(err))
    }, [])


    
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
          axios.post("http://localhost:5000/signup", {
              username : userForm.username,
              email: userForm.email,
              password: userForm.password,
              estatus: userForm.status,
              resume: ""
          })
          .then(res => console.log(res))
          .catch(err => console.log(err))
          alert("Registration successfull..")
          // return <Welcome user={userForm}/>
          // (err => console.log(err))
          navigate("/welcome", {state: userForm})

          
      }
  }
  

  function changeHanlder(e){
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;

      setUserForm(prevState => ({...prevState, [name]: value, 
          status: document.getElementById("options").value,}));
  }

  async function processFile(e){
    setIsUploading(true);
    let ress = {};
      e.preventDefault();
      var file = e.target.files[0];
  
      // Set your cloud name and unsigned upload preset here:
      var YOUR_CLOUD_NAME = "dpgzkxcud";
      var YOUR_UNSIGNED_UPLOAD_PRESET = "sys3hurw";
  
      var POST_URL =
        "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";
  
      var XUniqueUploadId = +new Date();
  
      processFile();
  
      function processFile(e) {
          // e.preventDefault();
        var size = file.size;
        var sliceSize = 20000000;
        var start = 0;
  
        setTimeout(loop, 3);
  
        function loop() {
          var end = start + sliceSize;
  
          if (end > size) {
            end = size;
          }
          var s = slice(file, start, end);
          send(s, start, end - 1, size);
          if (end < size) {
            start += sliceSize;
            setTimeout(loop, 3);
          }
        }
      }
  
      function send(piece, start, end, size) {
        console.log("start ", start);
        console.log("end", end);
  
        var formdata = new FormData();
        console.log(XUniqueUploadId);
  
        formdata.append("file", piece);
        formdata.append("cloud_name", YOUR_CLOUD_NAME);
        formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
        formdata.append("public_id", e.target.files[0].name);
  
        var xhr = new XMLHttpRequest();
        xhr.open("POST", POST_URL, false);
        xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
        xhr.setRequestHeader(
          "Content-Range",
          "bytes " + start + "-" + end + "/" + size
        );

        

        xhr.onload = function (e) {
          e.preventDefault();
           ress = JSON.parse(this.responseText); 
          setResponse(JSON.parse(this.responseText))
            // .then(console.log(response))  
            // .catch(err => console.log(err)) 
          // console.log(response);

        };
  
        xhr.send(formdata);
        console.log(ress)
        setResponse(ress);
        setIsUploading(false);
        // console.log(response);
      }
  
      function slice(file, start, end) {
        var slice = file.mozSlice
          ? file.mozSlice
          : file.webkitSlice
          ? file.webkitSlice
          : file.slice
          ? file.slice
          : noop;
  
        return slice.bind(file)(start, end);
      }
  
      function noop() {}
      // console.log(ress)
    };

    function uploadResume(e){
      e.preventDefault();

      axios.put(`http://localhost:5000/${cuurentUser.email}`, {
              resume: response.url,
          })
          .then(res => setCurrentUser(res.data))
          .catch(err => console.log(err))
      alert("Your resume updated!");
      document.getElementById("form").value = "";
    }

    function searchChangeHanlder(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

  return (
    <div className=' w-full h-full overflow-y-scroll scrollbar-hide absolute bg-black text-white'>
        {
          !isInProfile ? 
          <div className='flex flex-col gap-8'>
        <div className='flex flex-col items-center mt-3 '>
        <h1 className='absolute  bg-gradient-to-tr from-teal-400 to-violet-600 w-[95%] py-2 px-3  rounded-md '>
        Welcome <span className='text-xl font-bold text-gradient'>{cuurentUser.username},</span>
        </h1>
        <button className='bg-gradient-to-r from-teal-400 to-sky-700 absolute
        top-20 text-left right-8 px-2 text-white rounded-lg py-1' onClick={() => {
          setIsInProfile(prevState => !prevState)
        }
        }>Upload resume</button>
        <button className='bg-red-500 absolute
        top-[130px] text-left right-8 px-2 text-white rounded-lg py-1' onClick={() => {
          setCurrentUser({});
          navigate("/signin")
        }
        }>Logout</button>
        </div>
        <div className='absolute top-[200px] flex flex-row gap-3 justify-center w-[95%]'>
          <input type="search" value={search} onChange={searchChangeHanlder} className='bg-white bg-opacity-20 rounded-xl w-[70%] md:w-[50%] left-2 px-3 '/>
          <button className='bg-gradient-to-r
             bottom-5 right-5 from-teal-400 to-sky-700 p-2 rounded-md' onClick={(e) => {
              e.preventDefault();
              jobData.map(job => {
                if(job.name.match(search)?.length > 0){
                  setSearchResults(prevResult => ([...prevResult, job]))
                }
              })
              console.log(searchResults)
}}>search</button>
        </div>
        

        <div className='mt-[240px] mx-auto w-full flex flex-col items-center'>
          {jobData.map(job => <div 
          className='bg-white bg-opacity-25 py-20 px-10 rounded-2xl my-10 w-[90%] md:w-[70%] relative' key={job.name+""+Math.random()}>

            <p className='absolute top-12'>{job.name}</p>
            <p className="text-gray-400">{job.company} Company</p>
            <p className='absolute right-8 top-12 text-gray-400'>{job.stipend}</p>
            <p className="text-gray-400">{job.mode}</p>
            <p className="text-gray-400">{job.duration}</p>
            <button className='bg-gradient-to-r
            absolute bottom-5 right-5 from-teal-400 to-sky-700 p-2 rounded-md'>View details</button>
          </div>
          )
          }
        </div>
        </div>

        :
         <div className='flex flex-col items-center  bg-black'>
          <button className='bg-gradient-to-r from-teal-400 to-sky-700 mt-8 mb-2
        top-20 text-left right-6 px-2 text-white rounded-lg py-1' onClick={() => {
          setIsInProfile(prevState => !prevState)
        }
        }>Back</button>
           <div className='flex flex-col items-center mt-3 '>
        <h1 className='   bg-gradient-to-r from-teal-300 to-yellow-400 w-[95%] py-2 px-3  rounded-md bg-opacity-80'>
        Welcome to your profile   <span className='text-xl font-bold text-gradient'>{cuurentUser.username},</span>
        </h1>
        </div>
        <div className='mt-8  text-white px-16 py-10   p-2 mb-4 w-full '>
        <form onSubmit={FormHandler} className='w-full'>
            <label htmlFor="">Email</label><br />
            <input className="p-2 mb-4 rounded-xl mt-1 bg-white bg-opacity-20 w-full" type="email" name="email" id="" 
            value={cuurentUser.email} onChange={changeHanlder} disabled/><br />
            <label htmlFor="">Username</label><br />
            <input className="p-2 mb-4 rounded-xl mt-1 bg-white bg-opacity-20 w-full" 
            type="text" name="username" id="" value={cuurentUser.username} onChange={changeHanlder} disabled/><br />
            <label htmlFor="">Educational status</label><br />
            <select name="status" id="options" onChange={changeHanlder} value={userForm.status} 
            className="p-2 mb-4 rounded-xl mt-1 bg-white bg-opacity-20">
                <option value="student" className='text-black'>student</option>
                <option value="working" className='text-black'>working</option>
                <option value="selfemployed" className='text-black'>selfemployed</option>
                <option value="other" className='text-black'>other</option>
            </select><br />
            <label htmlFor="">Resume</label><br />
            {cuurentUser.resume.length > 0 && 
            <a  href={cuurentUser.resume} className='cursor-pointer'>
            <div className='my-8 flex flex-row items-center justify-between border-emerald-50 px-2 py-1 border-2 rounded-xl'>
            <p>see your resume</p>
            <img src={eye} alt="" className='h-5 w-5'/>
            </div>
            </a>
            }
            <input type="file" id="form" className='bg-white bg-opacity-20 w-full p-2 rounded-xs' onChange={processFile} />
            <button className='bg-teal-400 p-3 rounded-xl m-2' onClick={uploadResume}>Upload resume</button>
            <p className='my-10'>{isUploading && "uploading your resume.... "}</p>
            <input type="submit" name="" id=""  className='bg-teal-400 p-2 rounded-lg mt-2'/>
        </form>
    </div>
         </div>
        }
    </div>
  )
}

export default Welcome