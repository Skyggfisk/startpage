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