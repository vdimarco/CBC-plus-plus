SPOTLIGHT_URL = "http://spotlight.dbpedia.org/rest/annotate"

// receives message from background script
chrome.extension.onMessage.addListener(function(message, sender) {
  if (message.logUrl) {
    var url = document.URL;
    alert(url);
  }
});

console.log("[LOADED] content.js")

// bookmarklet

// function bookmarklet(d) {
//   return d.selection ? d.selection.createRange().text : d.getSelection()
// }
// s = bookmarklet(document);
// for (i = 0; i < frames.length && !s; i++) s = bookmarklet(frames[i].document);
// if (!s || s == '') s = prompt('Enter text to annotate with DBpedia Spotlight', '');
// open('http://dbpedia-spotlight.github.com/demo/index.html' + (s ? '?execute=yes&client=bookmarklet&text=' + encodeURIComponent(s) : '')).focus();


// select story content
var story = $(".story-content")
console.log(story);

// send request to spotlight endpoint

$(document).ready(function() {
  console.log("ready!");
  var spotlight = $.ajax({
    url: SPOTLIGHT_URL,
    header: {
      "Accept": "application/json"
    },
    method: "POST",
    data: {
      "data - urlencode": story,
      "data": {
        "confidence": 0.4,
        "support": 20
      }
    },
    dataType: 'json',
    success: function(data) {
      $('#main').html($(data).find('#main *'));
      $('#notification-bar').text('The page has been successfully loaded');
      console.log(data);
    },
    error: function() {
      $('#notification-bar').text('An error occurred');
    }
  });
  console.log("spotlight obj: ", spotlight)
});


// share spotlight request with widgets

// wordcloud
var widget1 = function(spotlight) {
  // load html page for this widget
};

// picture tile
var widget2 = function(spotlight) {
  // load html page for this widget
};

// crowd translator
var widget3 = function(spotlight) {
  // load html page for this widget
};


console.log("[LOADED] content.js")
