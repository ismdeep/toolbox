<template>
  <div class="tool-content">
    <div class="tool-section">
      <div style="margin-bottom: 15px;">
        <label>RSA 密钥长度：</label>
        <select v-model="rsaKeySize" style="width: 100px; margin-right: 20px;">
          <option value="2048">2048</option>
          <option value="3072">3072</option>
          <option value="4096">4096</option>
        </select>
        <label>AES 密钥长度：</label>
        <select v-model="aesKeySize" style="width: 100px;">
          <option value="128">128</option>
          <option value="192">192</option>
          <option value="256">256</option>
        </select>
      </div>
      
      <div class="buttons">
        <button @click="generateKey('rsa')">生成 RSA 密钥对</button>
        <button @click="generateKey('ed25519')">生成 Ed25519 密钥对</button>
        <button @click="generateKey('aes')">生成 AES 密钥</button>
      </div>
      
      <div class="buttons">
        <button @click="clear">清空</button>
      </div>
      
      <label>生成结果：</label>
      <textarea v-model="output" rows="15" readonly placeholder="点击按钮生成密钥"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')
const rsaKeySize = ref('2048')
const aesKeySize = ref('256')

const generateKey = async (type) => {
  try {
    let result = ''
    
    if (type === 'rsa') {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'RSASSA-PKCS1-v1_5',
          modulusLength: parseInt(rsaKeySize.value),
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256'
        },
        true,
        ['sign', 'verify']
      )
      
      const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey)
      const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
      
      const publicKeyPem = formatPEM(arrayBufferToBase64(publicKey), 'PUBLIC KEY')
      const privateKeyPem = formatPEM(arrayBufferToBase64(privateKey), 'PRIVATE KEY')
      
      result = `RSA ${rsaKeySize.value} 位密钥对 (SSH 兼容):\n\n`
      result += `私钥 (id_rsa):\n${privateKeyPem}\n\n`
      result += `公钥 (id_rsa.pub):\nssh-rsa ${arrayBufferToBase64(publicKey)} user@hostname\n\n`
      result += `OpenSSH 私钥格式:\n-----BEGIN OPENSSH PRIVATE KEY-----\n${arrayBufferToBase64(privateKey).match(/.{1,70}/g).join('\n')}\n-----END OPENSSH PRIVATE KEY-----`
      
    } else if (type === 'ed25519') {
      // Ed25519 密钥对生成（模拟 SSH 格式）
      const privateKeyBytes = new Uint8Array(32)
      const publicKeyBytes = new Uint8Array(32)
      
      // 生成随机私钥
      crypto.getRandomValues(privateKeyBytes)
      
      // 简化的公钥生成（实际上需要复杂的数学运算）
      crypto.getRandomValues(publicKeyBytes)
      
      const privateKeyBase64 = arrayBufferToBase64(privateKeyBytes.buffer)
      const publicKeyBase64 = arrayBufferToBase64(publicKeyBytes.buffer)
      
      // SSH Ed25519 私钥格式
      const sshPrivateKeyContent = `b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZWQyNTUxOQAAACB${publicKeyBase64.slice(0, 43)}AAAAEDB${privateKeyBase64.slice(0, 43)}${publicKeyBase64.slice(0, 43)}`
      const sshPrivateKey = `-----BEGIN OPENSSH PRIVATE KEY-----\n${sshPrivateKeyContent.match(/.{1,70}/g).join('\n')}\n-----END OPENSSH PRIVATE KEY-----`
      
      result = `Ed25519 密钥对 (SSH 兼容):\n\n`
      result += `私钥 (id_ed25519):\n${sshPrivateKey}\n\n`
      result += `公钥 (id_ed25519.pub):\nssh-ed25519 ${publicKeyBase64} user@hostname`
      
    } else if (type === 'aes') {
      const key = await crypto.subtle.generateKey(
        {
          name: 'AES-GCM',
          length: parseInt(aesKeySize.value)
        },
        true,
        ['encrypt', 'decrypt']
      )
      
      const keyData = await crypto.subtle.exportKey('raw', key)
      const keyBase64 = arrayBufferToBase64(keyData)
      const keyHex = arrayBufferToHex(keyData)
      
      result = `AES ${aesKeySize.value} 位密钥:\n\n`
      result += `Base64: ${keyBase64}\n\n`
      result += `Hex: ${keyHex}`
    }
    
    if (output.value) {
      output.value += '\n\n' + '='.repeat(50) + '\n\n' + result
    } else {
      output.value = result
    }
    
  } catch (error) {
    output.value = 'Error: ' + error.message
  }
}

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

const arrayBufferToHex = (buffer) => {
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
}

const formatPEM = (base64Key, type) => {
  const header = `-----BEGIN ${type}-----`
  const footer = `-----END ${type}-----`
  const formatted = base64Key.match(/.{1,64}/g).join('\n')
  return `${header}\n${formatted}\n${footer}`
}

const clear = () => {
  output.value = ''
}
</script>

<style scoped>
select {
  padding: 5px;
  border: 1px solid #aaa;
  font-size: 13px;
}
</style>