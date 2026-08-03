const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY; //reads the key from the .env file, only variables starting with VITE_ are exposed to client side by vite

//shared response handeling (private handler), avoids code duplication, not exported since its only used in this file 
async function handleResponse(response){
    const json=await response.json();
    if (!response.ok) {
        throw new Error(json.errors?.[0].message || "Request Failed")
    }
    return json.data
}

//used in the homepage to fetch all countries and any filtered/searched subset, pagination is automatic
export async function getCountries( { query= "", region = "All"} = {}, signal) { //the default fetches all countries with no filters, but allows future filtering
    const params = new URLSearchParams(); //used to set the search url 
    params.set("limit", "100");
    params.set(
        "response_fields", 
        "names.common,region,capitals,population,area.kilometers,flag.emoji,flag.url_png,codes.alpha_3"
    );
    if (query.trim() !== "") //if the user searched a country
        params.set("q", query.trim()); //adds the country name into the url
    if (region !== "All") //if user chose a filter
        params.set("region", region); //add the country name into the url

    let countryArray = []; //array that contains all countries fetched
    let offset = 0; //the starting index of pagination
    let more = true; //boolean flag that tracks if all the countries are fetched or not

    //pagination loop which fetches data in batches of 50 items
    while (more) {
        params.set("offset", offset);
        const response = await fetch(
            `https://api.restcountries.com/countries/v5?${params.toString()}`,
            { headers: { 'Authorization': `Bearer ${API_KEY }` }, signal }
            );
        const data= await handleResponse(response); //response helper function
        countryArray = countryArray.concat(data.objects); //adds the countries fetched into the country array
        break;
        // more = data.meta.more; //checks if there are more countries not fetched
        // offset +=100; //updates the starting position for the next API batch request
    }
    return countryArray;
}

//details page containing one country which is looked up by its alpha_3 code (TUR, FRA, LEB)
export async function getCountryByCode(code){
   const response = await fetch(
        `https://api.restcountries.com/countries/v5/codes.alpha_3/${code}`,
        { headers: { 'Authorization': `Bearer ${API_KEY }` } }
        )
    const data = await handleResponse(response);
    return data.objects[0]; //returns the first matching country 
}

//details page containing the neighbouring countries that are fetched together 
export async function getCountriesByCode(codes){
   if (!codes?.length) { //if codes are null, undefined or an empty array, it evaluates to true which returns an empty array
        return []
    };
   return Promise.all(codes.map((code) => getCountryByCode(code))); //maps through the codes and calls getCountryByCode. It creates an array of unresolved promises so the promise.all executes these promises at the same time
}
