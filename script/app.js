function init() {
  // Sets background image using backstretch
  $('body').backstretch(
    `images/backgrounds/${Math.floor(Math.random() * 44)}.jpg`,
    { fade: 300 }
  );

  // init all the things
  initTitle();
  initQuote();
  initGreetings();
  initBookmarks();
  initClock();
  // initWeather();
  initRss();
}

// Grab a random title and set it
function initTitle() {
  var r = Math.round(Math.random() * (titles.length - 1));
  $('title').html(titles[r]);
  $('#logo-text').html(titles[r]);
}

// Greet the user
function initGreetings() {
  $('.greetings .greetings-name').html(user);
}

// Create a feed for each in var.js
// TODO get for each feed in var
function initRss() {
  $('#rss-card').append(`<p class='rss-title'>${feeds[0][0]}</p>`);
  $('#rss-card').append(`<div id='0'></div>`);
  feednami.load(feeds[0][1]).then(feed => {
    console.log(feed);
    $('#rss-card #0').append('<ul class="feedEkList" id="0"></ul>');
    for (let entry of feed.entries) {
      let dt = moment(entry.pubDate).format('DD-MM-YYYY');
      $('#rss-card #0 #0').append(
        `<li>
          <div class='itemTitle'>
            <a href='${entry.link}' target='_blank'>${entry.title}</a>
          </div>
          <div class='itemDate'>${dt}</div>
        </li>`
      );
    }
  });

  if ($(window).width() > 768) {
    $('#rss-card').slimscroll({ height: '800px' });
  }
}

// Grab a random quote and display it
function initQuote() {
  var r = Math.round(Math.random() * (quotes.length - 1));
  var q = quotes[r];
  $('.quote-card').append(`<p class="quote-text">"${q[0]}"</p>`);
  $('.quote-card').append(`<p class="quote-author">-${q[1]}</p>`);
}

// Create a favorite div for each in var.js and display
function initBookmarks() {
  var element = '';
  $(favorites).each(function(index, group) {
    element +=
      '' + '<div class="favorite">' + '<p class="title">' + group[0] + '</p>';
    '<ul>' +
      $(group[1]).each(function(index, favorite) {
        element +=
          '<li>' +
          "<span class='short'><a target='_blank' href='" +
          favorite[1] +
          "'>" +
          favorite[2] +
          '</a></span>' +
          "<span class='link'><a target='_blank' href='" +
          favorite[1] +
          "'>" +
          favorite[0] +
          '</a></span>' +
          '</li>';
      });
    element += '' + '</ul>' + '</div>';
  });
  $('#bookmarks-card').append(element);
}

// jQuery simpleWeather and display it on success, else display error
function initWeather() {
  $.simpleWeather({
    zipcode: '',
    woeid: locations[0],
    location: '',
    unit: 'c',
    success: function(weather) {
      $('.weather-location').html(`${weather.city}, ${weather.region}`);
      $('.weather-icon').html(`<i class="wi wi-yahoo-${weather.code}"></i>`);
      $('.weather-temperature').html(
        `${weather.temp}&deg${weather.units.temp}`
      );
      $('.weather-description').html(`${weather.currently}`);
    },
    error: function(error) {
      $('.weather-location').html(`<p>${error}</p>`);
    }
  });
}

// Create the clock, display date and time and greet based on time of day
function initClock() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  if (s < 10) s = '0' + s;

  $('.time-hours').html(`${h}:${m}:${s}`);
  $('.date-day').html(`${dd}.${mm}.${yyyy}`);

  if (h < 12) {
    $('.greetings-title').html('good morning');
  } else if (h >= 12 && h < 19) {
    $('.greetings-title').html('good afternoon');
  } else {
    $('.greetings-title').html('good evening');
  }

  var t = setTimeout(initClock, 500);
}

$(document).ready(function() {
  init();
});
