import { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";

const hardcodedCountries = [
  { name: "Turkey", region: "Asia", population: 84339067, flag: "🇹🇷" },
  { name: "Turkey", region: "Asia", population: 84339067, flag: "🇹🇷" },
  { name: "Turkey", region: "Asia", population: 84339067, flag: "🇹🇷" },
  { name: "Turkey", region: "Asia", population: 84339067, flag: "🇹🇷" },
];


const handleSearch = async (countryName) => {
  if (countryName.trim() === "")
    return;
}

function Homepage() {

  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredCountries = hardcodedCountries.filter((countryName) =>{
    const matchesRegion = selectedRegion === "All" || countryName.region === selectedRegion;
    const matchesInput = countryName.name.toLowerCase().includes(searchInput.toLocaleLowerCase());
    return matchesRegion && matchesInput;
  });

  return (
    <div className='justify-items-center p-8'>
      <div className="sm:text-2xl text-xl font-medium text-center">Get information about the countries.</div>
        <Searchbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          placeholder = {"Search by country name or region"}
      />

      <p className="text-sm text-gray-500 mt-4"> 
        Found {filteredCountries.length} countries.
      </p>


      <div className="w-full sm:w-1/2">
        {hardcodedCountries.map((country) => (
          <div className="bg-gray-100 flex flex-row gap-3 sm:gap-0 justify-between p-8 mt-3 rounded-xl items-center">
        <div className="text-xl">Flag </div>
        <div className="text-xl font-bold">Turkey</div>

        <div className="flex flex-col">
          <div className="text-gray-500 text-xs">Region</div>
          <div className="font-semibold text-md">Asia</div>
        </div>

        <div className="flex flex-col">
          <div className="text-gray-500 text-xs">popiulation</div>
          <div className="font-semibold">5465218</div>
        </div>
        
        <div className="flex flex-col">
          <div className="text-gray-500 text-xs">Area km</div>
          <div className="font-semibold text-md">5416546</div>
        </div>  

      </div>
          
        ))}
     
      </div>

    </div>
  );
}

export default Homepage