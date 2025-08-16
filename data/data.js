const default_user = {
  userName: "Skyggfisk",
  dateTime: {
    clockFormat: "24-hour",
    dateFormat: "dd-mm-yyyy"
  }
};

const default_locations = ["551890"];

const default_titles = [
  "Grab a cuppa",
  "Go for a run",
  "Hey you! Check your posture!",
  "Give me 10 push-ups!",
  "The quest never ends",
];

const default_feeds = [
  ["Hacker news", "https://news.ycombinator.com/rss"],
  ["Version2", "https://www.version2.dk/it-nyheder/rss"],
  ["tv2", "https://feeds.tv2.dk/nyhederne_seneste/rss"],
];

const default_quotes = [
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

// TODO: clean up favorites, 4ch especially is nsfw again :s
const default_favorites = [
  {
    title: "Work",
    links: [
      {
        name: "gmail",
        shortName: "gm",
        link: "https://mail.google.com/",
      },
      {
        name: "calendar",
        shortName: "gc",
        link: "https://calendar.google.com/",
      },
      {
        name: "github",
        shortName: "gh",
        link: "https://github.com/",
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
        name: "youtube",
        shortName: "yt",
        link: "https://www.youtube.com/",
      },
      {
        name: "twitch",
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
        name: "chillhop radio",
        shortName: "ch",
        link: "https://chillhop.com/radio/",
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
        link: "https://www.reddit.com/r/all/",
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
      {
        name: "owls",
        shortName: "ow",
        link: "https://www.reddit.com/r/Owls",
      },
    ],
  },
  {
    title: "4chan",
    links: [
      {
        name: "technology",
        shortName: "/g/",
        link: "http://boards.4channel.org/g/catalog",
      },
      {
        name: "games",
        shortName: "/v/",
        link: "http://boards.4channel.org/v/catalog",
      },
    ],
  },
  {
    title: "Other",
    links: [
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
        link: "https://rainymood.com/",
      },
    ],
  },
];

const default_weather_config = {
  location: {
    name: 'Aarhus',
    country: 'Denmark',
    admin1: 'Central Jutland',
    coords: {
      lat: 56.1567,
      lon: 10.2108
    }
  },
  windSpeedUnit: 'ms',
  temperatureUnit: 'celsius'
};
