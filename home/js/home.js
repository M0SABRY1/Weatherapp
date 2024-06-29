
let userName = localStorage.getItem("sessionUser");
let logoutBtn = document.getElementById("logOutBtn");

// searchinput
let searchInput = document.getElementById("search");



//today 
let todayName = document.getElementById("today-date-day-name");
let todayNumber = document.getElementById("today-date-day-num");
let todayMonth = document.getElementById("today-date-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

// nextday
let nextDay = document.getElementsByClassName("next-day-name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMinTemp = document.getElementsByClassName("next-min-temp");
let nextConditionImg = document.getElementsByClassName("next-condition-img");
let nextConditionText = document.getElementsByClassName("next-condition-text");


function displayUserName() {
    document.getElementById("userName").innerHTML = "Welcome " + userName;
}

displayUserName();

function logOut() {
    localStorage.removeItem("sessionUser")
}

logoutBtn.addEventListener("click", logOut);


// fetch API DATA
async function getWeaterData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b8f61f414ffc413fb8072838242806&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}

function displayTodayData(data) {
    let date = new Date();
    todayName.innerHTML = date.toLocaleDateString("en-us", { weekday: "long" });
    todayNumber.innerHTML = date.getDate();
    todayMonth.innerHTML = date.toLocaleDateString("en-us", { month: "long" });

    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", "https:" + data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir;
}


function displayNextData(data) {
    let forecast = data.forecast.forecastday;

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecast[i + 1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", { weekday: "long" });
        nextMaxTemp[i].innerHTML = forecast[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecast[i + 1].day.mintemp_c;
        nextConditionImg[i].setAttribute("src", "https:" + forecast[i + 1].day.condition.icon);
        nextConditionText[i].innerHTML = forecast[i + 1].day.condition.text;
    }

}



async function startApp(city = "alexandria") {
    let weatherData = await getWeaterData(city);
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayNextData(weatherData);
    }

}


searchInput.addEventListener("input", function () {
    startApp(searchInput.value);
})

startApp();