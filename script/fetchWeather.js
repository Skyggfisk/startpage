// weather settings modal     
$(document).ready(function () {
    const modal = $('#weather-settings-modal');
    const settingsBtn = $('#weather-settings-button');
    const closeBtn = $('#weather-settings-close');
    const applyBtn = $('#weather-settings-apply');
    const locationSearch = $('#location-search');
    const locationResults = $('#location-results');
    const windSpeedUnitSelect = $('#wind-speed-unit');
    const temperatureUnitSelect = $('#temperature-unit');

    // load existing settings
    function loadSettings() {
        const weatherConfig = localStorage.getItem('weather_config');
        if (weatherConfig) {
            const { location, windSpeedUnit, temperatureUnit } = JSON.parse(weatherConfig);
            locationSearch.val(`${location.name}, ${location.country}, ${location.admin1}`).data('location', {
                ...location,
                longitude: location.coords.lon,
                latitude: location.coords.lat
            });
            windSpeedUnitSelect.val(windSpeedUnit);
            temperatureUnitSelect.val(temperatureUnit);
        }
    }

    // store previous value and handle focus/blur
    let previousValue = '';
    locationSearch
        .on('focus', function () {
            // store the current value and select all text
            previousValue = $(this).val();
            $(this)[0].select();
        })
        .on('blur', function () {
            // if the value changed but no new location was selected, restore previous value
            setTimeout(() => {
                const currentVal = $(this).val().trim();
                if (currentVal !== previousValue && $(this).data('location')) {
                    $(this).val(previousValue);
                }
            }, 200); // small delay to allow click handlers to fire first
        });

    // add debounced search function
    let searchTimeout;
    locationSearch.on('input', function () {
        clearTimeout(searchTimeout);
        const query = $(this).val().trim();

        if (query.length < 2) {
            locationResults.hide();
            return;
        }

        searchTimeout = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`
                );
                const data = await response.json();

                if (data.results?.length > 0) {
                    locationResults.empty();
                    data.results.forEach(result => {
                        const locationName = `${result.name}, ${result.country}${result.admin1 ? `, ${result.admin1}` : ''}`;
                        const div = $('<div>').text(locationName).click(() => {
                            previousValue = locationName; // Update previous value when new location is selected
                            locationSearch.val(locationName).data('location', { ...result });
                            locationResults.hide();
                        });
                        locationResults.append(div);
                    });
                    locationResults.show();
                }
            } catch (error) {
                console.error('Error searching locations:', error);
            }
        }, 500);
    });

    // hide location results when clicking outside
    $(document).click(function (event) {
        if (!$(event.target).closest('#location-search, #location-results').length) {
            locationResults.hide();
        }
    });

    // open modal
    settingsBtn.click(function () {
        loadSettings();
        modal.css('display', 'block');
    });

    // close modal when clicking X or outside
    closeBtn.click(function () {
        modal.css('display', 'none');
    });

    $(window).click(function (event) {
        if (event.target === modal[0]) {
            modal.css('display', 'none');
        }
    });

    // save settings
    applyBtn.click(function () {
        const { location } = locationSearch.data();
        const windSpeedUnit = windSpeedUnitSelect.val();
        const temperatureUnit = temperatureUnitSelect.val();

        if (windSpeedUnit && temperatureUnit && location) {
            const settings = {
                location: {
                    name: location.name,
                    country: location.country,
                    admin1: location.admin1,
                    coords: {
                        lat: location.latitude,
                        lon: location.longitude
                    }
                },
                windSpeedUnit,
                temperatureUnit
            };
            localStorage.setItem('weather_config', JSON.stringify(settings));
            modal.css('display', 'none');
            // refresh weather data with new settings
            refreshWeather();
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

    // get settings from localStorage or use defaults
    const weatherConfig = localStorage.getItem('weather_config');
    const { location, windSpeedUnit, temperatureUnit } = JSON.parse(weatherConfig);

    const params = {
        "latitude": location.coords.lat,
        "longitude": location.coords.lon,
        "current": [
            "temperature_2m",
            "weather_code",
            "wind_speed_10m"
        ],
        "timezone": "Europe/Copenhagen",
        "wind_speed_unit": windSpeedUnit,
        "temperature_unit": temperatureUnit
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

        const { location } = JSON.parse(localStorage.getItem('weather_config'));
        const weatherIcon = mapWMOToOWMAndDescription(weatherData.current.weather_code);
        $("#weather-card").html(
            `<div class="weather-card-location">
                <h1 class="weather-card-location-sub">Weather in</h1>
                <h1 class="weather-card-location-name">${location.name}, ${location.country}</h1>
            </div>
            <div id="weather-card-main">
                <h1 class="weather-card-title">
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
                </div>
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