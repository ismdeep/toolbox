<template>
  <div class="tool-content">
    <div class="tool-section">
      <label>当前时间戳：</label>
      <div style="margin-bottom: 15px;">
        <input type="text" v-model="currentTimestamp" readonly style="width: 200px; margin-right: 10px;">
        <button @click="copyCurrentTimestamp">复制</button>
      </div>
      
      <label>时间戳转日期：</label>
      <div style="margin-bottom: 15px;">
        <input type="text" v-model="timestampInput" placeholder="输入时间戳" style="width: 200px; margin-right: 10px;">
        <button @click="timestampToDate">转换</button>
      </div>
      <textarea v-model="timestampResult" rows="3" readonly></textarea>
      
      <label>日期转时间戳：</label>
      <div style="margin-bottom: 15px;">
        <input type="text" v-model="dateInput" placeholder="输入任意格式的日期时间" style="width: 300px; margin-right: 10px;">
        <button @click="dateToTimestamp">转换</button>
      </div>
      <textarea v-model="dateResult" rows="3" readonly></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTimestamp = ref('')
const timestampInput = ref('')
const timestampResult = ref('')
const dateInput = ref('')
const dateResult = ref('')

const updateCurrentTime = () => {
  currentTimestamp.value = Math.floor(Date.now() / 1000).toString()
}

const copyCurrentTimestamp = async () => {
  try {
    await navigator.clipboard.writeText(currentTimestamp.value)
  } catch (e) {
    // 备用方案
    const textArea = document.createElement('textarea')
    textArea.value = currentTimestamp.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

const timestampToDate = () => {
  if (!timestampInput.value) {
    timestampResult.value = 'Error: 请输入时间戳'
    return
  }
  
  try {
    const timestamp = parseInt(timestampInput.value)
    const date = new Date(timestamp * 1000)
    const shanghaiTime = date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    timestampResult.value = `本地时间: ${date.toLocaleString()}\n上海时间: ${shanghaiTime}\nUTC时间: ${date.toUTCString()}\nISO格式: ${date.toISOString()}`
  } catch (e) {
    timestampResult.value = 'Error: 无效的时间戳'
  }
}

const dateToTimestamp = () => {
  if (!dateInput.value) {
    dateResult.value = 'Error: 请输入日期时间'
    return
  }
  
  try {
    const date = new Date(dateInput.value)
    if (isNaN(date.getTime())) {
      dateResult.value = 'Error: 无效的日期格式'
      return
    }
    const milliseconds = date.getTime()
    const seconds = Math.floor(milliseconds / 1000)
    const nanoseconds = milliseconds * 1000000
    dateResult.value = `秒级时间戳: ${seconds}\n毫秒级时间戳: ${milliseconds}\n纳秒级时间戳: ${nanoseconds}`
  } catch (e) {
    dateResult.value = 'Error: 无效的日期'
  }
}

onMounted(() => {
  updateCurrentTime()
  setInterval(updateCurrentTime, 1000)
})
</script>

<style scoped>
input[type="text"], input[type="datetime-local"] {
  padding: 5px;
  border: 1px solid #aaa;
  font-size: 13px;
}
</style>