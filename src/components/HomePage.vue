<template>
  <div class="homepage">
    <div class="intro">
      <p>欢迎使用在线工具箱，选择您需要的工具：</p>
    </div>
    
    <div class="tools-grid">
      <div v-for="category in categories" :key="category.name" class="category-section">
        <h3>{{ category.name }}</h3>
        <div class="tools-list">
          <router-link 
            v-for="tool in category.tools" 
            :key="tool.path"
            :to="tool.path"
            class="tool-card"
          >
            <div class="tool-name">{{ tool.name }}</div>
            <div class="tool-desc">{{ tool.description }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    name: '编码工具',
    tools: [
      { name: 'Base64 编解码', path: '/base64', description: '支持中文等UTF-8字符的Base64编解码' },
      { name: 'URL 编解码', path: '/url', description: 'URL编码和解码工具' },
      { name: 'JSON 格式化', path: '/json', description: 'JSON美化和压缩工具' }
    ]
  },
  {
    name: '生成器',
    tools: [
      { name: 'UUID 生成器', path: '/uuid', description: '生成标准UUID字符串' },
      { name: 'Hash 摘要', path: '/hash', description: '计算MD5、SHA1、SHA256等摘要' },
      { name: '时间戳转换', path: '/timestamp', description: 'Unix时间戳与日期互转' },
      { name: '姓名生成器', path: '/name', description: '生成各国随机姓名' },
      { name: '密码生成器', path: '/password', description: '生成各种强度的随机密码' },
      { name: '随机数生成器', path: '/random', description: '生成指定范围的随机数' },
      { name: '密钥生成器', path: '/key', description: '生成RSA、AES等加密密钥' }
    ]
  }
]
</script>

<style scoped>
.homepage {
  padding: 20px 0;
}

.intro {
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
}

.category-section {
  margin-bottom: 40px;
}

.category-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
}

.tools-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.tool-card {
  display: block;
  padding: 15px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  text-decoration: none;
  color: inherit;
}

.tool-card:hover {
  background: #f0f0f0;
  border-color: #999;
}

.tool-name {
  font-weight: bold;
  color: #0645ad;
  margin-bottom: 5px;
  font-size: 14px;
}

.tool-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}
</style>