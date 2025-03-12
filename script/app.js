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
  const imageNumber = Math.floor(Math.random() * 23);
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

// TODO: cache feed in localStorage
function initRss() {
  $("#rss-card").append(`<p class='rss-title'>${feeds[0][0]}</p>`);
  $(".rss-title").click(rssFeed);

  rssFeed();

  if ($(window).width() > 768) {
    $("#rss-card").slimscroll({ height: "auto", width: "100%" });
  }
}

// TODO: move to own file and import in script tag
async function rssFeed() {
  // remove old feed if present
  $("#0").remove();
  // re-append id and loader to start animating
  $("#rss-card").append(`<div id='0'></div>`);
  $("#rss-card #0").append(`<div id='rss-feed-loader'>...</div>`);

  // jquery-plugins' feed proxy
  // @see https://jquery-plugins.net/feed-api#/Feed/get_load
  const PROXY_URL = "https://feed.jquery-plugins.net/load";
  const RSS_URL = "https://news.ycombinator.com/rss";
  const MAX_COUNT = 30;
  const DATE_CULTURE = "en-GB";
  const DATE_FORMAT = "dd-MM-yyyy";
  const OFFSET = 0;

  const params = new URLSearchParams();
  params.append("url", RSS_URL);
  params.append("maxCount", MAX_COUNT);
  const FEED_URL = new URL(PROXY_URL);
  FEED_URL.search = params.toString();

  try {
    const res = await fetch(FEED_URL);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const feed = await res.json();

    $("#rss-feed-loader").remove();
    $("#rss-card #0").append('<ul class="feedEkList" id="0"></ul>');

    for (let entry of feed.data) {
      const dt = new Date(entry.publishDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");
      const commentsHref = entry.description.match(/href="([^"]*)"/)[1];
      $("#rss-card #0 #0").append(
        `<li>
          <div class='rss-item-title'>
            <a href='${entry.link}' target='_blank'>${entry.title}</a>
          </div>
          <div class='rss-item-info'>
            <a href='${commentsHref}' target='_blank'>Comments</a>
            <div class='rss-spacer'>—</div>
            <div>${dt}</div>
          </div>
        </li>`
      )
    };

  } catch (e) {
    console.error(e.message);
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
  const now = new Date();
  let h = now.getHours();
  const timeOfDay =
    h < 12 ? "morning" : h >= 12 && h < 19 ? "afternoon" : "evening";

  $(".time-hours").html(`${now.toLocaleTimeString("en-GB")}`);
  $(".date-day").html(`${now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}`);

  $(".greetings-title").html(`Good ${timeOfDay},`);

  // update every half a second to not miss a second
  setTimeout(initClock, 500);
}

$(document).ready(function () {
  init();
});
