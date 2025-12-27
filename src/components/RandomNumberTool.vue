<template>
  <div class="tool-content">
    <div class="tool-section">
      <div style="margin-bottom: 15px;">
        <label>自定义范围：</label>
        <input type="number" v-model="minValue" placeholder="最小值" style="width: 80px; margin-right: 5px;">
        <span>-</span>
        <input type="number" v-model="maxValue" placeholder="最大值" style="width: 80px; margin: 0 10px;">
        <label>生成数量：</label>
        <input type="number" v-model="count" min="1" max="100" style="width: 80px;">
      </div>
      
      <div class="buttons">
        <button @click="generateRandom('custom')">自定义范围</button>
        <button @click="generateRandom('hundred')">100以内随机</button>
        <button @click="generateRandom('port')">随机端口 (1024-65535)</button>
        <button @click="generateRandom('highport')">随机高位端口 (49152-65535)</button>
        <button @click="generateRandom('k8s')">K8S业务端口 (30000-32767)</button>
        <button @click="generateRandom('lottery')">彩票号码 (1-49)</button>
      </div>
      
      <div class="buttons">
        <button @click="clear">清空</button>
      </div>
      
      <label>生成结果：</label>
      <textarea v-model="output" rows="10" readonly placeholder="点击按钮生成随机数"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')
const minValue = ref(1)
const maxValue = ref(100)
const count = ref(1)

const generateRandom = (type) => {
  const numbers = []
  let min, max
  
  switch (type) {
    case 'custom':
      min = parseInt(minValue.value) || 1
      max = parseInt(maxValue.value) || 100
      if (min > max) [min, max] = [max, min]
      break
    case 'hundred':
      min = 1
      max = 100
      break
    case 'port':
      min = 1024
      max = 65535
      break
    case 'highport':
      min = 49152
      max = 65535
      break
    case 'k8s':
      min = 30000
      max = 32767
      break
    case 'lottery':
      min = 1
      max = 49
      break
  }
  
  for (let i = 0; i < count.value; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    numbers.push(randomNum)
  }
  
  if (output.value) {
    output.value += '\n' + numbers.join('\n')
  } else {
    output.value = numbers.join('\n')
  }
}

const clear = () => {
  output.value = ''
}
</script>

<style scoped>
input[type="number"] {
  padding: 5px;
  border: 1px solid #aaa;
  font-size: 13px;
}
</style>