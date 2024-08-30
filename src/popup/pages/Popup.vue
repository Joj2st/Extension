<template>
  <div id="app">
    <div class="common-layout">
      <el-container>
        <el-header>
          <el-row>
            <el-button type="primary" round @click="allDownloadEvent">全部下载</el-button>
            <el-button type="primary" round @click="allDeleteEvent">全部删除</el-button>
            <el-button type="primary" round @click="updateVideoTotalEvent();updateVideoDataEvent()">更新</el-button>
            <el-tag type="primary">视频数量: {{ videoTotal }}</el-tag>
          </el-row>
        </el-header>
        <el-main>
          <el-table :data="videoData" stripe style="width: 100%" height="250">
            <el-table-column prop="author" label="频道名" width="180"/>
            <el-table-column prop="videoTitle" label="视频标题" width="180"/>
            <el-table-column prop="videoUrl" label="视频地址"/>
          </el-table>
        </el-main>
      </el-container>
    </div>
  </div>

</template>
<script setup>
import MD5_Encrypt from "../../utils/md5.js";
import {onMounted, onUnmounted, ref} from "vue";

let videoTotal = ref(0);
const videoData = ref([]);

async function allDownloadEvent() {
  try {
    const result = await chrome.storage.local.get(['itemsList']);
    const itemsList = result.itemsList || [];
    console.log("下载全部")
    // 开始下载操作
    setTimeout(() => {
      itemsList.forEach((item) => {
        const videoHash = MD5_Encrypt(item.videoUrl);
        chrome.downloads.download({
          url: item.videoUrl,
          filename: `${videoHash}.mp4`,
          conflictAction: 'uniquify'
        })
      });
    }, 1000);
  } catch (error) {
    console.error('Error starting download:', error);
  }
}

async function allDeleteEvent() {
  await chrome.storage.local.clear()
  videoTotal.value = 0
  console.log("清空本地存储")
}


async function updateVideoTotalEvent() {

  const result = await chrome.storage.local.get(['itemsList']);
  const currentItemsList = result.itemsList || [];
  console.log("当前数据总数", currentItemsList.length)
  videoTotal.value = currentItemsList.length;
  // videoTotal.value = 200;
}


async function updateVideoDataEvent() {
  // const itemsList = [
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   }, {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   }, {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   },
  //   {
  //     author: '吃葡萄不吐',
  //     videoTitle: '今天买了一袋烟',
  //     videoAddress: 'https://kslalld.clsladja',
  //   }]
  // videoData.value = result.itemsList || []

  const result = await chrome.storage.local.get(['itemsList']);
  console.log("storage keys:")
  console.log(result)
  videoData.value = result.itemsList || []
}

onMounted(() => {
  updateVideoTotalEvent();
  updateVideoDataEvent()
})


</script>
<style scoped>

</style>
