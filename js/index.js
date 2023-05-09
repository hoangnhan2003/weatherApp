const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const iconWeather = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const feelLike = document.querySelector('.feelLike');
const pressureIn = document.querySelector('.pressureIn');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
console.log(searchInput);
 const API_KEY = '436ad23e801d47d7a18184728230905';
// async function getWeather(cityName) {
//     try{
//         const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${cityName}&q=${searchInput}&aqi=no`); 
//         const data = response.json();

//     }
//     catch(e){
//         console.log(e);
//     }
// }
searchInput.addEventListener('change',(e)=> {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${e.target.value}&aqi=no`).then(
        async (res)=> {
            const data = await res.json();
            cityName.innerHTML = data.location.name;
            weatherState.innerHTML = data.current.condition.text;
            iconWeather.setAttribute('src',data.current.condition.icon);
            temperature.innerHTML = data.current.temp_c || '--';
            windSpeed.innerHTML = (data.current.wind_mph/1.6).toFixed(2) + "km/h" || 0;
            pressureIn.innerHTML = data.current.pressure_in +' inches of mercury'|| 0;
            feelLike.innerHTML = data.current.feelslike_c + " C" || "";
            humidity.innerHTML = data.current.humidity + "%" || 0;
            console.log('Data',data);
        }
    );
}) 