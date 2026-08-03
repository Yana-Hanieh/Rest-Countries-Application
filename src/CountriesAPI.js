const BASE_URL = "https://countries.dev";

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData.message || "API request failed");
    }
    return response.json();
}

//Homepage: everyone, or filtered by region no auth or pagination loop needed 
export async function getCountries({region = "All"} = {}, signal) {
    const url = region === "All"
        ? `${BASE_URL}/countries`
        : `${BASE_URL}/countries?region=${region}`;
    const response = await fetch(url, { signal });
    return handleResponse(response);
}

//details page: get counrty by alpha_2 or alpha_3 code
export async function getCountryByCode(code){
    const response = await fetch (`${BASE_URL}/alpha/${code}`);
    return handleResponse(response);
}

//details page: gets neighbours with one call full objects are fetched directly no code needed 
export async function getCountriesByName(name){
    const response = await fetch (`${BASE_URL}/borders/${encodeURIComponent(name)}`);
    return handleResponse(response);
}

//details page: top cities by population for the chosen country
export async function getPopularCities(countryCode, count=6){
    const response= await fetch (`${BASE_URL}/cities?country=${countryCode}`);
    const cities = await handleResponse(response);
    return [...cities]
        .sort((a,b) => b.population - a.population)
        .slice(0, count);
}