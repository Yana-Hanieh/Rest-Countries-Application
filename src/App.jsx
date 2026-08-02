import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import './App.css'
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/"; //checks if the use is on the homepage
  const [theme, setTheme] = useState (localStorage.getItem("theme") || "light"); //uses the local storage to get the user's previous theme choice or sets it as the defaul light theme
  
  useEffect(() => {
    const root = document.documentElement; //the core html tag that contains everything
    if (theme === "dark"){ 
      root.classList.add("dark"); //add the dark theme in the root when in use
    } else {
      root.classList.remove("dark"); //remove the dark theme in the root 
    }
    localStorage.setItem("theme",theme);
  }, [theme]); //everytime the theme changes, the useEffect reruns

  const toggleTheme = () => { //this is the toggle button variable which is activated when user presses on it
    setTheme((prev) => (prev === "light" ? "dark" : "light" )); //if its originally on light mode, then the toggle will change it to dark, and vice versa
  };

  return (
    <div className='bg-primary min-h-screen'>
      <div className="justify-between flex p-4 items-center">
        <div className="flex flex-row gap-4 items-center">
          {!isHomePage &&( //if user is on the homepage then it skips this block
             <IoArrowBack  //if user is not on the homepage then the arrow appears allowing the user to go back
            onClick={() => navigate(`/`)} //when user clicks on the arrow he goes back to the homepage if (-1) was used, the user goes back to the page he was originally from, helps when the app is big with various pages
            className="text-2xl dark:text-gray-200 border border-transparent rounded-full bg-secondary hover:bg-hoverColor cursor-pointer" 
            />
          )}
         <span className="font-semibold text-lg dark:text-gray-200">Rest Countries</span>
        </div>

          { theme === "dark"? (
            <MdOutlineLightMode onClick={toggleTheme} className="text-2xl cursor-pointer text-gray-200" />
          ) : (
            <MdOutlineDarkMode onClick={toggleTheme} className="text-2xl cursor-pointer" />
          )}

      </div>
      <div className="border border-gray-300 dark:border-gray-300"></div>
       <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/details/:uuid" element={<DetailsPage />}/>
      </Routes>
      
      
    </div>
  )
}

export default App
