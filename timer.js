function timer() {
    checkOnlineFans();
    setTimeout(timer, 1000*10);
}

function checkOnlineFans(){
    //necessary
}

/*
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("sending message to check fans");
        chrome.tabs.sendMessage(tabs[0].id, {message: "check fans"} {
            console.log(response);
        );
    });
}

 */

timer();