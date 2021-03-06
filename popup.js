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

function rgbaTrans(r, g, b, a) {
  return 'rgba(' + [r, g, b, a].join(',') + ')';
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

function loadGames() {
  var games = document.createElement('div');

  var url = "https://api.twitch.tv/kraken/games/top?limit=9&client_id=" + clientId;

  getJSON(url, function(err, data) {
    console.log("hello");
    for(var i = 0; i < data["top"].length; i++) {
      var game = document.createElement('div');
      game.className = 'game';

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
  if(evt.channels == null) {
    var gameName = evt.target.data["top"][evt.target.index]["game"]["name"];
    var url = "https://api.twitch.tv/kraken/streams?limit=20&game=" + gameName + "&client_id=" + clientId;
    getJSON(url, function(err, data) {
      var contentWindow = document.getElementById("contentWindow");
      contentWindow.innerHTML = "";

      var bgc = [255, 255, 255];

      for(var i = 0; i < data["streams"].length; i++) {
        var channel = document.createElement('div');
        var channelData = data["streams"][i];
        channel.className = 'channel';
        channel.style.backgroundColor = 'rgba(' + [bgc[0],bgc[1],bgc[2],0.4].join(',') + ')';
        channel.style.borderBottom = '1px solid rgba(' + [0, 0, 0, 0.3].join(',') + ')';
        channel.style.height = '30px';
        channel.style.width = '540px';
        console.log(channelData["viewers"]);
        channel.textContent = channelData["viewers"] + " viewers / " + channelData["channel"]["display_name"] + " / " + channelData["channel"]["status"];
        channel.style.color = rgbaTrans(0, 0, 0, 0.7);
        channel.style.lineHeight = '30px';
        channel.style.paddingLeft = '15px';

        channel.channelName = channelData["channel"]["display_name"];
        channel.addEventListener("click", openStream, false);

        contentWindow.appendChild(channel);
      }
    });
  } else {
    //means that i need to load some user saved data instead
  }
}

function openStream(evt) {
  var extensionWindow = document.getElementById('extensionWindow');

  extensionWindow.innerHTML = "";
  extensionWindow.innerHTML = '<iframe id="twitchPlayer" src="https://player.twitch.tv/?channel=' + evt.target.channelName +'&muted=true" height="320" width="540" frameborder="0" scrolling="no" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>'
}
