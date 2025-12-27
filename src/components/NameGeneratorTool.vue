<template>
  <div class="tool-content">
    <div class="tool-section">
      <div class="buttons">
        <button @click="generateName('chinese', 'male')">中文男名</button>
        <button @click="generateName('chinese', 'female')">中文女名</button>
        <button @click="generateName('english', 'male')">英文男名</button>
        <button @click="generateName('english', 'female')">英文女名</button>
        <button @click="generateName('european', 'male')">欧洲男名</button>
        <button @click="generateName('european', 'female')">欧洲女名</button>
        <button @click="generateName('japanese', 'male')">日本男名</button>
        <button @click="generateName('japanese', 'female')">日本女名</button>
        <button @click="generateName('korean', 'male')">韩国男名</button>
        <button @click="generateName('korean', 'female')">韩国女名</button>
      </div>
      <div class="buttons">
        <button @click="generateMultiple" style="background: #e6f3ff;">生成10个</button>
        <button @click="clear">清空</button>
      </div>
      <label>生成结果：</label>
      <textarea v-model="output" class="result-textarea" readonly placeholder="点击按钮生成姓名"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const output = ref('')
let lastType = { region: 'chinese', gender: 'male' }

const nameData = {
  chinese: {
    surnames: ['王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗', '欧阳', '司马', '上官', '诸葛', '东方', '独孤', '南宫', '西门', '司徒', '司空'],
    male: ['伟', '强', '磊', '军', '勇', '涛', '明', '超', '辉', '华', '建', '国', '峰', '鹏', '飞', '志', '刚', '健', '龙', '海', '宇', '轩', '浩', '然', '博', '文', '俊', '杰', '天', '宸', '睿', '智', '晨', '阳', '昊', '煜', '泽', '恒', '凯', '斌'],
    female: ['芳', '娜', '敏', '静', '丽', '婷', '艳', '莉', '雯', '倩', '颖', '慧', '琳', '萍', '红', '梅', '玲', '欣', '蕾', '洁', '雅', '怡', '悦', '诗', '涵', '语', '嫣', '妍', '瑶', '薇', '晴', '雪', '月', '星', '露', '霞', '云', '凤', '燕', '莺']
  },
  english: {
    surnames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'],
    male: ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle']
  },
  european: {
    surnames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco'],
    male: ['Hans', 'Klaus', 'Günter', 'Wolfgang', 'Helmut', 'Walter', 'Heinrich', 'Siegfried', 'Gerhard', 'Horst', 'Marco', 'Giuseppe', 'Francesco', 'Antonio', 'Mario', 'Luigi', 'Angelo', 'Vincenzo', 'Pietro', 'Salvatore'],
    female: ['Ursula', 'Ingrid', 'Helga', 'Gisela', 'Monika', 'Barbara', 'Petra', 'Sabine', 'Gabriele', 'Karin', 'Maria', 'Anna', 'Giuseppina', 'Rosa', 'Angela', 'Giovanna', 'Teresa', 'Lucia', 'Francesca', 'Paola']
  },
  japanese: {
    surnames: ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山本', '中村', '小林', '加藤', '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '清水', '山崎'],
    male: ['太郎', '次郎', '三郎', '健', '誠', '博', '明', '茂', '隆', '浩', '正', '和', '実', '豊', '学', '武', '勝', '清', '秀', '光'],
    female: ['花子', '恵子', '美子', '洋子', '裕子', '智子', '直子', '由美子', '真由美', '美穂', '愛', '美', '恵', '香', '綾', '麻衣', '彩', '舞', '桜', '美咲']
  },
  korean: {
    surnames: ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '전'],
    male: ['민수', '준호', '성민', '지훈', '현우', '동현', '승현', '재현', '태현', '우진', '시우', '도윤', '예준', '서준', '하준', '주원', '지후', '준서', '건우', '현준'],
    female: ['지은', '수진', '민정', '혜진', '은정', '소영', '미영', '정은', '예은', '다은', '서연', '지우', '하은', '소현', '예린', '채원', '지민', '서현', '유진', '수빈']
  }
}

const generateName = (region, gender) => {
  lastType = { region, gender }
  const data = nameData[region]
  const surname = data.surnames[Math.floor(Math.random() * data.surnames.length)]
  
  let name
  if (region === 'chinese') {
    // 中文名字随机生成单字或双字
    const firstChar = data[gender][Math.floor(Math.random() * data[gender].length)]
    if (Math.random() < 0.6) {
      // 60%概率生成双字名
      const secondChar = data[gender][Math.floor(Math.random() * data[gender].length)]
      name = surname + firstChar + secondChar
    } else {
      // 40%概率生成单字名
      name = surname + firstChar
    }
  } else if (region === 'japanese' || region === 'korean') {
    const firstName = data[gender][Math.floor(Math.random() * data[gender].length)]
    name = surname + firstName
  } else {
    const firstName = data[gender][Math.floor(Math.random() * data[gender].length)]
    name = firstName + ' ' + surname
  }
  
  if (output.value) {
    output.value += '\n' + name
  } else {
    output.value = name
  }
}

const generateMultiple = () => {
  const names = []
  for (let i = 0; i < 10; i++) {
    const data = nameData[lastType.region]
    const surname = data.surnames[Math.floor(Math.random() * data.surnames.length)]
    
    let name
    if (lastType.region === 'chinese') {
      // 中文名字随机生成单字或双字
      const firstChar = data[lastType.gender][Math.floor(Math.random() * data[lastType.gender].length)]
      if (Math.random() < 0.6) {
        // 60%概率生成双字名
        const secondChar = data[lastType.gender][Math.floor(Math.random() * data[lastType.gender].length)]
        name = surname + firstChar + secondChar
      } else {
        // 40%概率生成单字名
        name = surname + firstChar
      }
    } else if (lastType.region === 'japanese' || lastType.region === 'korean') {
      const firstName = data[lastType.gender][Math.floor(Math.random() * data[lastType.gender].length)]
      name = surname + firstName
    } else {
      const firstName = data[lastType.gender][Math.floor(Math.random() * data[lastType.gender].length)]
      name = firstName + ' ' + surname
    }
    names.push(name)
  }
  
  if (output.value) {
    output.value += '\n' + names.join('\n')
  } else {
    output.value = names.join('\n')
  }
}

const clear = () => {
  output.value = ''
}
</script>

<style scoped>
.result-textarea {
  height: calc(100vh - 400px);
  min-height: 200px;
  max-height: 70vh;
}
</style>