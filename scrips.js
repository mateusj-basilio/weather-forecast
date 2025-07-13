const key = "d63631d770fc63fcf1b0dac00274c4d7"; // Sua chave da API OpenWeatherMap

// Função para exibir os dados do tempo na tela
function putDataOnScreen(data) {
    document.querySelector(".error-message").style.display = "none"; // Esconde mensagem de erro
    document.querySelector(".weather-info").style.display = "block"; // Mostra as informações do tempo

    document.querySelector(".city").innerHTML = `Tempo em ${data.name}`;
    document.querySelector(".temp").innerHTML = `${Math.floor(data.main.temp)}°C`;
    document.querySelector(".text-weather").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = `Umidade: ${data.main.humidity}%`;
    document.querySelector(".wind-speed").innerHTML = `Vento: ${data.wind.speed} m/s`; // Adicionado velocidade do vento
    document.querySelector(".img-weather").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Função para buscar dados da cidade
async function citySearch(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Cidade não encontrada.");
            } else {
                throw new Error("Ocorreu um erro ao buscar os dados do tempo.");
            }
        }

        const data = await response.json();
        putDataOnScreen(data);
    } catch (error) {
        console.error("Erro:", error.message);
        document.querySelector(".weather-info").style.display = "none"; // Esconde as informações do tempo
        document.querySelector(".error-message").style.display = "block"; // Mostra mensagem de erro
    }
}

// Evento de clique no botão de busca
document.querySelector(".search-button").addEventListener("click", () => {
    const city = document.querySelector(".input-city").value;
    if (city) {
        citySearch(city);
    } else {
        alert("Por favor, digite o nome de uma cidade.");
    }
});

// Evento de tecla 'Enter' no input
document.querySelector(".input-city").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = document.querySelector(".input-city").value;
        if (city) {
            citySearch(city);
        } else {
            alert("Por favor, digite o nome de uma cidade.");
        }
    }
});

// Carrega um valor inicial (opcional)
document.addEventListener("DOMContentLoaded", () => {
    citySearch("São Paulo");
});
