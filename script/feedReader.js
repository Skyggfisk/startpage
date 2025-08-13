function getFeedCache() {
  const cache = localStorage.getItem('rss_cache');
  if (!cache) return null;

  const { timestamp, data } = JSON.parse(cache);
  const fifteenMinutes = 15 * 60 * 1000;

  if (Date.now() - timestamp > fifteenMinutes) {
    localStorage.removeItem('rss_cache');
    return null;
  }

  return data;
}

function cacheFeed(feedData) {
  const cache = {
    timestamp: Date.now(),
    data: feedData
  };
  localStorage.setItem('rss_cache', JSON.stringify(cache));
}

async function fetchFreshFeed() {
  // jquery-plugins' feed proxy
  // @see https://jquery-plugins.net/feed-api#/Feed/get_load
  const PROXY_URL = "https://feed.jquery-plugins.net/load";
  const RSS_URL = "https://news.ycombinator.com/rss";
  const MAX_COUNT = 30;

  const params = new URLSearchParams();
  params.append("url", RSS_URL);
  params.append("maxCount", MAX_COUNT);
  const FEED_URL = new URL(PROXY_URL);
  FEED_URL.search = params.toString();

  const res = await fetch(FEED_URL);
  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  const feed = await res.json();
  cacheFeed(feed);
  return feed;
}


async function rssFeed() {
  // remove old feed if present, add loader
  $("#rss-items").remove();
  $("#rss-card").append(`<div id='rss-feed-loader'>...</div>`);

  // jquery-plugins' feed proxy
  // @see https://jquery-plugins.net/feed-api#/Feed/get_load
  const PROXY_URL = "https://feed.jquery-plugins.net/load";
  const RSS_URL = "https://news.ycombinator.com/rss";
  const MAX_COUNT = 30;
  // const DATE_CULTURE = "en-GB";
  // const DATE_FORMAT = "dd-MM-yyyy";
  // const OFFSET = 0;

  const params = new URLSearchParams();
  params.append("url", RSS_URL);
  params.append("maxCount", MAX_COUNT);
  const FEED_URL = new URL(PROXY_URL);
  FEED_URL.search = params.toString();

  try {
    // Check cache first
    const cachedFeed = getFeedCache();
    let feed;

    if (cachedFeed) {
      feed = cachedFeed;
    } else {
      feed = await fetchFreshFeed();
    }

    $("#rss-feed-loader").remove();
    $("#rss-card").append('<ul id="rss-items"></ul>');

    for (let entry of feed.data) {
      const dt = new Date(entry.publishDate).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-");
      const commentsHref = entry.description.match(/href="([^"]*)"/)[1];
      $("#rss-card ul").append(
        `<li>
            <div class='rss-item-title'>
              <a title="${entry.title}" href='${entry.link}' target='_blank'>${entry.title}</a>
            </div>
            <div class='rss-item-info'>
              <a href='${commentsHref}' target='_blank'>Comments</a>
              <div class='rss-spacer'>—</div>
              <div>${dt}</div>
            </div>
          </li>`
      )
    };

    // make sure we add the custom scrollbar
    addFeedScrollbar();

  } catch (e) {
    console.error(e.message);
  }
}

async function refreshFeed() {
  localStorage.removeItem('rss_cache');
  await rssFeed();
}

function addFeedScrollbar() {
  const $scrollContainer = $("#rss-card");

  if ($scrollContainer[0].scrollHeight > $scrollContainer[0].clientHeight) {
    $("#rss-scrollbar").remove();

    const $scrollbar = $("<div/>", { id: "rss-scrollbar" });
    const $thumb = $("<div/>", { id: "rss-scrollbar-thumb" });

    $scrollbar.append($thumb);
    $scrollbar.appendTo($scrollContainer.parent());

    function updateThumb() {
      const scrollRatio = $scrollContainer.height() / $scrollContainer[0].scrollHeight;
      const thumbHeight = Math.max(scrollRatio * 100, 10);
      $thumb.css("height", `${thumbHeight}%`);

      const scrollPercent = $scrollContainer.scrollTop() /
        ($scrollContainer[0].scrollHeight - $scrollContainer.height());
      const thumbTop = scrollPercent * ($scrollbar.height() - $thumb.height());
      $thumb.css("top", `${thumbTop}px`);
    }

    updateThumb();

    let isDragging = false;
    let startY, startTop;

    $thumb.on("mousedown", (e) => {
      isDragging = true;
      // keep scrollbar visible while dragging
      $scrollbar.addClass("dragging");
      startY = e.clientY;
      startTop = $thumb.position().top;
      // prevent random annoying text selection
      $("body").css("user-select", "none");
    });

    $(document).on("mousemove", (e) => {
      if (!isDragging) return;

      const delta = e.clientY - startY;
      const maxTop = $scrollbar.height() - $thumb.height();
      const newTop = Math.max(0, Math.min(startTop + delta, maxTop));

      const scrollPercent = newTop / maxTop;
      $scrollContainer.scrollTop(
        scrollPercent * ($scrollContainer[0].scrollHeight - $scrollContainer.height())
      );
    });

    $(document).on("mouseup", () => {
      isDragging = false;
      $scrollbar.removeClass("dragging");
      $("body").css("user-select", "");
    });

    $scrollContainer.on("scroll", updateThumb);
  }
}