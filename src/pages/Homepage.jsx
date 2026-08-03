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
        src={country.flags.png}
        alt={`${country.name} flag`} 
        className="text-sm w-1/5"/>
     
      <div title={country.name} className="sm:text-xl font-semibold sm:font-bold truncate w-20 sm:w-1/5 dark:text-gray-200">{country.name}</div>

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


function HomePage() {
  const [searchInput, setSearchInput] = useState(""); //tracks what the user is currently typing in the search bar 
  const [submittedQuery, setSubmittedQuery] = useState(""); //tracks the query/input that the user submitted after pressing Enter
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [countries, setCountries] = useState([]); //holds the list of countries fetched from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
      const loadCountries = async() => {
        try{
          setLoading(true);
          setError(null); //resets previous errors before starting the fetch again
          // Pass empty query so we fetch the region's full dataset once
          const data = await getCountries({region: selectedRegion}, controller.signal);
          setCountries(data); //saves the fetched countries to the state, which will trigger a re-render and display the countries

        } catch (err) {
          console.error(err);
          setError("Failed to load country data"); //catches any errors that occured during the fetch

        } finally{
          setLoading(false); //turns the loading state off regardless if the fetch was successful or not 
        }
      }; 

    loadCountries(); //calls the function to fetch countries when the component mounts or when the selectedRegion changes
    return () =>{
      controller.abort(); //a cleanup function that aborts the fetch request if the component unmounts or if the selectedRegion changes before the fetch completes, preventing memory leaks and unnecessary state updates
    }
  }, [selectedRegion]); //dependency array includes selectedRegion, so this useEffect runs when selectedRegion changes

  useEffect(() => { 
    setSubmittedQuery(""); //when user presses enter after his search, the submitted query is set to an empty string and displays all the countries again
  }, [selectedRegion]);


  //clears submitted lock as soon as user types something new
  const handleInputChange = (value) => {
    setSearchInput(value); //updates the searchInput state with the current value of the search bar
    if(submittedQuery) {
      setSubmittedQuery(""); //reset the submitted query when user starts typing again
    }
  };

  //when user presses enter, the search input is locked and the api call is made based on the submitted query
  const handleSearchSubmit = (e) => {
    if (e) 
      e.preventDefault(); //prevents default HTML page refresh
    if(!searchInput.trim()) //prevents submitting empty query
      return; 

    setSubmittedQuery(searchInput.trim()); //sets the submittedQuery state to the current searchInput value
    setSearchInput(""); //clears the search input field after user presses Enter
  };

  //clientside filtering of the countries based on the selected region and the search query, without making additional API calls. This is done to improve performance and reduce unnecessary network requests.
  const activeQuery = (submittedQuery || searchInput).toLowerCase().trim(); //determines active search term (prioritizes submitted query over live input) and normalizes it for case-insensitive comparison

  const visibleCountries = countries.filter((country) => {
    //filter countries based on the selected region and the active search query 
    const countryRegion = country.region?.toLowerCase() || "";
    const targetRegion = selectedRegion.toLowerCase();
    const matchesRegion = selectedRegion === "All" ||  
      countryRegion === targetRegion || 
      countryRegion.startsWith(targetRegion); //checks if the country region matches the selected region or if the selected region is "All" which means all regions are included

    if (!matchesRegion) 
      return false; //excludes countries that do not match the selected region from the visibleCountries array
   
    //clientside search query filtering, only filters the countries that are already fetched and stored in the countries state
    if (!activeQuery) 
      return true; //returns all region-matched countries if the search bar is empty
    const countryName = country.name?.toLowerCase() || ""; //safely gets the country's name in lowercase form

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
    )
  };

  if (error){
    return(
      <div className="flex items-center justify-center w-full gap-3 p-15">
        <span className="text-red-500 text-xl font-medium">{error}</span>
      </div>
    )
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
      {/* Displays the country cards based on the filtered countries from the search query and selected region. Clicking on a country card navigates to the details page for that country. */}
      <div className="w-full md:w-4/5 lg:w-3/4 xl:w-1/2">
        {visibleCountries.map((country) => ( //maps through the filtered countries to display the country cards
          <CountryCards 
              key={country.alpha3Code || country.name}
              country = {country} 
              onClick={() => navigate(`/details/${country.alpha3Code}`,{state: {country}})} //navigates to the selected country, changing the url based on the uuid of the country
          /> 
        ))}
        
     
      </div>

    </div>
  );
}


export default HomePage