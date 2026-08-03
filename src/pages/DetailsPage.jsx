import {useParams} from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { getCountryByCode, getCountriesByName, getPopularCities } from "../CountriesAPI";
import { useEffect, useState } from "react";


function DetailsPage(){
    const [countryData, setCountryData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {code} = useParams(); //gets the alpha_3 code from the url
    const [neighbours, setNeighbours] = useState([]); //state to hold the neighbouring countries data
    const [popularCities, setPopularCities] = useState([]); //state to hold the popular cities data

    const detailsList = [
        { label: "NativeName", value: countryData?.nativeName || "N/A" },
        { label: "Name", value: countryData?.name || "N/A" },
        { label: "Capital", value: countryData?.capital || "N/A" },
        { label: "Region", value: countryData?.region || "N/A" },
        { label: "Area", value: countryData?.area ? countryData.area.toLocaleString() : "N/A" },
        { label: "Population", value: countryData?.population ? countryData.population.toLocaleString() : "N/A" },
        { label: "CallingCode", value: countryData?.callingCodes?.[0] || "N/A" },
        { label: "Currency", value: countryData?.currencies?.[0]?.name || "N/A" },
        { label: "TLD", value: countryData?.topLevelDomain?.[0] || "N/A" },
    ];
    // const {uuid} = useParams();
    // const country = hardcodedCountries.find((c) => c.uuid === uuid);

  
    useEffect(() => {
        const fetchCountryData = async () => {
            console.log("Fetching data for country code:", code);
            try{
                setLoading(true);
                setError(null);
                const data = await getCountryByCode(code); //fetches the country data by its alpha_3 code
                setCountryData(data);
                
                if (data.borders && data.borders.length > 0) {
                    try{
                        const neighbourData = await getCountriesByName(data.name); //fetches the neighbouring countries by their names
                        setNeighbours(neighbourData);
                    } catch (neighbourErr){
                        console.error(neighbourErr);
                        setError("Failed to load neighbouring countries data");
                        setNeighbours([]); //set neighbours to empty array if fetching fails
                    }
                }else{
                    setNeighbours([]); //if no neighbours, set to empty array
                }
                try{
                    const cityData = await getPopularCities(data.alpha2Code); //fetches the popular cities by the country's alpha_2 code
                    setPopularCities(cityData);
                } catch(err){
                    console.error(err);
                    setPopularCities([]); //set popular cities to empty array if fetching fails 
                }
            } catch (err){
                console.error(err);
                setError("Failed to load country data");
            } finally {
                setLoading(false);
            }
        }; 
    fetchCountryData();
    }, [code]); //[] re-run the effect if the code changes (when navigating to a different country)

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
    };
    
    if (!countryData) //if searched country is not found
            return <div className="p-15 text-red-500">Country data not found</div>;

    return(
        <div className="items-center w-full p-10 flex flex-col gap-5">

            <div className="bg-secondary justify-center rounded-lg shadow-sm shadow-shadowColor flex flex-col sm:flex-row gap-8 p-5 w-full max-w-3xl">
                <div className="flex flex-col gap-5 items-center">
                     <img 
                        src={countryData.flags.png}
                        alt={`${countryData} flag`} 
                        className="text-sm w-30"/>
                    <span className="text-2xl font-semibold dark:text-gray-200">{countryData.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {detailsList.map((item) => (
                        <div 
                        key={item.label}
                        className="flex flex-col border border-transparent bg-hoverColor rounded-md w-30 pl-1 md:w-50 sm:pl-3 py-2">
                            <div className="text-gray-500 dark:text-gray-400 text-xs">{item.label}</div>
                            <div className="font-semibold dark:text-gray-200 text-md">{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border border-gray-300 dark:border-gray-500 w-full"></div>


            <h1 className="text-xl font-bold dark:text-gray-200">Most popular cities in {countryData?.name}</h1>
            <div className="bg-secondary justify-center rounded-lg shadow-sm shadow-shadowColor flex flex-col sm:flex-row gap-2 p-5 w-full max-w-3xl">
                <div className="flex flex-col gap-5 items-center">
                </div>
                <div className="grid sm:grid-cols-2 gap-4 w-full ">
                    {popularCities.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400"> No city data available</p>
                    ) : 
                    (popularCities.map((city,index) => (
                        <div 
                        key={index}
                        className="flex flex-row gap-4 border border-transparent bg-hoverColor rounded-md w-full pl-1 sm:pl-3 py-2">
                            <img 
                                src={city.flags?.png} 
                                alt={`${city.name} flag`} 
                                className="w-14 h-14 rounded-full"/>
                            <div className="flex flex-col ">
                                <div className="text-xl dark:text-gray-100">{city.name}</div>
                                <div className="text-xs border border-gray-400 rounded-sm bg-gray-200 dark:bg-gray-500 dark:text-gray-300 font-semibold w-full text-center">POP: {city.population}</div>
                            </div>
                        </div>
                    ))
                    )}
                </div>
            </div>
            <div className="border border-gray-300 dark:border-gray-500  w-full"></div>


            <h1 className="text-xl font-bold dark:text-gray-200">Neighboring Countries of {countryData.name} ({neighbours.length})</h1>
            <div className="bg-secondary justify-center rounded-lg shadow-sm shadow-shadowColor flex flex-col sm:flex-row gap-2 p-5 w-full max-w-3xl">
                <div className="flex flex-col gap-5 items-center">
                </div>
              
                <div className="grid sm:grid-cols-2 gap-4 w-full ">
                  {neighbours.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No neighboring countries found.</p>
                ): ( neighbours.map((neighbourCity,index) => (
                        <div 
                        key={index}
                        className="flex flex-row gap-4 border border-transparent bg-hoverColor rounded-md w-full pl-1 sm:pl-3 py-2 items-center">
                            <img 
                                src={neighbourCity.flags?.png}
                                alt={`${neighbourCity.name} flag`} 
                                className="text-sm w-30"/>
                           <div className="flex flex-col ">
                                <div className="text-xl dark:text-gray-100">{neighbourCity.names?.common}</div>
                                <div className="flex flex-row gap-1 text-xs flex-wrap pr-3">
                                    
                                    <div className="border-gray-400 rounded-sm bg-cyan-400 dark:bg-cyan-500 px-1">
                                        <span className="text-neighbourCityText">Region:</span>
                                        <span className="text-neighbourCityText font-medium p-0.5">{neighbourCity.region}</span>
                                    </div>
                                     <div className="border-gray-400 rounded-sm bg-blue-300 dark:bg-blue-500 px-1">
                                        <span className="text-neighbourCityText">Population:</span>
                                        <span className="text-neighbourCityText font-medium p-0.5">{neighbourCity.population}</span>
                                    </div>
                                     <div className="border-gray-400 rounded-sm bg-purple-300 dark:bg-purple-500 px-1">
                                        <span className="text-neighbourCityText">Area:</span>
                                        <span className="text-neighbourCityText font-medium p-0.5">{neighbourCity.area?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                    )}
                </div>
            </div>

        </div>
    )
}
export default DetailsPage 