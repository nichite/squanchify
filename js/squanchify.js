// Copyright (c) 2015 Nic Hite <nichite@gmail.com>
// Licensed under the MIT license, read LICENSE.txt

var squanchPrefs = {
    'squanchiness': 0.95,
    'activated': true
};

$(document).ready(function(){

    /* Oh geez, oh man, Rick...I-I guess I'll start it off. Preferences are in
       Chrome storage, right?*/
    var origLength = document.links.length;
    loadSquanchiness();

    /* If people have endless scrolling on, Morty, I'm...I'm gonna make
       sure those assholes don't lose their squanch. You-you gotta keep
       the squanch GOING, Morty. More. MORE! Let's see where this goes! */
    $(document).on("scroll",function(){

        /* Huh? checking document links length? I don't get it, Rick! I'm losing
           it, man! */
        /* Morty, I'm gonna need you to quit your bitching and keep typing. We only
           want to re-squanchify if more content got loaded from endless scrolling.
           You'd know that if...if you were paying att--any attention, MORTY.*/
        if(document.links.length > origLength && squanchPrefs.activated === true) {
            squanchify(squanchPrefs.squanchiness);
            origLength = document.links.length;
        }
    });
});

squanchify = function(squanchiness){

    var unsquanchables = ["a","aboard","about","above","absent","across","after",
    "against","along","alongside","amid","amidst","among","an","and","are","around","as","at",
    "atop","before","behind","below","beneath","beside","between","by","despite",
    "down","during","except","following","for","from","he","her","hers","him","his","i","i'd","i'm","i've","in","is","inside","into",
    "like","mid","minus","near","next","notwithstanding","of","off","on","onto",
    "opposite","or","out","outside","over","past","plus","regarding","round","she",
    "since","than","that","the","their","them","they","they've","those","through","throughout","till",
    "times","to","toward","under","underneath","until","up","upon","we","which","who",
    "whom","whose","with","within","without","you"];

    var ingExceptions = ["bling","bring","ceiling","ching","cling","ding","fling","king",
    "ping","ring","sing","sling","spring","sting","string","swing","thing","viking","wing","wring","zing"];

    var lyExceptions = ["ally","anomaly", "apply", "assembly", "belly", "bely", "bodily", "bubbly", "bully",
    "burly", "chilly", "comely", "comply", "costly", "courtly", "cuddly", "curly", "daily", "dally",
    "dastardly", "deadly", "deathly", "disorderly", "doily", "dolly", "dragonfly", "early", "family",
    "fly", "friendly", "frilly", "ghastly", "goodly", "gravelly", "grisly", "gully", "heavenly", "hilly",
    "holly", "holy", "homely", "homily", "hourly", "imply", "jelly", "jolly", "kindly", "leisurely",
    "likely", "lily", "lively", "lonely", "lovely", "lowly", "mannerly", "mealy", "measly", "melancholy",
    "monopoly", "monthly", "multiply", "nightly", "oily", "only", "orderly", "pearly", "pebbly", "ply",
    "rally", "rarely", "rely", "reply", "scaly", "shapely", "sickly", "silly", "sly", "smelly", "sprightly",
    "squiggly", "stately", "steely", "supply", "supply", "surly", "tally", "timely", "ugly", "unlikely",
    "weekly", "wily", "wobbly", "wooly", "worldly", "wrinkly", "yearly"];

    var listOfSelectors = ["em","a","span","li","p","h1","h1","h2","h3","h4","h5","h6","div"];

    var tagRegex = /<.*>/g;
    var escapedHTMLRegex = /\&[a-z]+\;/i;
    var splitRegex = /\s+|\s*<.*>\s*/;
    var replacementRegex = /\w+\'*\w*/;

    listOfSelectors.forEach(function(selector){

        var DOMElements = document.querySelectorAll(selector);
        for (var i = 0; i < DOMElements.length; i++){

            var elementText = DOMElements[i].innerHTML.trim();

            if (elementText) {

                /* A-alright, we've gotta...we've gotta--UURP--pull out the LINKS here, Morty. The LINKS.
                   If we don't do that, Morty, all the links are gonna break. They're gonna...break, Morty.
                   It's just gonna be one...one big, big broken link party. Just sitting around
                   being broken. Do you get it? */
                var possibleLinks = [];
                var currentLink;
                while ((currentLink = tagRegex.exec(elementText)) !== null)
                    possibleLinks.push(currentLink);

                /* Oh man, Rick, it's...you know, like it's gonna be hard to, umm, put the links back
                   in after we Squanchify everything, won't it? I mean...h-how are we gonna...even...know
                   where to put them once we're done? */
                /* Relax, Morty. It's fine. Everything's fine. We'll just leave an empty string in the array
                   where they came from and stick it back in later. No one will even know the difference,
                   Morty. We're really...wuhh...flying under the radar with this one. */
                var unSquanchedWords = elementText.split(splitRegex);

                if (!unSquanchedWords[0] || unSquanchedWords.join(" ").match(/squanch/i) ) {
                    continue;
                }

                var length = unSquanchedWords.length;
                for (var j = 0; j < length; j++) {

                        // Okay, Morty. Here's the word. Don't forget it.
                        var wordToSquanch = unSquanchedWords[j];

                        var prevSquanch;
                        if (j > 0 && squanchiness > 0.10)
                            prevSquanch = unSquanchedWords[j-1].match(/squanch/i);
                        var hasCharacters = wordToSquanch.match(/[a-z]/i);


                    if (Math.random() > squanchiness && hasCharacters && !prevSquanch) {

                        var squanchText;
                        var isSquanchable = true;

                        var ch = wordToSquanch.charAt(0);
                        var isAllCaps = (wordToSquanch === wordToSquanch.toUpperCase());
                        squanchText = (ch === ch.toUpperCase()) ? "Squanch" : "squanch";

                        /* You can't just say "squanch" willy nilly with no--urgh--context, Morty.
                           The real squanch comes from the heart. And proper conju--conjugation. */
                        /* Hang on, Rick. Aren't there, like, you know...a bunch of words that might
                           end with those letters, but a-aren't--*/
                        /* You already lost me, Morty. I'm over here sn--I'm sitting...over here, snoring...
                           over here, already, because of what you just said. And are you kidding me, Morty?
                           This from YOU? Can you even, I dunno, even write your own name? The answer is
                           I don't have the time OR the patience to catch all the exc-exceptions. You gotta
                           look at the big picture, Morty. */
                        /* Oh man, Rick, okay... */
                        wordToSquanch = wordToSquanch.toLowerCase();
                        if (unsquanchables.indexOf(wordToSquanch) > -1 || wordToSquanch.match(escapedHTMLRegex))
                            isSquanchable = false;
                        else if (wordToSquanch.substr(wordToSquanch.length - 3, 3) === "ing" && ingExceptions.indexOf(wordToSquanch) === -1)
                            squanchText += "ing";
                        else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "ly" && lyExceptions.indexOf(wordToSquanch) === -1)
                            squanchText += "ly";
                        else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "es" || wordToSquanch.slice(-1) === "s")
                            squanchText += "es";
                        else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "ed")
                            squanchText += "ed";


                        // This is where the magic happens, baby. Squanchy would be proud.
                        // Okay, all right, looks like we're--looks like we're just about done, huh?
                        /* Just about, Morty. Those little bastards are really gonna wet themselves
                           when they get their hands on this, Morty. They'll be in...in the palms of
                           our...hands. */
                        if (isSquanchable) {
                            if (isAllCaps)
                                squanchText = squanchText.toUpperCase();

                            unSquanchedWords[j] = unSquanchedWords[j].replace(replacementRegex, squanchText);
                        }
                    }
                }

                // See, Morty? No one even noticed. You little piece of shit.
                /* Y-you know what, Rick? I'm getting real sick of you always taking a big,
                   a big shit over my feelings, you know? I'm over here, slaving over the...working
                   on this big file with you, and I don't even know what...like, you know, programming
                   is, and you're giving me the, the, the, the business about it? You're a real piece of
                   work Rick, just a...a real, nice...handcrafted, homebr--homemade asshole. Homebrewed,
                   is...what I was looking for, uh...back there. */
                /* Speaking of which, Morty, while you were bitching about nothing back there, I was--URNGHH
                   --thinking you could-- */
                /* Don't say it, Rick. */
                /* --thinking you could make yourself useful and fetch me another homebr-- */
                /* That is IT, Rick! I've had it. You know? I'm throwing in the towel, Rick.
                   I'm throwing in the cards. Cashing in the...cashing in the chips. I'm out of here, Rick. */
                var joinerString = " ";
                if (possibleLinks) {
                    for (j = 0; j < possibleLinks.length; j++) {
                        unSquanchedWords[unSquanchedWords.indexOf("")] = possibleLinks[j];
                    }
                    if (unSquanchedWords.length === 2 && unSquanchedWords[0] === "(" && unSquanchedWords[1] === ")") {
                            unSquanchedWords = ["(", possibleLinks, ")"];
                            joinerString = "";
                        }
                }

                /* Little...little punk-ass bitch doesn't know what he's missing. Because the Squanchifier
                   IS GOING TO BE MY GREATEST WORK OF ALL TIME AND YOU COULD HAVE BEEN A PART OF IT, YOU--*/
                // Dad, why are you yelling from the garage?
                // Huh? Oh, it--nothing, Sweetie.
                // Rick, I distinctly remember asking you to keep it down while the glue is drying, or el--
                /* Or else WHAT, JERRY? Do you seriously think anyone gives a shit about your ship-in-a-fucking-bottle
                   collection? I give so little of a shit that it's negative--I TAKE shit about it. By that logic I should
                   ask Morty for the rest of the whiny shit he was giving me earlier just so that the equation balances out.
                   I know it's natural to wanna protect the bottle containing literally the only liter of space in the
                   universe where YOU control ANYTHING, Jerry, but you seem to forget that everything outside of it is mine.
                   So, uhhh...whoopsie.*/
                // Oh my God, oh my God, Rick!
                // Dad!
                // Oh, sorry Jerry, I'll buy you a new one. You know, from a ten-year-old kid who did ten times as good a job.
                squanchedWords = unSquanchedWords.join(joinerString);
                DOMElements[i].innerHTML = squanchedWords.trim();
            }
        }
    });
};

loadSquanchiness = function() {
    var defaultSquanchiness = 0.95;
    chrome.storage.sync.get('squanchiness', function(data) {
        if (data.squanchiness === undefined) {
            data.squanchiness = squanchPrefs.squanchiness;
            chrome.storage.sync.set({"squanchiness": data.squanchiness});
        } else {
            squanchPrefs.squanchiness = data.squanchiness;
        }
        chrome.storage.sync.get('activated', function(data) {
            if (data.activated === undefined) {
                data.activated = squanchPrefs.activated;
                chrome.storage.sync.set({"activated": data.activated});
            } else {
                squanchPrefs.activated = data.activated;
            }
            if (squanchPrefs.activated === true)
                squanchify(squanchPrefs.squanchiness);
        });
    });
};
