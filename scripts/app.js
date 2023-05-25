// formName.reset() it clears all fields
const cityNameForm = document.querySelector('form');
const showWeatherDetails = document.querySelector('.weather-details');
const card = document.querySelector('.card');
const timeImage = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;
  showWeatherDetails.innerHTML = `
    <h4 class="city">${cityDets.EnglishName}</h5>
    <div class="weather-condition">${weather.WeatherText}</div>
    <div class="show-temperature">
      <span class="temp-val">${weather.Temperature.Metric.Value}</span>
      <span class="temp-symbol">&deg;C</span>
    </div>
  `;

  // update day/night and icon images
  // we just need to update the src attribute
  let timeSrc = null;
  if(weather.IsDayTime){
    timeSrc = 'images/day.svg';
  }
  else{
    timeSrc = 'images/night.svg';
  }
  // timeSrc.style.width = "350px";
  // timeSrc.styel.height = "300px";
  timeImage.setAttribute('src', timeSrc);

  const iconSrc = `icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};


const updateCity = async (cityName) => {
  const cityDetails = await getCity(cityName);
  const weatherDetails = await getWeather(cityDetails.Key);


  // we can use object shorthand notation, when propertyName and ValueName
  // are same, here i am not using that 
  // we can do as: return { cityDets, weatherDetails };
  return {
    cityDets: cityDetails,
    weather: weatherDetails
  };
};


cityNameForm.addEventListener('submit', (e) => {
  // prevent the default action of submit(refresh)
  e.preventDefault();

  // input field has name attribute-> name="city", so we can grab 
  // input field as cityNameForm.city
  const cityName = cityNameForm.city.value.trim();
  cityNameForm.reset();

  updateCity(cityName).then(data => {
    updateUI(data);
  }).catch(err => {
    console.log(err);
  });

});