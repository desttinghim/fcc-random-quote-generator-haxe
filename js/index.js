(function (console, $hx_exports) { "use strict";
var Index = $hx_exports.Index = function() { };
Index.main = function() {
	Index.newQuote();
};
Index.getElement = function(element) {
	return window.document.getElementById(element);
};
Index.jsonp = function() {
};
Index.newQuote = function() {
	$.ajax({
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=Index.parseQuote&lang=en",
            dataType: "jsonp",
            callback: Index.parseQuote
        });
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
Index.jsonpScript = (function($this) {
	var $r;
	var _this = window.document;
	$r = _this.createElement("script");
	return $r;
}(this));
Index.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
