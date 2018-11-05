// Sets background image using backstretch
function init() {
  $("body").backstretch(
    "images/" + images[Math.round(Math.random() * (images.length - 1))],
    { fade: 300 }
  );
}

$(document).ready(function() {
  init();
});
