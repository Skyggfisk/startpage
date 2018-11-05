// Sets background image using backstretch
function init() {
  $("body").backstretch(
    "images/" + images[Math.round(Math.random() * (images.length - 1))],
    { fade: 300 }
  );
}

// call all functions
initGreetings();
initClock();
initTitle();
initWeather();

function initTitle() {
  var r = Math.round(Math.random() * (titles.length - 1));
  $("title").html(titles[r]);
  $("#logo-text").html(titles[r]);
}

function initGreetings() {
  $(".greetings .greetings-name").html(user);
}

function initWeather() {
  $.simpleWeather({
    zipcode: "",
    woeid: locations[0],
    location: "",
    unit: "c",
    success: function(weather) {
      $(".weather-location").html(`${weather.city}, ${weather.region}`);
      $(".weather-icon").html(setWeatherIcon(weather.code));
      $(".weather-temperature").html(
        `${weather.temp} &deg ${weather.units.temp}`
      );
      $(".weather-description").html(`${weather.currently}`);
    },
    error: function(error) {
      $(".weather-location").html(`<p>${error}</p>`);
    }
  });
}

function initClock() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  $(".time-hours").html(h);
  $(".time-minutes").html(m);
  $(".time-seconds").html(s);
  $(".date-day").html(dd);
  $(".date-month").html(mm);
  $(".date-year").html(yyyy);

  if (h < 12) {
    $(".greetings-title").html("good morning");
  } else if (h >= 12 && h < 19) {
    $(".greetings-title").html("good afternoon");
  } else {
    $(".greetings-title").html("good evening");
  }

  var t = setTimeout(initClock, 500);
}

function setWeatherIcon(condid) {
  var icon = "";
  switch (condid) {
    case "0":
      icon = "wi-tornado";
      break;
    case "1":
      icon = "wi-storm-showers";
      break;
    case "2":
      icon = "wi-tornado";
      break;
    case "3":
      icon = "wi-thunderstorm";
      break;
    case "4":
      icon = "wi-thunderstorm";
      break;
    case "5":
      icon = "wi-snow";
      break;
    case "6":
      icon = "wi-rain-mix";
      break;
    case "7":
      icon = "wi-rain-mix";
      break;
    case "8":
      icon = "wi-sprinkle";
      break;
    case "9":
      icon = "wi-sprinkle";
      break;
    case "10":
      icon = "wi-hail";
      break;
    case "11":
      icon = "wi-showers";
      break;
    case "12":
      icon = "wi-showers";
      break;
    case "13":
      icon = "wi-snow";
      break;
    case "14":
      icon = "wi-storm-showers";
      break;
    case "15":
      icon = "wi-snow";
      break;
    case "16":
      icon = "wi-snow";
      break;
    case "17":
      icon = "wi-hail";
      break;
    case "18":
      icon = "wi-hail";
      break;
    case "19":
      icon = "wi-cloudy-gusts";
      break;
    case "20":
      icon = "wi-fog";
      break;
    case "21":
      icon = "wi-fog";
      break;
    case "22":
      icon = "wi-fog";
      break;
    case "23":
      icon = "wi-cloudy-gusts";
      break;
    case "24":
      icon = "wi-cloudy-windy";
      break;
    case "25":
      icon = "wi-thermometer";
      break;
    case "26":
      icon = "wi-cloudy";
      break;
    case "27":
      icon = "wi-night-cloudy";
      break;
    case "28":
      icon = "wi-day-cloudy";
      break;
    case "29":
      icon = "wi-night-cloudy";
      break;
    case "30":
      icon = "wi-day-cloudy";
      break;
    case "31":
      icon = "wi-night-clear";
      break;
    case "32":
      icon = "wi-day-sunny";
      break;
    case "33":
      icon = "wi-night-clear";
      break;
    case "34":
      icon = "wi-day-sunny-overcast";
      break;
    case "35":
      icon = "wi-hail";
      break;
    case "36":
      icon = "wi-day-sunny";
      break;
    case "37":
      icon = "wi-thunderstorm";
      break;
    case "38":
      icon = "wi-thunderstorm";
      break;
    case "39":
      icon = "wi-thunderstorm";
      break;
    case "40":
      icon = "wi-storm-showers";
      break;
    case "41":
      icon = "wi-snow";
      break;
    case "42":
      icon = "wi-snow";
      break;
    case "43":
      icon = "wi-snow";
      break;
    case "44":
      icon = "wi-cloudy";
      break;
    case "45":
      icon = "wi-lightning";
      break;
    case "46":
      icon = "wi-snow";
      break;
    case "47":
      icon = "wi-thunderstorm";
      break;
    case "3200":
      icon = "wi-cloud";
      break;
    default:
      icon = "wi-cloud";
      break;
  }

  return '<i class="wi ' + icon + '"></i>';
}

// On document ready run our functions
$(document).ready(function() {
  init();
});
