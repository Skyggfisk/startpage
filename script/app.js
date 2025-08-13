function init() {
  $(document).ready(setBackgroundImage);
  initStorage();
  initTitle();
  initQuote();
  initGreetings();
  initBookmarks();
  initClock();
  initRss();
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function setBackgroundImage() {
  const imageNumber = randomInt(3);
  $("body").css("background-image", `url(images/backgrounds/${imageNumber}.webp)`);
}

// Grab a random title and set it
function initTitle() {
  const titles = getStorageItem("titles");
  const r = randomInt(titles.length);
  $("title").html(titles[r]);
}

// Greet the user
function initGreetings() {
  const user = getStorageItem("user");
  $(".greetings .greetings-name").html(user);
}

function initRss() {
  const feeds = getStorageItem("feeds");
  $("#rss-card").append(`<p class='rss-title'>${feeds[0][0]}</p>`);
  $(".rss-title").click(refreshFeed);

  rssFeed();
};

// Grab a random quote and display it
function initQuote() {
  const quotes = getStorageItem("quotes");
  const r = randomInt(quotes.length);
  const { quote, author } = quotes[r];
  $(".quote-card").append(`<p class="quote-text">"${quote}"</p>`);
  $(".quote-card").append(`<p class="quote-author">-${author}</p>`);
  $(".quote-card").click(function () {
    const r = randomInt(quotes.length);
    const { quote, author } = quotes[r];

    $(".quote-text").text(`"${quote}"`);
    $(".quote-author").text(`-${author}`);
  });
}

function initBookmarks() {
  let favoritesElements = [];
  const favorites = getAllFavorites();

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
      <div class="favorite-header">
        <p class="title">${title}</p>
        <div class="favorite-controls">
          <button class="favorite-controls-edit-button" title="edit group">✎</button>
        </div>
      </div>
      <ul>${linksElements.join("") /* avoid comma separator */}</ul>
    </div>
  `;

    favoritesElements = [...favoritesElements, favoritesElement];
  }

  $("#bookmarks-card").append(favoritesElements);

  // TODO: add a drafting element for new bookmarks, set a temp name and save new group
  // on 'enter', if draft input blurs with no input value, remove draft and do not save
  // the new group.
  // Easier alternative add an editing modal, create a placeholder and update the whole thing in one go.
  // Require using delete button in editing modal to remove the group.
  // $("#bookmarks-add-button").click(function () {
  //   $("#bookmarks-card").append(`
  //   <div class="favorite">
  //     <p class="title">New group</p>
  //     <ul>
  //       <li>
  //         <span class="link">
  //           <a target="_blank" href="#">New link</a>
  //         </span>
  //       </li>
  //     </ul>
  //   </div>
  //   `)
  // });
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
