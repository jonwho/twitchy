chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.cmd == "read_file") {
    $.ajax({
      url: chrome.extension.getURL('twitch.html'),
      dataType: 'html',
      success: sendResponse
    });
  }
});
