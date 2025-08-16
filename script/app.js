function init() {
  $(document).ready(setBackgroundImage);
  initStorage();
  initWeather();
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
  // set up the user settings modal
  const userSettingsModal = $("#user-settings-modal");
  const userSettingsBtn = $("#owl-settings-button");
  const closeUserSettingsBtn = $("#close-user-settings-button");
  const userNameInput = $("#user-name");
  const applyUserSettingsBtn = $("#apply-user-settings-button");
  const clockFormatSelect = $("#clock-format");
  const dateFormatSelect = $("#date-format");
  const { userName, dateTime: { clockFormat, dateFormat } } = getStorageItem("user");

  userSettingsBtn.click(function () {
    userSettingsModal.css("display", "block");
  });

  closeUserSettingsBtn.click(function () {
    userSettingsModal.css("display", "none");
  });

  $(window).click(function (event) {
    if (event.target === userSettingsModal[0]) {
      userSettingsModal.css("display", "none");
    }
  });

  applyUserSettingsBtn.click(function () {
    const userName = userNameInput.val();
    userSettingsModal.css("display", "none");
    updateStorageItem("user", {
      userName, dateTime: {
        clockFormat: clockFormatSelect.val(),
        dateFormat: dateFormatSelect.val()
      }
    });
    $(".greetings .greetings-name").html(userName);
    initClock(); // restart the clock
  });

  userNameInput
    .on('focus', function () {
      userNameInput.select();
    })
    .on('blur', function () {
      if (userNameInput.val().trim() === "") {
        userNameInput.val(userName);
      }
    });

  // initial setup
  userNameInput.val(userName);
  clockFormatSelect.val(clockFormat);
  dateFormatSelect.val(dateFormat);
  $(".greetings .greetings-name").html(userName);
}

function initRss() {
  const feeds = getStorageItem("feeds");
  $("#rss-card").append(`<p class='rss-title'>${feeds[0][0]}</p>`);
  $(".rss-title").click(refreshFeed);

  rssFeed();
};

// Initialize quotes card functionality
function initQuote() {
  const quoteSettingsModal = $("#quote-settings-modal");
  const quoteSettingsBtn = $("#quote-settings-button");
  const closeQuoteSettingsBtn = $("#close-quote-settings-button");
  const addQuoteBtn = $("#add-quote-button");
  const applyQuoteSettingsBtn = $("#apply-quote-settings-button");
  const newQuoteInput = $("#new-quote");
  const newAuthorInput = $("#new-author");
  let tempQuotes = [];

  function displayQuote() {
    const quotes = getStorageItem("quotes");
    const r = randomInt(quotes.length);
    const { quote, author } = quotes[r];
    $(".quote-card").empty();
    $(".quote-card").append(`<p class="quote-text">"${quote}"</p>`);
    $(".quote-card").append(`<p class="quote-author">-${author}</p>`);
  }

  function updateQuotesList() {
    const quotesList = $("#quotes-list");
    quotesList.empty();

    tempQuotes.forEach((q, index) => {
      quotesList.append(`
        <div class="quote-item">
          <p class="quote-item-text">"${q.quote}"</p>
          <p class="quote-item-author">-${q.author}</p>
          <button class="delete-quote" data-index="${index}">&times;</button>
        </div>
      `);
    });

    $(".delete-quote").click(function () {
      const index = $(this).data("index");
      tempQuotes.splice(index, 1);
      updateQuotesList();
    });
  }

  quoteSettingsBtn.click(function () {
    tempQuotes = JSON.parse(JSON.stringify(getStorageItem("quotes")));
    updateQuotesList();
    quoteSettingsModal.css("display", "block");
  });

  closeQuoteSettingsBtn.click(function () {
    quoteSettingsModal.css("display", "none");
  });

  $(window).click(function (event) {
    if (event.target === quoteSettingsModal[0]) {
      quoteSettingsModal.css("display", "none");
    }
  });

  addQuoteBtn.click(function () {
    const quote = newQuoteInput.val().trim();
    const author = newAuthorInput.val().trim();

    if (quote && author) {
      tempQuotes.push({ quote, author });
      updateQuotesList();
      newQuoteInput.val("");
      newAuthorInput.val("");
    }
  });

  applyQuoteSettingsBtn.click(function () {
    updateStorageItem("quotes", tempQuotes);
    quoteSettingsModal.css("display", "none");
    displayQuote();
  });

  displayQuote();
  $(".quote-card").click(function () {
    const quotes = getStorageItem("quotes");
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
let clockTimer = null;

function stopClock() {
  if (clockTimer) {
    clearTimeout(clockTimer);
    clockTimer = null;
  }
}

function updateClock() {
  const { dateTime: { clockFormat, dateFormat } } = getStorageItem("user");
  const now = new Date();
  let h = now.getHours();
  const timeOfDay =
    h < 12 ? "morning" : h >= 12 && h < 19 ? "afternoon" : "evening";

  $(".time-hours").html(`${now.toLocaleTimeString(clockFormat === "12-hour" ? "en-US" : "en-GB")}`);
  $(".date-day").html(`${now.toLocaleDateString(dateFormat === "mm-dd-yyyy" ? "en-US" : "en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}`);

  $(".greetings-title").html(`Good ${timeOfDay},`);
}

function initClock() {
  // stop any existing clock timer
  stopClock();

  // update immediately
  updateClock();

  clockTimer = setTimeout(function tick() {
    updateClock();
    clockTimer = setTimeout(tick, 500);
  }, 500);
}

function initWeather() {
  fetchWeather();
  $("#weather-refresh-button").click(refreshWeather);
}

$(document).ready(function () {
  init();
});
