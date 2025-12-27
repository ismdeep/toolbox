<template>
  <div class="tool-content">
    <div class="tool-section">
      <label>输入 JSON：</label>
      <textarea v-model="input" rows="6" placeholder="请输入JSON字符串"></textarea>
      <div class="buttons">
        <button @click="format">格式化</button>
        <button @click="minify">压缩</button>
      </div>
      <label>输出结果：</label>
      <textarea v-model="output" rows="6" readonly></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')

const format = () => {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, 2)
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}

const minify = () => {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}
</script>