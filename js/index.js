(function (console, $hx_exports) { "use strict";
var Index = $hx_exports.Index = function() { };
Index.main = function() {
	console.log("HAXE.");
};
Index.prototype = {
	newQuote: function() {
		$.ajax({
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&lang=en",
            dataType: "jsonp",
            callback: parseQuote
        });;
	}
	,parseQuote: function(response) {
		if(response == null) return;
		Index.document.getElementById("quote").innerHTML = response.quoteText;
		var author = "";
		if(response.quoteAuthor == "") author = "Unknown"; else author = response.quoteAuthor;
		Index.document.getElementById("author").innerHTML = author;
		this.tweetQuote();
	}
	,tweetQuote: function() {
		var url = "https://twitter.com/intent/tweet?text=";
		url += "\"" + js.JQuery("#quote").html() + "\"";
		url += "  -" + js.JQuery("#author").html();
		url = encodeURI(url);
		js.JQuery("#twitter").attr("href",url);
	}
};
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
Index.document = window.document;
Index.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
