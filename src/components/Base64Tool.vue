<template>
  <div class="tool-content">
    <div class="tool-section">
      <label>输入文本：</label>
      <textarea v-model="input" rows="6" placeholder="请输入要编码或解码的文本"></textarea>
      <div class="buttons">
        <button @click="encode">编码</button>
        <button @click="decode">解码</button>
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

const encode = () => {
  try {
    output.value = btoa(unescape(encodeURIComponent(input.value)))
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}

const decode = () => {
  try {
    output.value = decodeURIComponent(escape(atob(input.value)))
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}
</script>