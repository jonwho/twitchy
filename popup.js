document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.query({}, function(tab) {
      chrome.tabs.create({ url: "https://www.google.com" });
    });
  }, false);
}, false);
