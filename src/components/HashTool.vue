<template>
  <div class="tool-content">
    <div class="tool-section">
      <label>输入文本：</label>
      <textarea v-model="input" rows="6" placeholder="请输入要计算摘要的文本"></textarea>
      <div class="buttons">
        <button @click="generateMD5">MD5</button>
        <button @click="generateHash('SHA-1')">SHA1</button>
        <button @click="generateHash('SHA-256')">SHA256</button>
        <button @click="generateHash('SHA-512')">SHA512</button>
        <button @click="generateAll" style="margin-left: 20px; background: #e6f3ff;">计算所有</button>
      </div>
      <label>摘要结果：</label>
      <textarea v-model="output" rows="6" readonly></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CryptoJS from 'crypto-js'

const input = ref('')
const output = ref('')

const generateMD5 = () => {
  if (!input.value) {
    output.value = 'Error: 请输入要计算摘要的文本'
    return
  }
  
  try {
    const hash = CryptoJS.MD5(input.value).toString()
    output.value = `MD5: ${hash}`
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}

const generateHash = async (algorithm) => {
  if (!input.value) {
    output.value = 'Error: 请输入要计算摘要的文本'
    return
  }
  
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(input.value)
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    output.value = `${algorithm}: ${hashHex}`
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}

const generateAll = async () => {
  if (!input.value) {
    output.value = 'Error: 请输入要计算摘要的文本'
    return
  }
  
  try {
    const results = []
    
    // MD5
    const md5Hash = CryptoJS.MD5(input.value).toString()
    results.push(`MD5: ${md5Hash}`)
    
    // SHA algorithms
    const encoder = new TextEncoder()
    const data = encoder.encode(input.value)
    
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data)
    const sha1Array = Array.from(new Uint8Array(sha1Buffer))
    const sha1Hex = sha1Array.map(b => b.toString(16).padStart(2, '0')).join('')
    results.push(`SHA-1: ${sha1Hex}`)
    
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
    const sha256Array = Array.from(new Uint8Array(sha256Buffer))
    const sha256Hex = sha256Array.map(b => b.toString(16).padStart(2, '0')).join('')
    results.push(`SHA-256: ${sha256Hex}`)
    
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data)
    const sha512Array = Array.from(new Uint8Array(sha512Buffer))
    const sha512Hex = sha512Array.map(b => b.toString(16).padStart(2, '0')).join('')
    results.push(`SHA-512: ${sha512Hex}`)
    
    output.value = results.join('\n')
  } catch (e) {
    output.value = 'Error: ' + e.message
  }
}
</script>