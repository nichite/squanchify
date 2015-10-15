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
    return chrome.storage.sync.get(inputVal, function(data) {
        if (data[inputVal] === undefined) {
            data[inputVal] = defaults[inputVal];
        }
        setFunction(data[inputVal], reloadTabInd);
    });
};

updateSquanchiness = function(squanchiness, reloadTabInd) {
    if (reloadTabInd)
        chrome.storage.sync.set({'squanchiness': squanchiness}, reloadCurrentTab);
    else {
        chrome.storage.sync.set({'squanchiness': squanchiness});
    }
};

updateActivated = function(activated, reloadTabInd) {
    if (reloadTabInd)
        chrome.storage.sync.set({'activated': activated}, reloadCurrentTab);
    else
        chrome.storage.sync.set({'activated': activated});
};

mapSliderToSquanchiness = function(sliderVal) {
    return 1 - (sliderVal/100);
};

mapSquanchinessToSlider = function(squanchiness) {
    return (100*(1 - squanchiness));
};
