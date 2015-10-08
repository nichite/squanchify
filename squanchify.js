(function(){

    // Don't squanch prepositions, in/definite articles, pronouns, etc.
    var unsquanchables = ["I","a","aboard","about","above","absent","across","after",
    "against","along","alongside","amid","amidst","among","an","around","as","at",
    "atop","before","behind","below","beneath","beside","between","by","despite",
    "down","during","except","following","for","from","I","in","inside","into",
    "like","mid","minus","near","next","notwithstanding","of","off","on","onto",
    "opposite","outside","over","past","plus","regarding","round","save","she",
    "since","than","that","the","them","they","those","through","throughout","till",
    "times","to","toward","under","underneath","until","up","upon","we","with",
    "within","without","you"];

    var DOMElements = document.querySelectorAll("p,a,h1,h2,h3,h4,h5,h6,li");

    for (var i = 0; i < DOMElements.length; i++){

        var elementText = DOMElements[i].innerText.trim();

        if (elementText) {
            var unSquanchedWords = elementText.split(" ");
            var length = unSquanchedWords.length;
            for (var j = 0; j < length; j++) {

                /* Too much squanching just gets annoying. Plus, this code would
                   longer otherwise.*/
                if (Math.random() > 0.9) {

                    var low = 0;
                    var hi = unsquanchables.length -1;
                    var isSquanchable = true;

                    // Pretty standard binary search.
                    wordToSquanch = unSquanchedWords[j];
                    while(hi >= low) {
                        mid = Math.round((hi + low)/2);
                        if (wordToSquanch === unsquanchables[mid]) {
                            isSquanchable = false;
                            break;
                        }
                        else if (wordToSquanch > unsquanchables[mid])
                            low = mid + 1;
                        else
                            hi = mid - 1;
                    }

                    // Initialize the words in question.
                    var squanchText;
                    var ch = wordToSquanch.charAt(0);
                    var isAllCaps = (wordToSquanch === wordToSquanch.toUpperCase());
                    squanchText = (ch === ch.toUpperCase()) ? "Squanch" : "squanch";

                    /* Various rules for determining how to squanch the word,
                       given the context. */
                    if (wordToSquanch.substr(wordToSquanch.length - 3, 3) === "ing")
                        squanchText += "ing";
                    else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "ly")
                        squanchText += "ly";

                    // Make it all caps, if applicable.
                    if (isAllCaps)
                        squanchText = squanchText.toUpperCase();

                    unSquanchedWords[j] = squanchText;
                }

            }
            squanchedWords = unSquanchedWords.join(" ");
            DOMElements[i].innerText = squanchedWords;
        }
    }

}());
