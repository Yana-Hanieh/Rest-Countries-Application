import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import Searchbar from "../components/Searchbar";
import { getCountries } from "../CountriesAPI";

function CountryCards ({country, onClick}){
  return (
    <div 
      onClick = {onClick}
      className="bg-secondary hover:bg-hoverColor shadow-sm shadow-shadowColor cursor-pointer flex flex-row gap-3 sm:gap-0 justify-between py-4 px-2 sm:p-8 mt-3 rounded-xl items-center">
    
      <img 
        src={country.flag?.url_png || country.flag?.png}
        alt={`${country.names.common} flag`} 
        className="text-sm w-30"/>
      {/* dont make the width fixed, make it by percentages/divisions */}
      <div title={country.names.common} className="sm:text-xl font-semibold sm:font-bold truncate w-25 sm:w-1/3 dark:text-gray-200">{country.names.common}</div>

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
        <div className="font-semibold dark:text-gray-200 text-sm sm:text-md">{country.area.kilometers}</div>
      </div>  
    </div>
  )
}


function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(""); //state that actually triggers the api call
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleSearchSubmit=(e) => {
  //   if (e) 
  //     e.preventDefault(); //prevents the page from automatic refresh 
  //   setSubmittedQuery(searchInput.trim());
  // }

  useEffect(() => {
    const controller = new AbortController();
      const loadCountries = async() => {
        try{
          setLoading(true);
          setError(null);
          // Pass empty query so we fetch the region's full dataset once
          const data = await getCountries({} , controller.signal);
          setCountries(data);

        } catch (err) {
          setError("Failed to load country data");

        } finally{
          setLoading(false);
        }
      }; 

    loadCountries();
    return () =>{
      controller.abort();
    }
  }, []); //empty dependency array means this useEffect runs only once when the component mounts, and not on every render

  //clears submitted lock as soon as user types something new
  const handleInputChange = (value) => {
    setSearchInput(value);
    if(submittedQuery) {
      setSubmittedQuery(""); //reset the submitted query if the user starts typing again
    }
  };

  //when user presses enter, the search input is locked and the api call is made based on the submitted query
  const handleSearchSubmit = (e) => {
    if (e) 
      e.preventDefault();
    if(!searchInput.trim())
      return; 

    setSubmittedQuery(searchInput.trim());
    //setSearchInput(""); //clears the search input field after submission
  };

  //computes visible countries based on the submitted query or the current search input without calling the api again
  const activeQuery = (submittedQuery || searchInput).toLowerCase().trim();

  const visibleCountries = countries.filter((country) => {
    //filter countries based on the selected region and the active query 
    const countryRegion = country.region?.toLowerCase() || "";
    const targetRegion = selectedRegion.toLowerCase();
    const matchesRegion = selectedRegion === "All" || 
      countryRegion === targetRegion || 
      countryRegion.startsWith(targetRegion); //checks if the country region matches the selected region or if the selected region is "All" which means all regions are included

    if (!matchesRegion)
      return false;
   
    //clientside search query filtering, only filters the countries that are already fetched and stored in the countries state
    if (!activeQuery) 
      return true;
    const countryName = country.names?.common?.toLowerCase() || "";

    if(submittedQuery){
      //lock the search to only exact matches or starts with the query when submitted (user enters)
      return countryName === activeQuery || countryName.startsWith(activeQuery);
    }
    //live search, filter countries that include the query anywhere in their name while typing
    return countryName.includes(activeQuery);
  });

  if (loading) {
  return (
    <div className="flex items-center justify-center w-full gap-3 p-15">
      <CgSpinner className="animate-spin text-4xl text-cyan-400 " />
      <span className="text-gray-900 dark:text-gray-200 text-xl font-medium ">Loading countries...</span>
    </div>
  );

  if (error){
    return(
      <div className="flex items-center justify-center w-full gap-3 p-15">
        <span className="text-red-500 text-xl font-medium">{error}</span>
      </div>
    )
  }
}

  return (
    <div className='justify-items-center p-8'>
      <div className="sm:text-2xl text-xl font-medium text-center dark:text-gray-200">Get information about the countries.</div>
        <Searchbar //takes the searchbar and passes down props based on the parameters the searchbar takes
          searchInput={searchInput}
          setSearchInput={handleInputChange}
          onSearchSubmit = {handleSearchSubmit}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
         
          placeholder = {"Search by country name or region"}
      />
       <p className="text-sm text-gray-500 dark:text-gray-400 mt-4"> {/*shows the user the number of countries that are filtered (no duplicates) */}
        Found {visibleCountries.length} countries. 
      </p>

      <div className="lg:w-1/2">
        {visibleCountries.map((country) => ( //maps through the filtered countries to display the country cards
          <CountryCards 
              key={country.codes?.alpha_3 || country.names?.common}
              country = {country} 
              onClick={() => navigate(`/details/${country.codes.alpha_3}`,{state: {country}})} //navigates to the selected country, changing the url based on the uuid of the country
          /> 
        ))}
        
     
      </div>

    </div>
  );
}


export default HomePage