var defaults = {
    'squanchiness': 0.95,
    'activated': true
};

$(document).ready(function(){
    loadSquanchPrefs();

    $(".squanchy-button").on("click", function(){
        var activated = $.parseJSON($(this).attr('activated'));
        setSquanchButton(activated, true);
    });

    $(".squanchy-slider").on("change", function(){
        var sliderVal = this.value;
        updateSquanchiness(mapSliderToSquanchiness(sliderVal), true);
    });
});

loadSquanchPrefs = function() {
    tryGetStorageValue('squanchiness', setSquanchySlider, false);
    tryGetStorageValue('activated', setSquanchButton, false);
};

setSquanchySlider = function(squanchiness, reloadTabInd){
    $(".squanchy-slider").val(mapSquanchinessToSlider(squanchiness));

    if (reloadTabInd)
        updateSquanchiness(squanchiness, reloadTabInd);
};

setSquanchButton = function(currentlyActivated, reloadTabInd) {
    var setToActivated = ((currentlyActivated && !reloadTabInd) || (!currentlyActivated && reloadTabInd));

    var squanchButton = $(".squanchy-button");
    var squanchSlider = $(".slider-container");

    squanchButton.html(setToActivated ? "De-Squanch" : "Re-Squanch");
    squanchButton.css("background", (setToActivated ? "#e64343" : "#0ada8f"));
    squanchButton.attr("activated", (setToActivated ? true : false));

    if (setToActivated)
        squanchSlider.slideDown(500);
    else
        squanchSlider.slideUp(500);

    if (reloadCurrentTab)
        updateActivated(setToActivated, reloadTabInd);
};

reloadCurrentTab = function() {
    chrome.tabs.query({active: true}, function(tabs){
        chrome.tabs.reload(tabs[0].id);
    });
};

tryGetStorageValue = function(inputVal, setFunction, reloadTabInd) {
    return chrome.storage.local.get(inputVal, function(data) {
        if (data[inputVal] === undefined) {
            data[inputVal] = defaults[inputVal];
        }

        setFunction(data[inputVal], reloadTabInd);
    });
};

updateSquanchiness = function(squanchiness, reloadTabInd) {
    if (reloadTabInd)
        chrome.storage.local.set({'squanchiness': squanchiness}, reloadCurrentTab);
    else {
        chrome.storage.local.set({'squanchiness': squanchiness});
    }
};

updateActivated = function(activated, reloadTabInd) {
    if (reloadTabInd)
        chrome.storage.local.set({'activated': activated}, reloadCurrentTab);
    else
        chrome.storage.local.set({'activated': activated});
};

mapSliderToSquanchiness = function(sliderVal) {
    // The lower ten slider values produce very subtle squanchiness (<1%)
    if (sliderVal <= 10)
        return 1 - (sliderVal/1000);
    else
        return (1110 - 11*sliderVal)/1000;
};

mapSquanchinessToSlider = function(squanchiness) {
    if (squanchiness >= 0.99)
        return (1000*(1 - squanchiness));
    else
        return -(10/11)*(100*squanchiness - 111);
};
