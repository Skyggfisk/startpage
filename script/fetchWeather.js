// Weather settings modal functionality
$(document).ready(function () {
    const modal = $('#weather-settings-modal');
    const settingsBtn = $('#weather-settings-button');
    const closeBtn = $('.modal-close');
    const applyBtn = $('#weather-settings-apply');

    // Load existing settings
    function loadSettings() {
        const settings = localStorage.getItem('weather_config');
        if (settings) {
            const { lat, lon } = JSON.parse(settings);
            $('#latitude').val(lat);
            $('#longitude').val(lon);
        }
    }

    // Open modal
    settingsBtn.click(function () {
        loadSettings();
        modal.css('display', 'block');
    });

    // Close modal when clicking X or outside
    closeBtn.click(function () {
        modal.css('display', 'none');
    });

    $(window).click(function (event) {
        if (event.target === modal[0]) {
            modal.css('display', 'none');
        }
    });

    // Save settings
    applyBtn.click(function () {
        const lat = $('#latitude').val();
        const lon = $('#longitude').val();

        if (lat && lon) {
            const settings = { lat, lon };
            localStorage.setItem('weather_config', JSON.stringify(settings));
            modal.css('display', 'none');
            // Refresh weather data with new coordinates
            fetchWeather();
        }
    });
});

function getWeatherCache() {
    const cache = localStorage.getItem('weather_data');
    if (!cache) return null;

    const { timestamp, data } = JSON.parse(cache);
    const fifteenMinutes = 15 * 60 * 1000;

    if (Date.now() - timestamp > fifteenMinutes) {
        localStorage.removeItem('weather_data');
        return null;
    }

    return data;
}

function cacheWeatherData(weatherData) {
    const cache = {
        timestamp: Date.now(),
        data: weatherData
    };
    localStorage.setItem('weather_data', JSON.stringify(cache));
}

async function fetchFreshWeatherData() {
    const openMeteoV1 = "https://api.open-meteo.com/v1/forecast?";

    // TODO: Add all params with defaults to data.js, including units
    // load from defaults to localStorage from data.js, if not already set
    // add param options to the settings modal
    const defaultCoords = {
        lat: 56.1567,
        lon: 10.2108
    };

    // Get coordinates from localStorage or use defaults
    const weatherConfig = localStorage.getItem('weather_config');
    const { lat, lon } = weatherConfig ? JSON.parse(weatherConfig) : defaultCoords;

    const params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "temperature_2m",
            "is_day",
            "precipitation",
            "rain",
            "showers",
            "snowfall",
            "weather_code",
            "wind_speed_10m"
        ],
        "timezone": "Europe/Copenhagen",
        "wind_speed_unit": "ms"
    };

    const weatherURL = openMeteoV1 + new URLSearchParams({
        ...params,
        current: params.current.join(","),
    }).toString();

    const response = await fetch(weatherURL);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const weatherData = await response.json();
    cacheWeatherData(weatherData);
    return weatherData;

}

async function fetchWeather() {
    $("#weather-card").html(`<div id='weather-loader'>...</div>`);
    try {
        // check cache first
        const cachedData = getWeatherCache();
        let weatherData;

        if (cachedData) {
            weatherData = cachedData;
        } else {
            weatherData = await fetchFreshWeatherData();
        }

        const weatherIcon = mapWMOToOWMAndDescription(weatherData.current.weather_code);
        $("#weather-card").html(
            `<h1 class="weather-card-title">
                <i class="wi wi-owm-${weatherIcon.owmCode}" title="${weatherIcon.description}"></i>
            </h1>
            <div class="weather-card-details">
                <p>
                    <i class="wi wi-thermometer"></i> 
                    ${weatherData.current.temperature_2m}${weatherData.current_units.temperature_2m}
                </p>
                <p>
                    <i class="wi wi-strong-wind"></i>
                    ${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}
                </p>
            </div>`
        );

    } catch (error) {
        console.error("Error fetching weather data:", error);
        $("#weather-card").html(`<p>Error fetching weather data.</p>`);
    }
}

// approximately map WMO (Open-Meteo) codes to OWM (OpenWeatherMap) codes
function mapWMOToOWMAndDescription(wmoCode) {
    const codeMap = {
        0: { owmCode: 800, description: "Clear sky" },
        1: { owmCode: 801, description: "Few clouds" },
        2: { owmCode: 802, description: "Scattered clouds" },
        3: { owmCode: 804, description: "Overcast clouds" },
        45: { owmCode: 741, description: "Fog" },
        48: { owmCode: 741, description: "Fog" },
        51: { owmCode: 300, description: "Light drizzle" },
        53: { owmCode: 301, description: "Drizzle" },
        55: { owmCode: 302, description: "Heavy drizzle" },
        61: { owmCode: 500, description: "Light rain" },
        63: { owmCode: 501, description: "Moderate rain" },
        65: { owmCode: 502, description: "Heavy rain" },
        71: { owmCode: 600, description: "Light snow" },
        73: { owmCode: 601, description: "Snow" },
        75: { owmCode: 602, description: "Heavy snow" },
        77: { owmCode: 611, description: "Sleet" },
        80: { owmCode: 520, description: "Light shower rain" },
        81: { owmCode: 521, description: "Shower rain" },
        82: { owmCode: 522, description: "Heavy shower rain" },
        85: { owmCode: 620, description: "Light shower snow" },
        86: { owmCode: 621, description: "Shower snow" },
        95: { owmCode: 200, description: "Thunderstorm with light rain" },
        96: { owmCode: 201, description: "Thunderstorm with rain" },
        99: { owmCode: 202, description: "Thunderstorm with heavy rain" },
    };

    return codeMap[wmoCode] || 800; // default to clear sky if code not found
}

async function refreshWeather() {
    localStorage.removeItem('weather_data');
    await fetchWeather();
}