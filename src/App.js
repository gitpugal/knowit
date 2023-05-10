import logo from './logo.svg';
import './App.css';
import {
	BrowserRouter ,
	Routes,
	Route,
	Link,
  useNavigate
} from 'react-router-dom';
import IndividualCard from './components/IndividualCard';
import Welcome from './components/Welcome';
import axios from 'axios';
import news from './news.png';
import arrow from './arrow.png'

function App() {
  return (
    <BrowserRouter>
     
    <div className="w-full bg-[#181920] text-white
      flex flex-col items-center justify-center  font-semibold absolute h-screen">
        <div className="w-full bg-[#181920] text-white
      flex flex-col items-center justify-center  font-semibold relative h-screen">
        <header className='absolute top-0 bg-teal-300 w-full h-14 flex items-center flex-row' >
          <p className='text-xl font-bold px-5 text-black'> Know <span className='text-white'>it.</span></p>
          <img height="10px" width="30px" src={news}></img>
        </header>
        <Routes>
        <Route path="/individualCard" exact Component={IndividualCard}/>
        <Route path='/welcome' exact Component={Welcome}/>

      </Routes>
      
      <h1 className='text-8xl text-center font-extrabold text-white mt-3  mx-20' >
        Know <span className='text-teal-300'>it.</span>
      </h1>
        <Link className='bg-gradient-to-r from-teal-400 to-sky-700 p-2 rounded-md mt-10' to="/welcome">Start now.</Link>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
