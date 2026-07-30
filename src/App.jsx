import { MdOutlineDarkMode } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import './App.css'
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/"; //checks if the use is on the homepage

  return (
    <div className='bg-primary min-h-screen'>
      <div className="justify-between flex p-4 items-center">
        <div className="flex flex-row gap-4 items-center">
          {!isHomePage &&( //if user is on the homepage then it skips this block
             <IoArrowBack  //if user is not on the homepage then the arrow appears allowing the user to go back
            onClick={() => navigate(-1)} //-1 is used so that the user goes back to the page he was originally from, helps when the app is big with various pages
            className="text-2xl border border-transparent rounded-full bg-secondary hover:bg-hoverColor cursor-pointer" 
            />
          )}
         <span className="font-semibold text-lg">Rest Countries</span>
        </div>
        <MdOutlineDarkMode className="text-2xl cursor-pointer" />
      </div>
      <div className="border border-gray-300"></div>
       <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/details/:uuid" element={<DetailsPage />}/>
      </Routes>
      
      
    </div>
  )
}

export default App
