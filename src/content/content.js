console.log('Content script is running!');
// inject
setTimeout(() => {
    try {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        //通过chrome.extension.getURL来获取包内资源的路径。需要在manifest.json文件中设置访问权限web_accessible_resources
        script.setAttribute('src', chrome.runtime.getURL('network.js'));
        document.head.appendChild(script);
    } catch (e) {
        console.log(e)
    }
}, 0);

// 监听 window.postMessage
window.addEventListener('message', async (event) =>{
    // 输出消息内容
    event.data.host = window.location.host
    await sendMessageToBackground(event.data)
}, false);

// content sendMessage to background
async function sendMessageToBackground(data) {

     chrome.runtime.sendMessage({action: "content",result:data});

}



