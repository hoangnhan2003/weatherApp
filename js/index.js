const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const iconWeather = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const feelLike = document.querySelector('.feelLike');
const pressureIn = document.querySelector('.pressureIn');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const container  = document.querySelector('.container');
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
// tro ly ao
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
// synth nay để nói
const synth = window.speechSynthesis;
// cai dat ngon ngu
recognition.lang = 'vi-VI';
// khi nói xong thì xử lí kết quả ngay
recognition.continuous = false;

const speak = (text) => {
    if(synth.speaking){
        console.log("Busy speaking....");
        return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => {
        console.log('SpeechSynthesisUtterance onend');
    }
    utter.onerror = () => {
        console.log('SpeechSynthesisUtterance on error');
    }
    synth.speak(utter);
}
const microphone = document.querySelector('.microphone');
microphone.addEventListener('click',(e)=> {
    e.preventDefault();
    recognition.start();
    microphone.classList.add('recording');
});
const handleVoice = (text) => {
    const lowerText = text.toLowerCase();
    if(lowerText.includes('thời tiết tại')){
        const location = lowerText.split('tại')[1].trim();
        console.log(location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
        return;
    }
    if(lowerText.includes('thay đổi màu nền')){
        const color = lowerText.split('màu nền')[1].trim();
        console.log(color);
        container.style.background = color;
        return;
    }
    if(lowerText.includes('màu nền mặc định')){

        container.style.background = '';
        return;
    }
    if(lowerText.includes('thay đổi nội dung màu')){
        const color = lowerText.split('màu')[1].trim();
        container.style.color = color;
        return;
    }
    if(lowerText.includes('mấy giờ')){
        var toDay = new Date();
        console.log(toDay.getHours()+ ' hours : '+ toDay.getMinutes()+ "minutes : "+ toDay.getSeconds()+" seconds: ");
        speak(toDay.getHours()+ ' giờ : '+ toDay.getMinutes()+ " phút : "+ toDay.getSeconds()+" giây ");
        return ;
    }
    
    
}
recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
} 
recognition.onerror = (error) => {
    console.log('On error:',error);
    microphone.classList.remove('recording');
}
recognition.onresult = (e)=> {
    console.log('on result: ', e);
    const text = e.results[0][0].transcript;
    console.log(text);
    handleVoice(text);
}