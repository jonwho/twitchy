var clientId = "3p02mzgz7bd8semst5y4s88u49ihr3";

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
    // var twitchPlayer = document.getElementById("twitchPlayer");
    // twitchPlayer.src = "https://player.twitch.tv/?channel=dreamhackcs&muted=true"
  }, 15);
}, false);

function loadChannelsPage() {
  var header = document.getElementById('header');
  var contentWindow = document.getElementById('contentWindow');

  var searchHeader = document.createElement('div');
  searchHeader.id="searchHeader";

  var searchBar = document.createElement('div');
  searchBar.id="searchBar";

  searchHeader.appendChild(searchBar);

  var games = loadGames();

  header.innerHTML = "";
  contentWindow.innerHTML = "";
  header.appendChild(searchHeader);
  contentWindow.appendChild(games);
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function loadGames() {
  var games = document.createElement('div');

  var url = "https://api.twitch.tv/kraken/games/top?limit=9&client_id=" + clientId;

  getJSON(url, function(err, data) {
    console.log("hello");
    for(var i = 0; i < data["top"].length; i++) {
      var game = document.createElement('div');

      game.style.width = '136px';
      game.style.height = '190px';
      game.style.marginLeft = '33px';
      game.style.marginTop = '33px';
      if(i > 6) {
        game.style.marginBottom = '33px';
      }
      game.style.float = 'left';
      game.style.backgroundImage = "url(" + data["top"][i]["game"]["box"]["medium"] + ")";
      game.data = data;
      game.index = i;
      game.addEventListener("click", loadChannels, false);
      console.log(data["top"][i]["game"]["box"]["medium"]);

      games.appendChild(game);
    }
  })

  return games;
}

function loadChannels(evt) {
  if(evt.channels == nil) {}
    var gameName = evt.target.data["top"][evt.target.index]["game"]["name"];
    var url = "https://api.twitch.tv/kraken/streams?game=" + gameName + "&client_id=" + clientId;
    getJSON(url, function(err, data) {
      console.log(data);
    });
  } else {
    //means that i need to load some user saved data instead
  }
}
