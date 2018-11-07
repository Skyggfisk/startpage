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
initRss();
initQuote();
initBookmarks();

function initTitle() {
  var r = Math.round(Math.random() * (titles.length - 1));
  $("title").html(titles[r]);
  $("#logo-text").html(titles[r]);
}

function initGreetings() {
  $(".greetings .greetings-name").html(user);
}

function initRss() {
  $(feeds).each(function(index, feed) {
    $("#rss-card").append(`<p class="rss-title">${feed[0]}</p>`);
    $("#rss-card").append("<div id='" + index + "'></div");
    $("#rss-card #" + index).FeedEk({
      FeedUrl: feed[1],
      MaxCount: 5,
      ShowDesc: false,
      DateFormat: "DD.MM.YYYY",
      DateFormatLang: "en"
    });
  });
}

function initQuote() {
  var r = Math.round(Math.random() * (quotes.length - 1));
  var q = quotes[r];
  $(".quote-card").append(`<p class="quote-text">"${q[0]}"</p>`);
  $(".quote-card").append(`<p class="quote-author">-${q[1]}</p>`);
}

function initBookmarks() {
  var element = "";
  $(favorites).each(function(index, group) {
    element +=
      "" + '<div class="favorite">' + '<p class="title">' + group[0] + "</p>";
    "<ul>" +
      $(group[1]).each(function(index, favorite) {
        element +=
          "<li>" +
          "<span class='short'><a target='_blank' href='" +
          favorite[1] +
          "'>" +
          favorite[2] +
          "</a></span>" +
          "<span class='link'><a target='_blank' href='" +
          favorite[1] +
          "'>" +
          favorite[0] +
          "</a></span>" +
          "</li>";
      });
    element += "" + "</ul>" + "</div>";
  });
  $("#bookmarks-card").append(element);
}

function initWeather() {
  $.simpleWeather({
    zipcode: "",
    woeid: locations[0],
    location: "",
    unit: "c",
    success: function(weather) {
      $(".weather-location").html(`${weather.city}, ${weather.region}`);
      $(".weather-icon").html(`<i class="wi wi-yahoo-${weather.code}"></i>`);
      $(".weather-temperature").html(
        `${weather.temp}&deg${weather.units.temp}`
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

  $(".time-hours").html(`${h}:${m}:${s}`);
  $(".date-day").html(`${dd}.${mm}.${yyyy}`);

  if (h < 12) {
    $(".greetings-title").html("good morning");
  } else if (h >= 12 && h < 19) {
    $(".greetings-title").html("good afternoon");
  } else {
    $(".greetings-title").html("good evening");
  }

  var t = setTimeout(initClock, 500);
}

$(document).ready(function() {
  init();
});
