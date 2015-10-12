var defaults = {
    'squanchiness': 0.95,
    'activated': true
};

$(document).ready(function(){
    loadSquanchPrefs();
    $(".resquanch-button").on("click", function(){
        tryGetValue('activated', deOrReSquanch);
    });
    $(".squanchy-slider").on("change", function(){
        var sliderVal = this.value;
        updateSquanchiness(mapSliderToSquanchiness(sliderVal));
    });
});

loadSquanchPrefs = function() {
    tryGetValue('squanchiness', setSquanchySlider);
    tryGetValue('activated', setSquanchButton);
};

setSquanchySlider = function(squanchiness){
    $(".squanchy-slider").val(mapSquanchinessToSlider(squanchiness));
};

reSquanch = function(squanchiness){

    var thisTabId;
    chrome.tabs.query({active: true}, function(tabs){
        thisTabId = tabs[0].id;
    });
    chrome.tabs.query({}, function(tabs) {
        var message = {"squanchiness": 0};
        var reloadMessage = {"squanchiness": squanchiness, reload: true};
        for (var i=0; i<tabs.length; ++i) {
            if (tabs[i].id ===  thisTabId)
                chrome.tabs.sendMessage(tabs[i].id, reloadMessage);
            else
                chrome.tabs.sendMessage(tabs[i].id, message);
        }
    });
};

reloadCurrentTab = function() {
    chrome.tabs.query({active: true}, function(tabs){
        chrome.tabs.reload(tabs[0].id);
    });
};

deOrReSquanch = function(activated) {
    var squanchButton = $(".resquanch-button");
    if (activated === true) {
        squanchButton.html("Re-Squanch");
        chrome.storage.sync.set({'activated': false}, reloadCurrentTab);
    } else {
        squanchButton.html("De-Squanch");
        chrome.storage.sync.set({'activated': true}, reloadCurrentTab);
    }
};

setSquanchButton = function(activated) {
    var squanchButton = $(".resquanch-button");
    if (activated === true) {
        squanchButton.html("De-Squanch");
    } else {
        squanchButton.html("Re-Squanch");
    }
};

tryGetValue = function(inputVal, setFunction) {
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
