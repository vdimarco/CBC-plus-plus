function fetch_feed() {
chrome.extension.sendRequest({
'action': 'fetch_feed',
'url': 'http://feeds.gawker.com/lifehacker/full'
},
function(response) {
display_stories(response);
}
);
}
function display_stories(feed_data) {
var xml_doc = $.parseXML(feed_data);
$xml = $(xml_doc);
$('#popup').html('<img src="/images/icon/cbc_banner.gif" id="logo" /><br clear="all" /><h2>User Settings</h2><ul><li>[x] Enagle Widget 1</li><li>[ ] Enagle Widget 2</li><li>[x] Enagle Widget 3</li></ul><a href="#">Save</a>');
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
// // console.log('visited');
item += '<div class="post read">';
  } else {
  item += '<div class="post">'
    }
    item += '<span class="tag">' + post.tag + '</span>\
    <a href="' + post.url + '">\
      <div id="' + post.id + '" class="item">\
        <img src="' + post.img + '" width="107" height="60" />\
        <h4>' + post.title + '</h4>\
        <span class="description">' + post.description + '...</span>\
      </div>\
    </a>';
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