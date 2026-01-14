<script setup>
import TopMenu from './components/TopMenu.vue'
import { useRoute } from 'vue-router'
import { computed, watchEffect } from 'vue'

const route = useRoute()

const toolNames = {
  '/': '在线工具箱',
  '/base64': 'Base64 编解码',
  '/url': 'URL 编解码', 
  '/json': 'JSON 格式化',
  '/uuid': 'UUID 生成器',
  '/hash': 'Hash 摘要',
  '/timestamp': '时间戳转换',
  '/name': '姓名生成器',
  '/password': '密码生成器',
  '/random': '随机数生成器',
  '/key': '密钥生成器',
  '/countdown': '倒计时'
}

const currentToolName = computed(() => {
  if (isCountdownView.value && route.query.title) {
    return decodeURIComponent(route.query.title)
  }
  return toolNames[route.path] || '在线工具箱'
})

const isCountdownView = computed(() => {
  return route.path === '/countdown' && route.query.title && route.query.start && route.query.end
})

watchEffect(() => {
  document.title = currentToolName.value
})
</script>

<template>
  <div id="globalWrapper" :class="{ 'countdown-view': isCountdownView }">
    <template v-if="isCountdownView">
      <router-view />
    </template>
    <div v-else class="layout">
      <TopMenu />
      <div class="main-content">
        <div id="content">
          <h1 class="firstHeading">{{ currentToolName }}</h1>
          <div id="bodyContent">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 重置默认样式 */
#app {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100vh !important;
  display: block !important;
  grid-template-columns: none !important;
}

body {
  display: block !important;
  place-items: unset !important;
}

/* Wikipedia Monobook 风格 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  font-size: 13px;
  background: #f9f9f9;
  color: black;
}

#globalWrapper {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}

#globalWrapper.countdown-view {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout {
  display: flex;
  height: 100%;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-content {
    flex: 1;
    min-height: 0;
  }
}

#column-content {
  flex: 1;
  width: 100%;
}

#content {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  margin: 20px;
  padding: 20px;
  background: white;
  color: black;
  border: 1px solid #aaa;
  line-height: 1.5em;
}

@media (max-width: 768px) {
  #content {
    width: calc(100% - 20px);
    height: auto;
    margin: 10px;
    padding: 15px;
  }
}

.firstHeading {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: normal;
  line-height: 1.2em;
  border-bottom: 1px solid #aaa;
  padding-bottom: 10px;
}

#bodyContent {
  width: 100%;
}



.tool-content {
  padding: 20px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-content h2 {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 15px;
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
}

.tool-section {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #aaa;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  resize: vertical;
  height: 200px;
}

.buttons {
  margin: 15px 0;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  border: 1px solid #aaa;
  background: #f9f9f9;
  cursor: pointer;
  font-size: 13px;
}

@media (max-width: 768px) {
  button {
    padding: 12px 16px;
    margin: 5px;
    font-size: 14px;
    display: inline-block;
  }
}

button:hover {
  background: #e9e9e9;
}

button:active {
  background: #d9d9d9;
}
</style>