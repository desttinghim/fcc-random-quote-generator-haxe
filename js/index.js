(function (console, $hx_exports) { "use strict";
var Index = $hx_exports.Index = function() { };
Index.main = function() {
	Index.newQuote();
};
Index.getElement = function(element) {
	return window.document.getElementById(element);
};
Index.newQuote = function() {
	if(Index.getElement("jsonp") != null) Index.getElement("jsonp").remove();
	var script;
	var _this = window.document;
	script = _this.createElement("script");
	script.src = "http://api.forismatic.com/api/1.0/" + "?method=getQuote" + "&format=jsonp" + "&jsonp=Index.parseQuote" + "&lang=en";
	script.id = "jsonp";
	window.document.head.appendChild(script);
};
Index.parseQuote = function(response) {
	if(response == null) return;
	Index.getElement("quote").innerHTML = response.quoteText;
	var author = "";
	if(response.quoteAuthor == "") author = "Unknown"; else author = response.quoteAuthor;
	Index.getElement("author").innerHTML = author;
	Index.tweetQuote();
};
Index.tweetQuote = function() {
	var url = "https://twitter.com/intent/tweet?text=";
	url += "\"" + Index.getElement("quote").innerHTML + "\"";
	url += "  -" + Index.getElement("author").innerHTML;
	url = encodeURI(url);
	Index.getElement("twitter").setAttribute("href",url);
};
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
Index.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
