import js.JQuery;
import js.Browser;

@:expose
class Index {
    private static var document = Browser.document;

    public static function main() {
        trace("HAXE.");
    }

    function newQuote() {
        untyped __js__('$.ajax({
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&lang=en",
            dataType: "jsonp",
            callback: parseQuote
        });');
    }

    function parseQuote(response) {
        if (response == null) return;
        document.getElementById("quote").innerHTML = response.quoteText;
        var author = "";
        if (response.quoteAuthor == "") {
            author = "Unknown";
        } else {
            author = response.quoteAuthor;
        }
        document.getElementById("author").innerHTML = author;
        tweetQuote();
    }

    function tweetQuote() {
        var url : String = "https://twitter.com/intent/tweet?text=";
        url += '"' + new JQuery("#quote").html() + '"';
        url += "  -" + new JQuery("#author").html();
        url = untyped __js__('encodeURI(url)');
        new JQuery("#twitter").attr("href", url);
    }
}
