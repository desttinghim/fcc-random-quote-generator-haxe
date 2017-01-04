import js.JQuery;
import js.Browser;

@:expose class Index {

    public static function main() {
        Index.newQuote();
    }

    public static function getElement(element:String) {
        return Browser.document.getElementById(element);
    }

    public static function jsonp() {

    }

    public static function newQuote() {
        var script = Browser.document.createScriptElement();
        // Website/API to access
        script.src = "http://api.forismatic.com/api/1.0/"
                   + "?method=getQuote"
                   + "&format=jsonp"
                   + "&jsonp=Index.parseQuote"
                   + "&lang=en";

        Browser.document.head.appendChild(script);
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
        url += '"' + getElement("quote").innerHTML + '"';
        url += "  -" + getElement("author").innerHTML;
        url = untyped __js__('encodeURI(url)');
        getElement("twitter").setAttribute("href", url);
    }
}
