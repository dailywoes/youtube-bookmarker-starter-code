const user = {
    username: 'user',
    password: 'pass'
};

let contents;

chrome.runtime.sendMessage({message: "start"}, function () {
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message === "start") {
        console.log("starting online fans tracker");
    }
});


chrome.runtime.onMessage.addListener((message, sender) => {
    contents = message;
    let r = /\d+/;
});

/*
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log("background.js received msg");
        if (message === "check fans"){
            checkOnlineFans();
        }
    }
);
 */

/*
const iframeHosts = [
    "*onlyfans.com*",
];
*/

/*
const adblockRuleID = 2; // give any id to indetify the rule but must be greater than 1
chrome.declarativeNetRequest.updateDynamicRules(
    {
        addRules: [
            {
                action: {
                    type: "redirect",
                    redirect: {
                        transform: { scheme: "https", host: "new.onlyfans.com" }
                    },
                },
                condition: {
                    urlFilter: "||onlyfans.com/api2/v2/subscriptions"
                },
                id: adblockRuleID,
                priority: 1,
            },
        ],
        removeRuleIds: [adblockRuleID], // this removes old rule if any
    },
    () => {
        console.log("block rule added");
    }
);

 */

chrome.runtime.onInstalled.addListener(async () => {
    console.log("rule added");
    const rules = [{
        id: 1,
        action: {
            type: "modifyHeaders",
            requestHeaders: [
                { header: "Referer", operation: "remove" }
            ]
        },
        condition: {
            urlFilter: "||onlyfans.com/api2/v2/subscriptions/subscribers",
            resourceTypes: ['xmlhttprequest'],
        },
    }];
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(r => r.id),
        addRules: rules,
    });
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (m) {
    console.log('match:', m);
    console.log('match:', m.request.url);

    console.log(fetch(m.request.url, {
          method: 'POST',
          body: m.request,
    }));



});

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    console.log("🔰 Message From Injected Script 🔰")
    console.log(request)
    if (request.message == "Intercepted Request Response") {
        console.log(request.Intercepted_response)
        sendResponse("done")
    }
})

/*
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: iframeHosts.map((h, i) => i + 1),
        addRules: iframeHosts.map((h, i) => ({
            id: i + 1,
            condition: {
                domains: [chrome.runtime.id],
                urlFilter: `*onlyfans.com*`,
                resourceTypes: ['sub_frame'],
            },
            action: {
                type: 'modifyHeaders',
                requestHeaders: [
                    {
                        header: 'path',
                        operation: 'set',
                        value: '/api2/v2/subscriptions/subscribers?limit=100&offset=0&sort=desc&field=last_activity&type=active',
                    },
                ],
            },
        })),
    });
});

 */

function checkOnlineFans() {
    chrome.tabs.query(
        {
            url: "https://onlyfans.com/my/subscriptions/active"
        },
        function (tabs) {
            if (tabs[0] === undefined) {
                //console.log("online fans tab doesn't exist, opening tab.");
                chrome.tabs.create({url: "https://onlyfans.com/my/subscriptions/active"});
            }else{
                chrome.tabs.reload(tabs[0].id, {bypassCache: true});
            }
            setTimeout(function () {
                console.log(contents);
            }, 3000);
        }
    )
};

/*
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.query === "currentTime") {
        currentTime()
    }
});

function currentTime() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        sendResponse({currentTime: xhr.responseText});
    };
    xhr.open("GET", "http://www.timeapi.org/utc/now");
    xhr.send();

    return true;
}
*/