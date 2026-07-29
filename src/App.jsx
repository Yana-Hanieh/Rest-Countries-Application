import { MdOutlineDarkMode } from "react-icons/md";
import { Route, Routes, } from 'react-router-dom';
import './App.css'
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";


function App() {
  return (
    <div className='bg-primary min-h-screen'>
      <div className="justify-between flex p-4 items-center">
        <span className="font-semibold text-lg">Rest Countries</span>
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
