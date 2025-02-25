function init() {
  $(document).ready(setBackgroundImage);
  initTitle();
  initQuote();
  initGreetings();
  initBookmarks();
  initClock();
  initRss();
}

function setBackgroundImage() {
  const imageNumber = Math.floor(Math.random() * 24);
  $("body").css("background-image", `url(images/backgrounds/${imageNumber}.webp)`);
}

// Grab a random title and set it
function initTitle() {
  const r = Math.round(Math.random() * (titles.length - 1));
  $("title").html(titles[r]);
}

// Greet the user
function initGreetings() {
  $(".greetings .greetings-name").html(user);
}

// Create a feed for each in var.js
// TODO: cache feed in localStorage
function initRss() {
  $("#rss-card").append(`<p class='rss-title'>${feeds[0][0]}</p>`);
  $("#rss-card").append(`<div id='0'></div>`);
  $("#rss-card #0").append(`<div id='rss-feed-loader'>...</div>`);
  feednami.load(feeds[0][1]).then((feed) => {
    $("#rss-feed-loader").remove();
    $("#rss-card #0").append('<ul class="feedEkList" id="0"></ul>');
    for (let entry of feed.entries) {
      let dt = new Date(entry.pubDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");
      $("#rss-card #0 #0").append(
        `<li>
          <div class='rss-item-title'>
            <a href='${entry.link}' target='_blank'>${entry.title}</a>
          </div>
          <div class='rss-item-info'>
            <a href='${entry.comments}' target='_blank'>Comments</a>
            <div class='rss-spacer'>—</div>
            <div>${dt}</div>
          </div>
        </li>`
      );
    }
  });

  if ($(window).width() > 768) {
    $("#rss-card").slimscroll({ height: "auto", width: "100%" });
  }
}

// Grab a random quote and display it
function initQuote() {
  const r = Math.round(Math.random() * (quotes.length - 1));
  const { quote, author } = quotes[r];
  $(".quote-card").append(`<p class="quote-text">"${quote}"</p>`);
  $(".quote-card").append(`<p class="quote-author">-${author}</p>`);
  $(".quote-card").click(function () {
    const r = Math.round(Math.random() * (quotes.length - 1));
    const { quote, author } = quotes[r];

    $(".quote-text").text(`"${quote}"`);
    $(".quote-author").text(`-${author}`);
  });
}

function initBookmarks() {
  let favoritesElements = [];

  for (const group of favorites) {
    const { title, links } = group;
    let linksElements = [];

    for (const favorite of links) {
      const { link, name } = favorite;

      const linksElement = `
        <li>
          <span class="link">
            <a target="_blank" href="${link}">${name}</a>
          </span>
        </li>
      `;

      linksElements = [...linksElements, linksElement];
    }

    const favoritesElement = `
    <div class="favorite">
      <p class="title">${title}</p>
      <ul>${linksElements.join("") /* avoid comma separator */}</ul>
    </div>
  `;

    favoritesElements = [...favoritesElements, favoritesElement];
  }

  $("#bookmarks-card").append(favoritesElements);
}

// TODO: Temporal hype?
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
// Create the clock, display date and time and greet based on time of day
function initClock() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  const timeOfDay =
    h < 12 ? "morning" : h >= 12 && h < 19 ? "afternoon" : "evening";

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  $(".time-hours").html(`${h}:${m}:${s}`);
  $(".date-day").html(`${dd}.${mm}.${yyyy}`);

  $(".greetings-title").html(`Good ${timeOfDay},`);

  var t = setTimeout(initClock, 500);
}

$(document).ready(function () {
  init();
});
