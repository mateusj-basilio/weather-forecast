

const key = "d63631d770fc63fcf1b0dac00274c4d7"

function putDataOnScreen(data) {
    document.querySelector(".city").innerHTML = "Tempo em " + data.name
    document.querySelector(".temp").innerHTML = Math.floor (data.main.temp) + "°C"
    document.querySelector(".text-weather").innerHTML = data.weather[0].description
    document.querySelector(".humidity").innerHTML = data.main.humidity + "% Umidade"
    document.querySelector(".img-weather").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    
}

async function citySearch (city){

    const data = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`) .then (response => response.json())
    putDataOnScreen(data);

}

function clickButton (){
        const city = document.querySelector(".input-city").value

        citySearch (city)
}