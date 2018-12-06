var user = "skyggfisk";

var locations = ["551890"];

var titles = [
  "Soothing shadows",
  "Oathbound",
  "Grab a cuppa",
  "Go for a run",
  "Hey you, check your posture",
  "Give me 10 push-ups!",
  "The ride never ends."
];

var quotes = [
  [
    "Tradition is not the worship of ashes, but the preservation of fire.",
    "Gustav Mahler"
  ],
  [
    "Man cannot remake himself without suffering, for he is both the marble and the sculptor",
    "Alexis Carrel"
  ],
  ["Only the dead have seen the end of war.", "Plato"],
  ["It is no bad thing celebrating a simple life.", "J. R. R. Tolkien"],
  [
    "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    "Nikola Tesla"
  ],
  [
    "What is really needed is not to toss back and forth in a bed of agony, but to awaken and get up.",
    "Julius Evola"
  ]
];

var images = [
  "1412446496031.jpg",
  "1417804954510.jpg",
  "1422771896804.jpg",
  "1424655132831.jpg",
  "1425939966695.jpg",
  "1429482830109.jpg",
  "1429569823779.jpg",
  "1437167260211.jpg",
  "1437214448937.jpg",
  "1437214448937.jpg",
  "1444816416285.jpg",
  "1444827390885.jpg",
  "1444827771939.jpg",
  "1445223016379.jpg",
  "1445223050369.jpg",
  "1445370353275.jpg",
  "1445705808951.jpg",
  "1445713184723.jpg",
  "1448399280112.jpg",
  "1450066383293.jpg",
  "1450074394745.jpg",
  "0haum1tq.3ki.jpg",
  "0i2juqcc.eol.png",
  "0nqqkrjj.2wj.png",
  "0uhu4o25.5il.jpg",
  "10ct1mxg.oxr.jpg",
  "12evpdb0.dc1.jpg",
  "1a0i4lxe.v3a.jpg",
  "1yjtwgao.njm.jpg",
  "2opwwyb4.pfm.jpg",
  "2syjtlak.2q5.jpg",
  "3glxtjpx.qc3.jpg",
  "3gsava33.v4a.jpg",
  "3hd5uuqs.qhi.jpg",
  "3pv1g2wi.vwl.jpg",
  "3txenezn.xed.jpg",
  "4vy4rzp5.202.png",
  "51yqz5u3.ufa.jpg",
  "5emri5rn.dbj.jpg",
  "ano1kodq.1pp.jpg",
  "b5jvr1ol.anf.jpg",
  "c2w0xrmh.isx.jpg",
  "c5xyrykv.voz.jpg",
  "cohelpgq.y0n.jpg",
  "coqvmsj4.xnd.jpg",
  "d5pbm5xf.a0m.jpg",
  "einxqmmo.mbi.jpg",
  "etq0jicl.agn.jpg",
  "f223cck2.s2m.jpg",
  "fhcpdvdq.3re.jpg",
  "fhl4hurc.fw3.jpg",
  "fiejjhy2.qrv.jpg",
  "fsbdvogo.cre.jpg",
  "fuysta5e.dl0.jpg",
  "h3xnsnlo.qq0.jpg",
  "hnjfr551.axw.jpg",
  "horyznxq.dxe.jpg",
  "hygasxqy.nko.jpg",
  "iifjjq3j.vtw.jpg",
  "itl3c1nr.ns2.jpg",
  "j01uvqmq.4ti.jpg",
  "jnuf0eee.j0d.jpg",
  "nk22fubt.2ez.jpg",
  "omdrqwqb.zlk.jpg",
  "oodhysnz.jkr.jpg",
  "p1fnt0y5.xua.jpg",
  "phvquqyy.5mr.jpg",
  "qa04w55v.a0q.jpg",
  "qi1r3uq4.szz.jpg",
  "qufm4luw.4dq.jpg",
  "s44qat0v.0fw.jpg",
  "tk5ph2xp.mvj.jpg",
  "y0tzxbqa.mff.jpg",
  "ygohqpkx.atq.jpg",
  "yttfdlfa.lyu.jpg",
  "zmuvzmge.ole.jpg",
  "zsfoouda.jm5.jpg"
];
var feeds = [
  ["Hacker news", "https://news.ycombinator.com/rss"],
  ["Version2", "https://www.version2.dk/it-nyheder/rss"],
  ["tv2", "https://feeds.tv2.dk/nyhederne_seneste/rss"]
];

var favorites = [
  [
    "Work",
    [
      ["gmail", "https://mail.google.com/mail/u/0/#inbox", "gm"],
      ["hotmail", "https://login.live.com/", "hm"],
      ["github", "https://github.com/", "gh"],
      ["bitbucket", "http://bitbucket.org", "bb"],
      ["calendar", "https://calendar.google.com/calendar/r", "gc"]
    ]
  ],
  [
    "Social",
    [
      ["facebook", "https://www.facebook.com/", "fb"],
      ["youtube", "https://www.youtube.com/", "yt"],
      ["twitch", "https://www.twitch.tv/", "ttv"],
      ["twitter", "https://twitter.com/", "twi"]
    ]
  ],
  [
    "Music",
    [
      ["bandcamp", "https://www.bandcamp.com/", "bc"],
      ["soundcloud", "http://www.https://soundcloud.com/", "sc"]
    ]
  ],
  [
    "Reddit",
    [
      ["frontpage", "https://www.reddit.com/", "fp"],
      ["4chan", "https://www.reddit.com/r/4chan/", "4ch"],
      ["world news", "https://www.reddit.com/r/worldnews/", "wn"],
      ["programmer humor", "https://www.reddit.com/r/ProgrammerHumor/", "ph"]
    ]
  ],
  [
    "4chan",
    [
      ["home", "http://4chan.org/", "/"],
      ["politics", "https://boards.4chan.org/pol/catalog", "/pol/"],
      ["wallpaper", "http://4chan.org/wg/catalog", "/wg/"],
      ["technology", "http://4chan.org/g/catalog", "/g/"]
    ]
  ],
  [
    "Others",
    [
      ["amazon", "https://www.amazon.com/", "amz"],
      ["graphic", "https://graphicburger.com/", "gb"],
      ["gutenberg", "https://www.gutenberg.org/", "pg"],
      ["rainy mood", "https://rainymood.com/", "rm"]
    ]
  ]
];
