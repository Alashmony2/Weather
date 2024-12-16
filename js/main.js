let allData;
let searchInput = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');

searchInput.addEventListener('input',()=>{
    getWeather(searchInput.value)
})

searchBtn.addEventListener('click',()=>{
    getWeather(searchInput.value)
})

async function getWeather(city = 'cairo') {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ef47c184cedd47a1a72203852241412&q=${city}&days=3`);
        if (response.ok) {
            let data = await response.json();
            allData = data;
            display();
        }
}

navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    getWeather(`${latitude},${longitude}`);
});

let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getDayName(dateString) {
    let dateObject = new Date(dateString);
    return daysOfWeek[dateObject.getDay()];
}


function display() {
    document.getElementById('toDay').innerHTML = getDayName(allData.forecast.forecastday[0].date);
    document.getElementById('dateDay').innerHTML = allData.forecast.forecastday[0].date;
    document.getElementById('nextDay').innerHTML = getDayName(allData.forecast.forecastday[1].date);
    document.getElementById('thirdDay').innerHTML = getDayName(allData.forecast.forecastday[2].date);
    document.getElementById('city').innerHTML = allData.location.name;
    document.getElementById('temp').innerHTML = allData.current.temp_c;
    let icon1 = allData.current.condition.icon;
    icon1 = "https:" + icon1;    
    document.getElementById('icon1').setAttribute('src',icon1);
    document.getElementById('status').innerHTML = allData.current.condition.text;
    document.getElementById('umb').innerHTML = allData.current.wind_mph+'%';
    document.getElementById('wind1').innerHTML = allData.current.wind_kph+'km/h';
    document.getElementById('dir').innerHTML = allData.current.wind_dir;
    //second day
    document.getElementById('maxTemp').innerHTML = allData.forecast.forecastday[1].day.maxtemp_c+"<sup>o</sup>C";
    document.getElementById('minTemp').innerHTML = allData.forecast.forecastday[1].day.mintemp_c+"<sup>o</sup>C";
    document.getElementById('status2').innerHTML = allData.forecast.forecastday[1].day.condition.text;
    let icon2 = allData.forecast.forecastday[1].day.condition.icon;
    icon2 = "https:" + icon2; 
    document.getElementById('icon2').setAttribute('src',icon2);
    //third day
    document.getElementById('maxTemp3').innerHTML = allData.forecast.forecastday[2].day.maxtemp_c+"<sup>o</sup>C";
    document.getElementById('minTemp3').innerHTML = allData.forecast.forecastday[2].day.mintemp_c+"<sup>o</sup>C";
    document.getElementById('status3').innerHTML = allData.forecast.forecastday[2].day.condition.text;
    let icon3 = allData.forecast.forecastday[2].day.condition.icon;
    icon3 = "https:" + icon3; 
    document.getElementById('icon3').setAttribute('src',icon3);
}

