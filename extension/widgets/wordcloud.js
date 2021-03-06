var input = {
    "@text": "President Obama called Wednesday on Congress to extend a tax break for students included in last year's economic stimulus package, arguing that the policy provides more generous assistance.",
    "@confidence": "0.3",
    "@support": "20",
    "@types": "",
    "@sparql": "",
    "@policy": "whitelist",
    "Resources": [{
      "@URI": "http://dbpedia.org/resource/Presidency_of_Barack_Obama",
      "@support": "134",
      "@types": "DBpedia:OfficeHolder,DBpedia:Person,Schema:Person,Freebase:/book/book_subject,Freebase:/book,Freebase:/book/periodical_subject,Freebase:/media_common/quotation_subject,Freebase:/media_common,DBpedia:TopicalConcept",
      "@surfaceForm": "President Obama",
      "@offset": "0",
      "@similarityScore": "0.18051494657993317",
      "@percentageOfSecondRank": "-1.0"
    }, {
      "@URI": "http://dbpedia.org/resource/Student",
      "@support": "1222",
      "@types": "Freebase:/business/job_title,Freebase:/business,Freebase:/fictional_universe/fictional_job_title,Freebase:/fictional_universe,Freebase:/film/film_festival_focus,Freebase:/film,Freebase:/fictional_universe/character_occupation,Freebase:/people/profession,Freebase:/people,Freebase:/visual_art/art_subject,Freebase:/visual_art,Freebase:/fictional_universe/character_rank,Freebase:/media_common/quotation_subject,Freebase:/media_common,Freebase:/book/book_subject,Freebase:/book,DBpedia:TopicalConcept",
      "@surfaceForm": "students",
      "@offset": "71",
      "@similarityScore": "0.13329069316387177",
      "@percentageOfSecondRank": "-1.0"
    }, {
      "@URI": "http://dbpedia.org/resource/Policy",
      "@support": "484",
      "@types": "Freebase:/media_common/quotation_subject,Freebase:/media_common,DBpedia:TopicalConcept",
      "@surfaceForm": "policy",
      "@offset": "148",
      "@similarityScore": "0.1541866511106491",
      "@percentageOfSecondRank": "-1.0"
    }]
  }

  function freqCount(str) {

    var hist = {},
      words = str.split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}$%&0-9*]/)
    for (i in words)
      if (words[i].length > 1)
        hist[words[i]] ? hist[words[i]] += 1 : hist[words[i]] = 1;
    return hist;
  }

  var strList = freqCount(input['@text']);

  var strList2 = [];
  var tmp = [];

  for (var k in strList) {
    tmp[0] = k;
    tmp[1] = strList[k].valueOf();
    strList2.push(tmp.slice(0));
  }

  strArr = jQuery.makeArray(strList2);
  max = 0
  thisVal = 0

  jQuery.each(strArr, function(i, v) {
    thisVal = v[i, 1];
    max = (max < thisVal) ? thisVal : max;
  })

  jQuery.each(strArr, function(i, v) {
    v[i, 1] = v[i, 1] / max * 30;
  })

  var div = document.getElementById("sourrounding_div");

  var canvas = document.getElementById("canvas_cloud");

  canvas.height = div.offsetHeight;

  canvas.width = div.offsetWidth;
  var options = {
    list: strArr,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    wait: 50,
    minRotation: 1.57,
    maxRotation: 1.57,
    click: function(word) {
      var url = "http://www.cbc.ca/gsa/?q=";
      url = url.concat(word[0]).concat("&gns=SEARCH");
      window.open(url)
    },
    gridSize: Math.round(2 * document.getElementById('canvas_cloud').offsetWidth / 1024),
    weightFactor: function(size) {
      return Math.pow(size, 1.0) * document.getElementById('canvas_cloud').offsetWidth / 1024;
    }
  }

  WordCloud(document.getElementById('canvas_cloud'), options);