import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";




function Searchbar(onSearch, placeholder) {

    const [input, setInput]= useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const handleSubmit = (e) => {
        e.preventDefault(); //on form submit the browser automatically reloads, so we use this to stops the browser from reloading
    if (input.trim() === "") //trim() removes all whitespaces, if the result is an empty string only the input is ignored => doesnt invoke any data fetching
        return;
    onSearch(input);
    setInput("");
    };


  return (
    <div className='justify-items-center'>
     
        {/* Search Setion */}
        <div className="mt-4 border border-gray-200 rounded-full bg-gray-100 text-gray-500 px-2 py-4 w-full sm:w-6/3 flex flex-row gap-3 items-center cursor-pointer">
            <IoSearchSharp className="text-xl ml-4" />
            <input
                type="text" 
                placeholder={"Search by country name or region"|| "City"} //placeholder first then city
                value={input} //displays the written text in the input state into the input box
                onChange={(e) => setInput(e.target.value)} //runs when all pressed keys are appended into the text already in the input state
                className="w-full"
            />
        </div>
        
       {/* filter section */}
       <div className="flex flex-row gap-4 text-white mt-4">
            {/* <span className="text-gray-500">Filter by region:</span>
            <span className="border rounded-lg bg-green-800 px-4">All</span>
            <span className="border rounded-lg bg-red-500">Asia</span>
            <span className="border rounded-lg bg-yellow-500">Africa</span>
            <span className="border rounded-lg bg-purple-500">America</span>
            <span className="border rounded-lg bg-blue-500">Europe</span>
            <span className="border rounded-lg bg-cyan-500">Oceania</span>
            <span className="border rounded-lg bg-green-600">Polar</span> */}
       {["All","Asia","Africa"].map((type) => (
            <button 
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`border rounded-lg text-white px-4 py-1 
                    ${selectedFilter === type
                        ? `bg-gray-300`
                        : `text-black`}`}
            >
            </button>
       ))}
  
     </div>
        
    </div>
  )
}

export default Searchbar