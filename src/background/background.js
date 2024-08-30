console.log('Background script is running!');
// 插件独立窗口
chrome.action.onClicked.addListener((tab) => {
    // 创建一个新窗口，打开指定的 URL，并设置窗口大小。
    const opts = {
        url: "./index.html",
        type: "popup",
        width: 600,
        height: 400,
        focused: true
    }
    chrome.windows.create(opts);
});

// 监听点击扩展
// chrome.action.onClicked.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         const currentTab = tabs[0];
//         if (!currentTab) {
//             console.error('No active tab found.');
//             return;
//         }
//         const tabId = currentTab.id;
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ['content_scripts/content.js']
//         });
//         console.log('Script injected successfully.');
//     });
// })
// // message from content
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'content') {
        // sendResponse({message: '插件收到数据'});
        switch (request.result.host) {
            case 'www.douyin.com':
                await handleDouYinResponse(request.result.data);
                break
            case 'www.kuaishou.com':
                await handleKuaiShouResponse(request.result.data);
                break
        }

    }
    return true;
});

async function handleDouYinResponse(result) {
    if (typeof result !== 'object') return;
    try {
        if (result.url.indexOf("/v1/web/aweme/post/") !== -1) {
            let response = JSON.parse(result.response);
            const items = response.aweme_list;
            const itemsList = [];
            for (let i = 0; i < items.length; i++) {
                const author = items[i].author.nickname;
                const videoTitle = '';
                const videoUrl = items[i].video.play_addr.url_list[2];
                const videoObj = {author: author, videoTitle: videoTitle, videoUrl: videoUrl}
                // console.log(videoObj);
                itemsList.push(videoObj);

            }
            // console.log(itemsList.length)
            await saveToStorage(itemsList)
        }
    } catch (e) {
        console.log(e)
    }

}


async function handleKuaiShouResponse(result) {
    try {
        if (!result) return;
        // console.log(result.url)
        if (result.url.indexOf("/graphql") !== -1) {
            if (!result.response || !result.response.data || !result.response.data.visionProfilePhotoList) return;

            const items = result.response.data.visionProfilePhotoList.feeds;
            const itemsList = [];

            for (let i = 0; i < items.length; i++) {
                const author = items[i].author.name;
                const videoTitle = items[i].photo.caption;
                const videoUrl = items[i].photo.manifest.adaptationSet[0].representation[0].url;
                itemsList.push({author: author, videoTitle: videoTitle, videoUrl: videoUrl});
                // console.log({author: author, videoTitle: videoTitle, videoUrl: videoUrl});
            }
            // console.log(itemsList.length);
            await saveToStorage(itemsList)
        }
    } catch (e) {

    }

}

async function saveToStorage(newItemsList) {
    try {
        // 从 chrome.storage.local 读取现有的 itemsList
        const result = await chrome.storage.local.get(['itemsList']);
        let currentItemsList = result.itemsList || [];

        // 将新数据追加到现有的数据列表中
        currentItemsList = currentItemsList.concat(newItemsList);

        // 将更新后的数据列表写回到 chrome.storage.local
        await chrome.storage.local.set({itemsList: currentItemsList});
        // console.log('Updated items list stored in storage.');
        await logItemsListLength()
    } catch (error) {
        console.error('Error updating and storing items list:', error);
    }
}

async function logItemsListLength() {
    try {
        const result = await chrome.storage.local.get(['itemsList']);
        const currentItemsList = result.itemsList || [];
        console.log(`Total items list length: ${currentItemsList.length}`);
    } catch (error) {
        console.error('Error getting items list length:', error);
    }
}


// background send message to content
// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {action: 'fetchNewsData'}, function (response) {
//         if (chrome.runtime.lastError) {
//             console.error(chrome.runtime.lastError.message);
//         } else {
//             console.log(response);
//         }
//     });
// });


