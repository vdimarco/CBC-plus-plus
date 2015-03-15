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
    <h3>User Settings</h3>\
    <p>\
    [x] Enagle Widget 1<br>\
    [x] Enagle Widget 2<br>\
    [ ] Enagle Widget 3<br>\
    </p>\
    <h3>Top News: Canada</h3>');
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
    $('#popup').append(item);
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
