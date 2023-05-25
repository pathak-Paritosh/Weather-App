const key = 'o1WAm6njibi2XTCEGduE6AFDfepwZGT6';



// getWeather() takes city code and gives info of weather.
const getWeather = async (id) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;
  const response = await fetch(base + query);
  const data = await response.json();

  // data[0] is an object having weather infos
  return data[0];
};



// getCity() takes city name and gives the city code
const getCity = async (city) => {
  // base is the API end point
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

  // for making any API request, only API end point is not enough, we need
  // a query parameter. query parameter starts with '?' symbol.

  // info about query parameter can be found on the website
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base+query);
  const data = await response.json();

  // data[0] returns an object having info about the city
  // it has a property 'Key' which can be use to get city code
  return data[0];
};



