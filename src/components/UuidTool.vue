<template>
  <div class="tool-content">
    <div class="tool-section">
      <div class="buttons">
        <button @click="generateUUID">生成 UUID</button>
        <button @click="generateMultiple">生成 10 个</button>
        <button @click="clear">清空</button>
      </div>
      <label>生成结果：</label>
      <textarea v-model="output" rows="10" readonly placeholder="点击按钮生成UUID"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')

const generateUUID = () => {
  const uuid = crypto.randomUUID()
  if (output.value) {
    output.value += '\n' + uuid
  } else {
    output.value = uuid
  }
}

const generateMultiple = () => {
  const uuids = []
  for (let i = 0; i < 10; i++) {
    uuids.push(crypto.randomUUID())
  }
  if (output.value) {
    output.value += '\n' + uuids.join('\n')
  } else {
    output.value = uuids.join('\n')
  }
}

const clear = () => {
  output.value = ''
}
</script>