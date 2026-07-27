import { MdOutlineDarkMode } from "react-icons/md";
import './App.css'
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className='bg-primary'>
      <div className="justify-between flex p-4 items-center">
        <span className="font-semibold text-lg">Rest Countries</span>
        <MdOutlineDarkMode className="text-2xl cursor-pointer" />
      </div>
      <div className="border border-gray-300"></div>
      <Homepage />
    </div>
  )
}

export default App
