const apiKey="158fd9fcaab3009be24d56c90e3e9b6b";

const searchBtn = document.querySelector(".search-icon");
const searchBar = document.querySelector(".search-text-box");
const search = document.querySelector(".search-bar"); 

const loadingview = document.querySelector(".loading-display");
const weatherview = document.querySelector(".weather-display");
const errorview = document.querySelector(".error-display");



async function updateData(city,formatedDate){
    const apiUrl1="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    

    const response1 = await fetch(apiUrl1 + city + `&appid=${apiKey}`);
    if(response1.status===404){
        loadingview.style.display="none";
        weatherview.style.display="none";
        errorview.style.display="block";

    }
    else{
        document.querySelector(".location .location-text").textContent=city.charAt(0).toUpperCase()+city.slice(1).toLowerCase();
        document.querySelector(".date").textContent = formatedDate;
        const data1 = await response1.json();
        console.log(data1);
        
        document.querySelector(".temp-text-1").textContent=Math.round(data1.main.temp)+ "°C";
        document.querySelector(".temp-text-2").textContent=data1.weather[0].main;
        document.querySelector(".humidity-text .text-2").textContent=data1.main.humidity + "%";
        document.querySelector(".wind-speed-text .text-2").textContent=data1.wind.speed + " Km/h"

        const weather_condition = data1.weather[0].main;
        var weather_icon_main= document.querySelector(".image-and-temp .image");

        switch(weather_condition){
            case "Atmosphere":
                weather_icon_main.src="assets/weather/atmosphere.svg";
            break;
            case "Clear":
                weather_icon_main.src="assets/weather/clear.svg";
            break;
            case "Clouds":
                weather_icon_main.src="assets/weather/clouds.svg";
            break;
            case "Drizzle":
                weather_icon_main.src="assets/weather/drizzle.svg";
            break;
            case "Rain":
                weather_icon_main.src="assets/weather/rain.svg";
            break;
            case "Snow":
                weather_icon_main.src="assets/weather/snow.svg";
            break;
            case "Thunderstorm":
                weather_icon_main.src="assets/weather/thunderstorm.svg";
            break;

        }

        await update_five_day_weather(city);

        loadingview.style.display="none";
        weatherview.style.display="block";
        errorview.style.display="none";

    }

}


async function update_five_day_weather(city){

    const apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="

    const response2= await fetch(apiUrl2 + city +`&appid=${apiKey}`);
    const data2 = await response2.json();
    console.log(data2);

    const dailyForecast = {};

    data2.list.forEach(item=>{
        const time = new Date(item.dt * 1000).getHours();

        const dateKey= new Date(item.dt*1000).toISOString().split('T')[0]; 

        if(time>=11 && time<=14){
            dailyForecast[dateKey]=item;
        }
    });

    console.log(dailyForecast);

    let forecast_index=1;

    for(item in dailyForecast){
        if(forecast_index<=5){
            document.querySelector(`.forecast-${forecast_index}-date`).textContent=changeDateFormat(dailyForecast[item].dt);
    
            const weather_icon = document.querySelector(`.forecast-${forecast_index}-icon`);
            const weather_data = dailyForecast[item].weather[0].main;
            changeWeatherIcon(weather_data,weather_icon);
    
            document.querySelector(`.forecast-${forecast_index}-temp`).textContent = Math.round(dailyForecast[item].main.temp);
    
            forecast_index++;
        }
    }

}


function changeDateFormat(dt){
    const date = new Date(dt*1000);
    const options = {
        month: 'short',
        day: '2-digit'
    };
    return date.toLocaleDateString('en-Us',options);
}

function changeWeatherIcon(weather_data,weather_icon){
    switch(weather_data){
        case "Atmosphere":
        weather_icon.src="assets/weather/atmosphere.svg";
        break;
        case "Clear":
        weather_icon.src="assets/weather/clear.svg";
        break;
        case "Clouds":
        weather_icon.src="assets/weather/clouds.svg";
        break;
        case "Drizzle":
        weather_icon.src="assets/weather/drizzle.svg";
        break;
        case "Rain":
        weather_icon.src="assets/weather/rain.svg";
        break;
        case "Snow":
        weather_icon.src="assets/weather/snow.svg";
        break;
        case "Thunderstorm":
        weather_icon.src="assets/weather/thunderstorm.svg";
        break;
    }
}

searchBtn.addEventListener("click",function (){
    let now = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    };
    let formatedDate = now.toLocaleDateString('en-Us',options); 
    updateData(searchBar.value,formatedDate);
})


searchBar.addEventListener("focus",function(){
    search.classList.add("active-border");
});

searchBar.addEventListener("blur",function(){
    search.classList.remove("active-border")
})


searchBar.addEventListener("keydown",function(event){
    if(event.key=== "Enter"){
        event.preventDefault();
        let now = new Date();
        const options = {
            weekday: 'short',
            day: '2-digit',
            month: 'short'
        };
        let formatedDate = now.toLocaleDateString('en-Us',options); 
        updateData(searchBar.value,formatedDate);
    }
})
