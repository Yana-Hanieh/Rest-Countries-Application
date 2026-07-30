const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY; //reads the key from the .env file, only variables starting with VITE_ are exposed to client side by vite

export async function CountriesData(){
   const response = await fetch(
    'https://api.restcountries.com/countries/v5',
    { headers: { 'Authorization': `Bearer ${API_KEY }` } }
    )
    if (!response.ok){
        throw new Error ("Failed to fetch country data");
    }
    return response.json();
}

export async function SearchCountries(){
   const response = await fetch(
    'https://api.restcountries.com/countries/v5',
    { headers: { 'Authorization': `Bearer ${API_KEY }` } }
    )
    if (!response.ok){
        throw new Error ("Failed to fetch country data");
    }
    return response.json();
}

export async function FilterByRegion(){
   const response = await fetch(
    'https://api.restcountries.com/countries/v5',
    { headers: { 'Authorization': `Bearer ${API_KEY }` } }
    )
    if (!response.ok){
        throw new Error ("Failed to fetch country data");
    }
    return response.json();
}

export async function Pagination(){
   const response = await fetch(
    'https://api.restcountries.com/countries/v5',
    { headers: { 'Authorization': `Bearer ${API_KEY }` } }
    )
    if (!response.ok){
        throw new Error ("Failed to fetch country data");
    }
    return response.json();
}