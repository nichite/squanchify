var defaults = {
    'squanchiness': 0.95,
    'activated': true
};

$(document).ready(function(){
    loadSquanchPrefs();

    $(".squanchy-button").on("click", function(){
        tryGetStorageValue('activated', deOrReSquanch);
    });

    $(".squanchy-slider").on("change", function(){
        var sliderVal = this.value;
        updateSquanchiness(mapSliderToSquanchiness(sliderVal));
    });
});

loadSquanchPrefs = function() {
    tryGetStorageValue('squanchiness', setSquanchySlider);
    tryGetStorageValue('activated', setSquanchButton);
};

setSquanchySlider = function(squanchiness){
    $(".squanchy-slider").val(mapSquanchinessToSlider(squanchiness));
};

setSquanchButton = function(activated) {
    var squanchButton = $(".squanchy-button");
    if (activated === true) {
        squanchButton.html("De-Squanch");
    } else {
        squanchButton.html("Re-Squanch");
    }
};

deOrReSquanch = function(activated) {
    var squanchButton = $(".squanchy-button");
    if (activated === true) {
        squanchButton.html("Re-Squanch");
        chrome.storage.sync.set({'activated': false}, reloadCurrentTab);
    } else {
        squanchButton.html("De-Squanch");
        chrome.storage.sync.set({'activated': true}, reloadCurrentTab);
    }
};

reloadCurrentTab = function() {
    chrome.tabs.query({active: true}, function(tabs){
        chrome.tabs.reload(tabs[0].id);
    });
};

tryGetStorageValue = function(inputVal, setFunction) {
    return chrome.storage.sync.get(inputVal, function(data) {
        if (data[inputVal] === undefined) {
            data[inputVal] = defaults[inputVal];
            chrome.storage.sync.set({inputVal: data[inputVal]});
        }
        setFunction(data[inputVal]);
    });
};

updateSquanchiness = function(squanchiness) {
    chrome.storage.sync.set({'squanchiness': squanchiness}, reloadCurrentTab);
};

updateActivated = function(activated) {
    chrome.storage.sync.set({'activated': activated}, reloadCurrentTab);
};

mapSliderToSquanchiness = function(sliderVal) {
    return 1 - (sliderVal/100);
};

mapSquanchinessToSlider = function(squanchiness) {
    return (100*(1 - squanchiness));
};
