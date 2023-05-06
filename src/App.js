import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter ,
	Routes,
	Route,
	Link,
  useNavigate
} from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Welcome from './components/Welcome';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
     
    <div className=" h-full w-full bg-black text-white
      flex flex-col items-center justify-center  font-semibold absolute">
        <Routes>
        <Route path="/signin" exact Component={SignInForm}/>
        <Route path='/signup' exact Component={SignUpForm}/>
        <Route path='/welcome' exact Component={Welcome}/>

      </Routes>
      <h1 className='text-7xl font-extrabold text-teal-300 my-3' >
        Hired
      </h1>
      <p className='mb-3'>your career partner</p>
      <div className='flex flex-row gap-4 mt-5'>
        <Link  className='bg-teal-400 p-2 rounded-lg' to="/signup">
          SignUp
        </Link>
        <Link className='bg-teal-400 p-2 rounded-lg' to="/signin">
          SignIn
        </Link>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
