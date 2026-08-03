const BASE_URL = "https://countries.dev"; //base url thats shared across all api requests

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData.message || "API request failed");
    }
    return response.json(); //parses the response body as JSON and returns it
}

//Homepage: everyone, or filtered by region no auth or pagination loop needed 
export async function getCountries({region = "All"} = {}, signal) {
    const url = region === "All" //constructs the request url based on the region filter. If the region is "All", it fetches all countries; otherwise, it fetches countries from the specified region.
        ? `${BASE_URL}/countries`
        : `${BASE_URL}/countries?region=${region}`;
    const response = await fetch(url, { signal }); //sends HTTP GET request with an optional abortcontoller signal for cancellation support
    return handleResponse(response); //passes the response to the handleResponse function to check for errors and parse the JSON data
}

//details page: get counrty by alpha_2 or alpha_3 code
export async function getCountryByCode(code){
    const response = await fetch (`${BASE_URL}/alpha/${code}`); //fetches the country that matches the provided alpha_2 or alpha_3 code from the API
    return handleResponse(response); //returns the parsed counrty object
}

//details page: gets neighbours with one call full objects are fetched directly no code needed 
export async function getCountriesByName(name){
    const response = await fetch (`${BASE_URL}/borders/${encodeURIComponent(name)}`); //encodes special characters in the country name to ensure a valid URL and fetches the neighboring countries from the API
    return handleResponse(response);
}

//details page: top cities by population for the chosen country
export async function getPopularCities(countryCode, count=6){
    const response= await fetch (`${BASE_URL}/cities?country=${countryCode}`); //requests 6 available cities for the given country code
    const cities = await handleResponse(response);
    return [...cities]
        .sort((a,b) => b.population - a.population) //creates a copy of the array and sorts the cities in descending order bsed on their population
        .slice(0, count); //extracts the fetched cities and returns only the top 6 cities sorted by population in descending order
}