// Replace 'YOUR_API_KEY_HERE' with your OpenWeather API key
const apiKey = '2baf16e7f4630f856ccb0e939dbf41ca';

// Event listener for the "Get Weather" button
document.getElementById('fetchWeatherBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// Function to fetch weather data from the OpenWeather API
function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
        fetchUVIndex(data.coord.lat, data.coord.lon); // Fetch UV index using coordinates
      } else {
        alert('City not found. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to display the weather data on the webpage
function displayWeather(data) {
  document.getElementById('cityName').innerText = `Weather in ${data.name}`;
  document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
  document.getElementById('visibility').innerText = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;
  
  // Convert sunrise and sunset from UNIX timestamp to readable time
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  document.getElementById('sunrise').innerText = `Sunrise: ${sunriseTime}`;
  document.getElementById('sunset').innerText = `Sunset: ${sunsetTime}`;

  // Make the weather result section visible
  document.getElementById('weatherResult').classList.remove('hidden');
}

// Function to fetch UV Index from OpenWeather API using coordinates
function fetchUVIndex(lat, lon) {
  const uvApiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(uvApiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('uvIndex').innerText = `UV Index: ${data.value}`;
    })
    .catch(error => {
      console.error('Error fetching UV index:', error);
    });
}
