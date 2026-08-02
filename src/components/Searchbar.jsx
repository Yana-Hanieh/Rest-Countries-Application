import { IoSearchSharp } from "react-icons/io5";

const regionStyles = {All: "bg-green-600 dark:bg-green-700 text-white", Asia: "bg-red-500 dark:bg-red-700 text-white",Africa:"bg-yellow-500 dark:bg-yellow-700 text-white", Americas:" bg-purple-500 dark:bg-purple-700 text-white", Europe: "bg-blue-500 dark:bg-blue-700 text-white", Oceania: "bg-cyan-500 dark:bg-cyan-700 text-white", Polar: "bg-blue-300 dark:bg-blue-500 text-white"}; //object that contains the regions as "keys" and their styles as "values"
const regions = Object.keys(regionStyles); //goes through the regionStyle object and gets the "keys" which are the regions and puts the keys as values for the region array

function Searchbar({searchInput, setSearchInput, onSearchSubmit, selectedRegion, setSelectedRegion, placeholder}) { //the searchbar function which takes the props from the homepage

  return (
    <div className='justify-items-center'>

        {/* Search Section */}
        <form onSubmit={onSearchSubmit} className="mt-4 border border-gray-200 dark:border-gray-700 rounded-full bg-secondary text-gray-500 dark:text-gray-200 px-2 py-4 w-full flex flex-row gap-3 items-center cursor-pointer">
            <IoSearchSharp className="text-xl ml-4" />
            <input
                type="text" 
                placeholder={ placeholder || "Country"} //placeholder first if user didnt enter any input, or the country name that the user searched
                value={searchInput} //displays the written text in the input state into the input box
                onChange={(e) => setSearchInput(e.target.value)} //runs when all pressed keys are appended into the text already in the input state
                className="w-full outline-none bg-transparent"
            />
        </form>
        
       {/* filter section */}
       <div className="flex flex-col gap-3 mt-2">
            <span className="text-gray-500 dark:text-gray-400">Filter by region:</span>
            <div className=" flex flex-wrap gap-3 justify-center">
                {regions.map((region) => ( //maps through the array that contains the region names
                    <button 
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-1 cursor-pointer
                            ${selectedRegion === region
                                ? `${regionStyles[region]} `
                                : `bg-gray-100 dark:bg-gray-500 text-gray-600 dark:text-gray-200`}`}
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