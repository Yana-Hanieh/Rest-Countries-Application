import { IoSearchSharp } from "react-icons/io5";

const regionStyles = {All: "bg-green-600 text-white", Asia: "bg-red-500 text-white",Africa:"bg-yellow-500 text-white", America:" bg-purple-500 text-white", Europe: "bg-blue-500 text-white", Oceania: "bg-cyan-500 text-white", Polar: "bg-blue-300 text-white"}; //object that contains the regions as "keys" and their styles as "values"
const regions = Object.keys(regionStyles); //goes through the regionStyle object and gets the "keys" which are the regions and puts the keys as values for the region array

function Searchbar({searchInput, setSearchInput, selectedRegion, setSelectedRegion, placeholder}) { //the searchbar function which takes the props from the homepage

  return (
    <div className='justify-items-center'>
     
        {/* Search Setion */}
        <form className="mt-4 border border-gray-200 rounded-full bg-secondary text-gray-500 px-2 py-4 w-full flex flex-row gap-3 items-center cursor-pointer">
            <IoSearchSharp className="text-xl ml-4" />
            <input
                type="text" 
                placeholder={ placeholder || "Country"} //placeholder first if user didnt enter any input, or the country name that the user searched
                value={searchInput} //displays the written text in the input state into the input box
                onChange={(e) => setSearchInput(e.target.value)} //runs when all pressed keys are appended into the text already in the input state
                className="w-full outline-none"
            />
        </form>
        
       {/* filter section */}
       <div className="flex flex-col gap-3 mt-2">
            <span className="text-gray-500">Filter by region:</span>
            <div className=" flex flex-wrap gap-3 justify-center">
                {regions.map((region) => ( //maps through the array that contains the region names
                    <button 
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={` ring-1 border border-gray-300 rounded-lg px-4 py-1 cursor-pointer
                            ${selectedRegion === region
                                ? `${regionStyles[region]} `
                                : `bg-gray-200 text-gray-600`}`}
                    > 
                        {region}    
                    </button>
                ))}
            </div>
        </div>

    </div>
  )
}

export default Searchbar