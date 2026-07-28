import { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";

const hardcodedCountries = [
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

    </div>
  );
}

export default Homepage