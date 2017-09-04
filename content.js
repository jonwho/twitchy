chrome.extension.sendRequest({cmd: "read_file"}, function(html) {
  console.log("calling content.js");
  alert('plz');
  $("body").append(html);
});
