function fetch_feed() {
  chrome.extension.sendRequest({
      'action': 'fetch_feed',
      'url': 'http://feeds.feedburner.com/cbc/top'
    },
    function(response) {
      display_stories(response);
    }
  );
}

function display_stories(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  $('#popup').html('<img src="/images/icon/cbc_banner.gif" id="logo" /><br clear="all" />\
    <h3>Enabled Widgets</h3>\
    <p>\
    Widget 1: Word Cloud<br>\
    Widget 2: Topic Image Tile<br>\
    Widget 3: Top New Feeds<br>\
    <h3><a href="https://github.com/vdimarco/CBC-plus-plus">Add More Widgets</a><h3>\
    </p>');
  $('#logo')[0].addEventListener('click', function() {
    open_item('http://cbc.ca/')
    window.close()
  })
  var items = $xml.find("item");
  items.each(function(index, element) {
    var post = parse_post(element);
    var item = '';
    var class2 = '';
    if (index >= localStorage['unread_count']) {
      // console.log('visited');
      item += '<div class="post read">';
    } else {
      item += '<div class="post">'
    }
    item += '<span class="tag">' + post.tag + '</span>\
    <a href="' + post.url + '">\
      <div id="' + post.id + '" class="item">\
        <h4>' + post.title + '</h4>\
        <span class="description">' + post.description + '...</span>\
      </div>\
    </a><br>';
    item += '</div>';
    $('#feed').append(item);
    // TODO why isn't jQuery's .on defined?
    var $item = $('div[id="' + post.id + '"]')
    console.log('$item', $item)
    $item[0].addEventListener('click', function() {
      open_item(post.url)
    })
  });
}
$(document).ready(function() {
  fetch_feed();
});
