<template>
  <div class="tool-content">
    <div class="tool-section">
      <label>输入文本：</label>
      <textarea v-model="input" rows="6" placeholder="请输入要生成二维码的文本或URL"></textarea>
      <div class="buttons">
        <button @click="generate">生成二维码</button>
      </div>
      <div v-if="qrCode" style="text-align: center; margin-top: 20px;">
        <img :src="qrCode" alt="QR Code" style="max-width: 100%; border: 1px solid #ccc; padding: 10px; background: white;" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'

const input = ref('')
const qrCode = ref('')

const generate = async () => {
  if (!input.value.trim()) {
    alert('请输入内容')
    return
  }
  try {
    qrCode.value = await QRCode.toDataURL(input.value, { width: 300 })
  } catch (e) {
    alert('生成失败: ' + e.message)
  }
}
</script>
