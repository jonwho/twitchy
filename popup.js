document.addEventListener('DOMContentLoaded', function() {
  // var checkPageButton = document.getElementById('checkPage');
  // checkPageButton.addEventListener('click', function() {
  //
  //   chrome.tabs.query({}, function(tab) {
      // chrome.tabs.create({ url: "https://www.google.com" });
  //   });
  // }, false);
  // setTimeout(function() {
    // document.getElementById("twitchPlayer").src = "https://player.twitch.tv/?channel=dreamhackcs&muted=true";
  // }, 15);
  setTimeout(function() {
    loadChannelsPage();
  }, 15);
}, false);

function loadChannelsPage() {
  var body = document.getElementsByTagName("body")[0];

  var header = document.createElement('div');
  header.id="searchHeader";

  body.appendChild(header);
}
