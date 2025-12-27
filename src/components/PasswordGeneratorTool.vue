<template>
  <div class="tool-content">
    <div class="tool-section">
      <div style="margin-bottom: 15px;">
        <label>密码长度：</label>
        <input type="number" v-model="length" min="4" max="128" style="width: 80px; margin-right: 10px;">
        <label>生成数量：</label>
        <input type="number" v-model="count" min="1" max="50" style="width: 80px;">
      </div>
      
      <div class="buttons">
        <button @click="generatePassword('pin')">PIN码 (4位数字)</button>
        <button @click="generatePassword('number')">纯数字密码</button>
        <button @click="generatePassword('simple')">简单字符 (字母+数字)</button>
        <button @click="generatePassword('complex')">复杂密码 (含特殊字符)</button>
        <button @click="generatePassword('letters')">纯字母密码</button>
        <button @click="generatePassword('hex')">十六进制密码</button>
        <button @click="generatePassword('memorable')">便于记忆密码</button>
        <button @click="generatePassword('apple')">苹果风格密码</button>
      </div>
      
      <div class="buttons">
        <button @click="clear">清空</button>
      </div>
      
      <label>生成结果：</label>
      <textarea v-model="output" class="result-textarea" readonly placeholder="点击按钮生成密码"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')
const length = ref(12)
const count = ref(1)

const charSets = {
  numbers: '0123456789',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  hex: '0123456789ABCDEF'
}

const memorableWords = {
  words: ['ace', 'act', 'add', 'age', 'aid', 'aim', 'air', 'all', 'and', 'ant', 'any', 'ape', 'app', 'arc', 'are', 'ark', 'arm', 'art', 'ash', 'ask', 'ate', 'bad', 'bag', 'ban', 'bar', 'bat', 'bay', 'bed', 'bee', 'bet', 'bid', 'big', 'bin', 'bit', 'box', 'boy', 'bug', 'bus', 'but', 'buy', 'cab', 'can', 'cap', 'car', 'cat', 'cow', 'cry', 'cup', 'cut', 'dad', 'day', 'den', 'dew', 'did', 'die', 'dig', 'dim', 'dog', 'dot', 'dry', 'dub', 'due', 'dug', 'ear', 'eat', 'egg', 'elf', 'elk', 'elm', 'end', 'era', 'eve', 'eye', 'fab', 'fad', 'fan', 'far', 'fat', 'fax', 'fed', 'fee', 'few', 'fig', 'fin', 'fit', 'fix', 'fly', 'fog', 'for', 'fox', 'fun', 'fur', 'gap', 'gas', 'gel', 'gem', 'get', 'gig', 'gin', 'got', 'gum', 'gun', 'gut', 'guy', 'gym', 'had', 'ham', 'hat', 'hay', 'hen', 'her', 'hid', 'him', 'hip', 'his', 'hit', 'hop', 'hot', 'how', 'hub', 'hug', 'hut', 'ice', 'icy', 'ill', 'ink', 'inn', 'ion', 'its', 'ivy', 'jab', 'jam', 'jar', 'jaw', 'jet', 'jig', 'job', 'jog', 'joy', 'jug', 'key', 'kid', 'kit', 'lab', 'lad', 'lap', 'law', 'lay', 'led', 'leg', 'let', 'lid', 'lie', 'lip', 'lit', 'log', 'lot', 'low', 'mad', 'man', 'map', 'mat', 'max', 'may', 'men', 'met', 'mix', 'mob', 'mod', 'mom', 'mud', 'mug', 'nap', 'net', 'new', 'nod', 'nor', 'not', 'now', 'nut', 'oak', 'odd', 'off', 'oil', 'old', 'one', 'opt', 'orb', 'ore', 'our', 'out', 'owl', 'own', 'pad', 'pan', 'pat', 'paw', 'pay', 'pea', 'pen', 'pet', 'pie', 'pig', 'pin', 'pit', 'pod', 'pop', 'pot', 'pub', 'pug', 'pun', 'pup', 'put', 'rag', 'ram', 'ran', 'rap', 'rat', 'raw', 'ray', 'red', 'rib', 'rid', 'rim', 'rip', 'rob', 'rod', 'rot', 'row', 'rub', 'rug', 'rum', 'run', 'rut', 'sad', 'sag', 'sat', 'saw', 'say', 'sea', 'see', 'set', 'sew', 'she', 'shy', 'sin', 'sip', 'sir', 'sit', 'six', 'ski', 'sky', 'sly', 'sob', 'sod', 'son', 'soy', 'spa', 'spy', 'sub', 'sum', 'sun', 'tab', 'tag', 'tan', 'tap', 'tar', 'tax', 'tea', 'ten', 'the', 'tie', 'tin', 'tip', 'toe', 'ton', 'too', 'top', 'toy', 'try', 'tub', 'tug', 'two', 'use', 'van', 'vat', 'vet', 'via', 'vie', 'wag', 'war', 'was', 'wax', 'way', 'web', 'wed', 'wet', 'who', 'why', 'wig', 'win', 'wit', 'won', 'wow', 'yak', 'yam', 'yap', 'yaw', 'yea', 'yes', 'yet', 'you', 'zap', 'zen', 'zip', 'zoo', 'apple', 'beach', 'chair', 'dance', 'eagle', 'flame', 'grape', 'house', 'image', 'juice', 'knife', 'lemon', 'mouse', 'night', 'ocean', 'piano', 'queen', 'river', 'smile', 'table', 'uncle', 'voice', 'water', 'youth', 'zebra']
}

const generatePassword = (type) => {
  const passwords = []
  
  for (let i = 0; i < count.value; i++) {
    let password = ''
    
    if (type === 'memorable') {
      // 生成便于记忆的密码：3-4个单词，部分单词后直接连接数字
      const parts = []
      const wordCount = Math.random() < 0.5 ? 3 : 4
      
      for (let j = 0; j < wordCount; j++) {
        let word = memorableWords.words[Math.floor(Math.random() * memorableWords.words.length)]
        
        // 30%概率在单词后直接连接数字
        if (Math.random() < 0.3) {
          const num = Math.floor(Math.random() * 100)
          word += num
        }
        
        parts.push(word)
      }
      
      password = parts.join('-')
    } else if (type === 'apple') {
      // 生成苹果钥匙串风格密码：20位，2个破折号，1个大写字母，1个数字
      // 排除相似字符，使用容易发音的字符
      const easyChars = 'abcdefghjkmnpqrstuvwxyz' // 排除 i, l, o
      const easyNumbers = '23456789' // 排除 0, 1
      const easyUppercase = 'ABCDEFGHJKMNPQRSTUVWXYZ' // 排除 I, L, O
      
      // 生成 6-6-6 格式，共18个字符 + 2个破折号 = 20位
      const parts = []
      
      for (let part = 0; part < 3; part++) {
        let partStr = ''
        for (let j = 0; j < 6; j++) {
          partStr += easyChars.charAt(Math.floor(Math.random() * easyChars.length))
        }
        parts.push(partStr)
      }
      
      // 在随机位置放置1个大写字母
      const upperPos = Math.floor(Math.random() * 18)
      const upperChar = easyUppercase.charAt(Math.floor(Math.random() * easyUppercase.length))
      
      // 在随机位置放置1个数字
      let numPos = Math.floor(Math.random() * 18)
      while (numPos === upperPos) {
        numPos = Math.floor(Math.random() * 18)
      }
      const numChar = easyNumbers.charAt(Math.floor(Math.random() * easyNumbers.length))
      
      // 组合所有字符
      let allChars = parts.join('')
      let charArray = allChars.split('')
      charArray[upperPos] = upperChar
      charArray[numPos] = numChar
      
      // 重新分组为 6-6-6 格式
      password = charArray.slice(0, 6).join('') + '-' + 
                charArray.slice(6, 12).join('') + '-' + 
                charArray.slice(12, 18).join('')
    } else {
      let chars = ''
      let passwordLength = length.value
      
      switch (type) {
        case 'pin':
          chars = charSets.numbers
          passwordLength = 4
          break
        case 'number':
          chars = charSets.numbers
          break
        case 'simple':
          chars = charSets.numbers + charSets.lowercase + charSets.uppercase
          break
        case 'complex':
          chars = charSets.numbers + charSets.lowercase + charSets.uppercase + charSets.special
          break
        case 'letters':
          chars = charSets.lowercase + charSets.uppercase
          break
        case 'hex':
          chars = charSets.hex
          break
      }
      
      for (let j = 0; j < passwordLength; j++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
    }
    
    passwords.push(password)
  }
  
  if (output.value) {
    output.value += '\n' + passwords.join('\n')
  } else {
    output.value = passwords.join('\n')
  }
}

const clear = () => {
  output.value = ''
}
</script>

<style scoped>
.tool-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.result-textarea {
  flex: 1;
  min-height: 200px;
  height: calc(100vh - 300px) !important;
}

input[type="number"] {
  padding: 5px;
  border: 1px solid #aaa;
  font-size: 13px;
}
</style>