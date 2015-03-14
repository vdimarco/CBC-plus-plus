$(function() {
  // sends message to background script
  chrome.runtime.sendMessage({opened: true}, function(response) {
    console.log(response.example);
  });
});


$(document).ready(function() {
        fetch_feed();
});


function fetch_feed() {
        chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://lifehacker.com/index.xml'},
                function(response) {
                        display_stories(response);
                }
        );
}