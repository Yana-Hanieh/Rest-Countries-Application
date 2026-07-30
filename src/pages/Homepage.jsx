import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Searchbar from "../components/Searchbar";
import hardcodedCountries from "../CountriesData";


function CountryCards ({country, onClick}){
  return (
    <div 
      onClick = {onClick}
      className="bg-secondary hover:bg-hoverColor shadow-sm shadow-shadowColor cursor-pointer flex flex-row gap-3 sm:gap-0 justify-between py-4 px-2 sm:p-8 mt-3 rounded-xl items-center">
    
      <div className="text-sm">{country.flag}</div>
      {/* dont make the width fixed, make it by percentages/divisions */}
      <div title={country.name} className="sm:text-xl font-semibold sm:font-bold truncate w-25 sm:w-1/3 dark:text-gray-200">{country.name}</div>

      <div className="flex flex-col">
        <div className="text-gray-500 dark:text-gray-400 text-xs">Region</div>
        <div className="font-semibold text-sm dark:text-gray-200 sm:text-md">{country.region}</div>
      </div>

      <div className="flex flex-col">
        <div className="text-gray-500 dark:text-gray-400 text-xs">population</div>
        <div className="font-semibold text-sm dark:text-gray-200 sm:text-md">{country.population}</div>
      </div>
      
      <div className="flex flex-col">
        <div className="text-gray-500 dark:text-gray-400 text-xs">Area km</div>
        <div className="font-semibold dark:text-gray-200 text-sm sm:text-md">{country.area}</div>
      </div>  
    </div>
  )
}


const handleSearch = async (countryName) => {
  if (countryName.trim() === "")
    return;
}

function HomePage() {

  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const navigate = useNavigate();

  const filteredCountries = hardcodedCountries.filter((countryName) =>{
    const matchesRegion = selectedRegion === "All" || countryName.region === selectedRegion;
    const matchesInput = countryName.name.toLowerCase().includes(searchInput.toLocaleLowerCase());
    return matchesRegion && matchesInput;
  });

  return (
    <div className='justify-items-center p-8'>
      <div className="sm:text-2xl text-xl font-medium text-center dark:text-gray-200">Get information about the countries.</div>
        <Searchbar //takes the searchbar and passes down props based on the parameters the searchbar takes
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          placeholder = {"Search by country name or region"}
      />

       <p className="text-sm text-gray-500 dark:text-gray-400 mt-4"> {/*shows the user the number of countries that are filtered (no duplicates) */}
        Found {filteredCountries.length} countries. 
      </p>

      <div className="lg:w-1/2">
        {filteredCountries.map((country) => ( //maps through the filtered countries to display the country cards
          <CountryCards 
              key={country.uuid}
              country = {country} 
              onClick={() => navigate(`/details/${country.uuid}`,{state: {country}})} //navigates to the selected country, changing the url based on the uuid of the country
          /> 
        ))}
     
      </div>

    </div>
  );
}

export default HomePage