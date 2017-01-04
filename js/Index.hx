import js.JQuery;
import js.Browser;

@:expose class Index {

    public static function main() {
        Browser.document.onload = function() {
            Index.newQuote();
        };
    }

    public static function getElement(element:String) {
        return Browser.document.getElementById(element);
    }

    public static function newQuote() {
        untyped __js__('$.ajax({
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&lang=en",
            dataType: "jsonp",
            callback: this.parseQuote
        })');
    }

    public static function parseQuote(response) {
        if (response == null) return;
        getElement("quote").innerHTML = response.quoteText;
        var author = "";
        if (response.quoteAuthor == "") {
            author = "Unknown";
        } else {
            author = response.quoteAuthor;
        }
        getElement("author").innerHTML = author;
        tweetQuote();
    }

    public static function tweetQuote() {
        var url : String = "https://twitter.com/intent/tweet?text=";
        url += '"' + getElement("#quote").innerHTML + '"';
        url += "  -" + getElement("#author").innerHTML;
        url = untyped __js__('encodeURI(url)');
        getElement("#twitter").setAttribute("href", url);
    }
}
