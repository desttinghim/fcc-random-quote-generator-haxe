function newQuote() {
  $.ajax({
    url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&lang=en",
    dataType: "jsonp",
    callback: parseQuote
  });
}


function parseQuote(response)
{
  if (response == undefined) return;
  document.getElementById("quote").innerHTML = response.quoteText;
  var author = "";
  if (response.quoteAuthor === "") {
    author = "Unknown";
  } else {
    author = response.quoteAuthor;
  }
  document.getElementById("author").innerHTML = author;
  tweetQuote();
}

function tweetQuote() {
  url = "https://twitter.com/intent/tweet?text=";
  url += '"' + $("#quote").html() + '"';
  url += "  -" + $("#author").html();
  url = encodeURI(url);
  $("#twitter").attr("href", url);
}

$(document).ready(newQuote);