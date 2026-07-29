import {useParams} from "react-router-dom";
import hardcodedCountries from "../CountriesData";


function DetailsPage(){
    const {uuid} = useParams();
    const country = hardcodedCountries.find((c) => c.uuid === uuid);

    if (!country) //if searched country is not found
        return <div className="p-10">Country not found</div>;

    const detailsList = [
        { label: "Native Name", value: country.nativeName || "N/A" },
        { label: "Name", value: country.name || "N/A" },
        { label: "Capital", value: country.capital || "N/A" },
        { label: "Region", value: country.region || "N/A" },
        { label: "Area Km²", value: country.area ? country.area.toLocaleString() : "N/A" },
        { label: "Population", value: country.population ? country.population.toLocaleString() : "N/A" },
        { label: "Calling Code", value: country.callingCode || "N/A" },
        { label: "GINI Index", value: country.gini || "N/A" },
        { label: "Currency", value: country.currency || "N/A" },
        { label: "TLD", value: country.tld || "N/A" },
    ];


    return(
        <div className="items-center w-full p-10 flex flex-col gap-5">

            <div className="bg-secondary justify-center rounded-lg shadow-sm shadow-shadowColor flex flex-col sm:flex-row gap-8 p-5 w-full max-w-3xl">
                <div className="flex flex-col gap-5 items-center">
                    <span className="text-4xl">{country.flag}</span>
                    <span className="text-2xl font-semibold">{country.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {detailsList.map((item) => (
                        <div 
                        key={item.label}
                        className="flex flex-col border border-gray-400 rounded-md w-30 pl-1 md:w-50 sm:pl-3 py-2">
                            <div className="text-gray-500 text-xs text-left">{item.label}</div>
                            <div className="font-semibold text-md">{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border border-gray-300 w-full"></div>


            <h1 className="text-xl font-bold text-left">Most popular cities in {country.name}</h1>
            <div className="bg-secondary justify-center rounded-lg shadow-sm shadow-shadowColor flex flex-col sm:flex-row gap-8 p-5 w-full max-w-3xl">
                <div className="flex flex-col gap-5 items-center">
                </div>
                <div className="grid sm:grid-cols-2 gap-4 w-full ">
                    {country.popularCities.map((city,index) => (
                        <div 
                        key={index}
                        className="flex flex-row gap-4 border border-gray-400 bg-hoverColor rounded-md w-full pl-1 sm:pl-3 py-2">
                            <img src={city.image} alt={city.name} className="w-14 h-14 rounded-full"/>
                            <div className="flex flex-col ">
                                <div className="text-xl text-left">{city.name}</div>
                                <div className="text-xs border bg-gray-200 font-semibold w-full text-center">SCORE:{city.score}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border border-gray-300 w-full"></div>


            <h1 className="text-xl font-bold text-left">Neighboring Countries of {country.name} (number)</h1>
            <div className="bg-secondary justify-center rounded-lg shadow-sm shadow-shadowColor flex flex-col sm:flex-row gap-8 p-5 w-full max-w-3xl">
                <div className="flex flex-col gap-5 items-center">
                </div>
                <div className="grid sm:grid-cols-2 gap-4 w-full ">
                    {country.popularCities.map((city,index) => (
                        <div 
                        key={index}
                        className="flex flex-row gap-4 border border-gray-400 bg-hoverColor rounded-md w-full pl-1 sm:pl-3 py-2">
                            <img src={city.image} alt={city.name} className="w-14 h-14 rounded-full"/>
                            <div className="flex flex-col ">
                                <div className="text-xl text-left">{city.name}</div>
                                <div className="text-xs border bg-gray-200 font-semibold w-full text-center">SCORE:{city.score}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default DetailsPage 