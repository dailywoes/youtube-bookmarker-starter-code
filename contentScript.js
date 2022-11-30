document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function(){
            let r = /\d+/;
            let online_fans = (document.getElementsByClassName("b-content-filter__title")[0].innerHTML.match(r)[0]);
            chrome.runtime.sendMessage({online_fans}, function (response) {
                console.log('online fans page fully loaded');
            });
            }, 2000);
});

/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message received from timer");
        if (message === "check fans"){
            chrome.runtime.sendMessage({message: "check fans"}, function (response) {
            });
        };
    }
);

 */
/*
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details);
    }, {urls: ["<all_urls>"]}, ["requestHeaders"]);

 */