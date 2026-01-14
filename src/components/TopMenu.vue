<template>
  <div class="sidebar">
    <div class="mobile-header">
      <router-link to="/" class="home-link">在线工具箱</router-link>
      <span class="menu-toggle" @click="toggleMenu">⋯</span>
    </div>
    <div class="sidebar-title desktop-only">
      <router-link to="/" class="home-link">在线工具箱</router-link>
    </div>
    <ul class="menu-tree" :class="{ 'mobile-hidden': !menuOpen }">
      <li v-for="category in categories" :key="category.name" class="category">
        <div class="category-title">{{ category.name }}</div>
        <ul class="tools">
          <li v-for="tool in category.tools" :key="tool.path">
            <router-link 
              :to="tool.path" 
              :class="{ active: $route.path === tool.path }"
              @click="closeMenu"
            >
              {{ tool.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const categories = [
  {
    name: '编码工具',
    tools: [
      { name: 'Base64 编解码', path: '/base64' },
      { name: 'URL 编解码', path: '/url' },
      { name: 'JSON 格式化', path: '/json' }
    ]
  },
  {
    name: '生成器',
    tools: [
      { name: 'UUID 生成器', path: '/uuid' },
      { name: 'Hash 摘要', path: '/hash' },
      { name: '时间戳转换', path: '/timestamp' },
      { name: '姓名生成器', path: '/name' },
      { name: '密码生成器', path: '/password' },
      { name: '随机数生成器', path: '/random' },
      { name: '密钥生成器', path: '/key' }
    ]
  },
  {
    name: '实用工具',
    tools: [
      { name: '倒计时', path: '/countdown' }
    ]
  }
]
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: white;
  border-right: 1px solid #aaa;
  height: 100%;
  overflow-y: auto;
}

.mobile-header {
  display: none;
}

.desktop-only {
  display: block;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #aaa;
    position: relative;
  }
  
  .mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f9f9f9;
    border-bottom: 1px solid #aaa;
    cursor: pointer;
  }
  
  .desktop-only {
    display: none;
  }
  
  .menu-toggle {
    font-size: 20px;
    font-weight: bold;
  }
  
  .menu-tree.mobile-hidden {
    display: none;
  }
  
  .menu-tree {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 1000;
    overflow-y: auto;
    padding-top: 60px;
  }
}

.sidebar-title {
  padding: 12px;
  font-weight: bold;
  border-bottom: 1px solid #aaa;
  background: #f9f9f9;
}

.home-link {
  color: #0645ad;
  text-decoration: none;
}

.home-link:hover {
  text-decoration: underline;
}

.menu-tree {
  list-style: none;
  margin: 0;
  padding: 0;
}

.category {
  border-bottom: 1px solid #eee;
}

.category-title {
  padding: 8px 12px;
  font-weight: bold;
  background: #f5f5f5;
  font-size: 11px;
}

.tools {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tools a {
  display: block;
  padding: 6px 20px;
  text-decoration: none;
  color: #0645ad;
  font-size: 11px;
  border-bottom: 1px solid #f0f0f0;
}

.tools a:hover {
  background: #f0f0f0;
  text-decoration: underline;
}

.tools a.active {
  background: #e0e0e0;
  font-weight: bold;
}
</style>