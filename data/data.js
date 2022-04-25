const user = "Skyggfisk";

const locations = ["551890"];

const titles = [
  "Grab a cuppa",
  "Go for a run",
  "Hey you! Check your posture!",
  "Give me 10 push-ups!",
  "The quest never ends",
];

// const feeds = [
//   { title: "Hacker news", source: "https://news.ycombinator.com/rss" },
//   { title: "Version2", source: "https://www.version2.dk/it-nyheder/rss" },
//   { title: "tv2", source: "https://feeds.tv2.dk/nyhederne_seneste/rss" },
// ];

const feeds = [
  ["Hacker news", "https://news.ycombinator.com/rss"],
  ["Version2", "https://www.version2.dk/it-nyheder/rss"],
  ["tv2", "https://feeds.tv2.dk/nyhederne_seneste/rss"],
];

const quotes = [
  {
    quote:
      "Man cannot remake himself without suffering, for he is both the marble and the sculptor",
    author: "Alexis Carrel",
  },
  { quote: "Only the dead have seen the end of war.", author: "Plato" },
  {
    quote: "It is no bad thing celebrating a simple life.",
    author: "J. R. R. Tolkien",
  },
  {
    quote:
      "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    author: "Nikola Tesla",
  },
  {
    quote: "Truth can only be found in one place: the code.",
    author: "Robert C. Martin",
  },
  {
    quote:
      "For the human makers of things, the incompletenesses and inconsistencies of our ideas become clear only during implementation.",
    author: "Frederick P. Brooks, Jr.",
  },
  {
    quote:
      "You Can't Write Perfect Software. Did that hurt? It shouldn't. Accept it as an axiom of life. Embrace it. Celebrate it. Because perfect software doesn't exist.",
    author: "Andrew Hunt",
  },
];

const favorites = [
  {
    title: "Work",
    links: [
      {
        name: "gmail",
        shortName: "gm",
        link: "https://mail.google.com/",
      },
      {
        name: "github",
        shortName: "gh",
        link: "https://github.com/",
      },
      {
        name: "calendar",
        shortName: "gc",
        link: "https://calendar.google.com/",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        name: "facebook",
        shortName: "fb",
        link: "https://www.facebook.com/",
      },
      {
        name: "twitter",
        shortName: "twi",
        link: "https://www.twitter.com/",
      },
      {
        name: "youtube",
        shortName: "yt",
        link: "https://www.youtube.com/",
      },
      {
        name: "twich",
        shortName: "ttv",
        link: "https://www.twitch.tv/",
      },
    ],
  },
  {
    title: "Music",
    links: [
      {
        name: "spotify",
        shortName: "spf",
        link: "https://www.spotify.com/",
      },
      {
        name: "soundcloud",
        shortName: "sc",
        link: "https://www.soundcloud.com/",
      },
      {
        name: "bandcamp",
        shortName: "bc",
        link: "https://www.bandcamp.com/",
      },
    ],
  },
  {
    title: "Reddit",
    links: [
      {
        name: "frontpage",
        shortName: "fp",
        link: "https://www.reddit.com/",
      },
      {
        name: "denmark",
        shortName: "dk",
        link: "https://www.reddit.com/r/Denmark",
      },
      {
        name: "world news",
        shortName: "wn",
        link: "https://www.reddit.com/r/worldnews",
      },
    ],
  },
  {
    title: "4chan",
    links: [
      {
        name: "technology",
        shortName: "/g/",
        link: "http://boards.4channel.org/g/catalog/",
      },
      {
        name: "games",
        shortName: "/v/",
        link: "http://boards.4channel.org/v/catalog/",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        name: "amazon",
        shortName: "amz",
        link: "https://www.amazon.com/",
      },
      {
        name: "graphic burger",
        shortName: "gb",
        link: "https://graphicburger.com/",
      },
      {
        name: "gutenberg",
        shortName: "pg",
        link: "https://www.gutenberg.org/",
      },
      {
        name: "rainy mood",
        shortName: "rm",
        link: "https://www.gutenberg.org/",
      },
    ],
  },
];
