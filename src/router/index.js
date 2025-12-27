import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Base64Tool from '../components/Base64Tool.vue'
import UrlTool from '../components/UrlTool.vue'
import JsonTool from '../components/JsonTool.vue'
import UuidTool from '../components/UuidTool.vue'
import HashTool from '../components/HashTool.vue'
import TimestampTool from '../components/TimestampTool.vue'
import NameGeneratorTool from '../components/NameGeneratorTool.vue'
import PasswordGeneratorTool from '../components/PasswordGeneratorTool.vue'
import RandomNumberTool from '../components/RandomNumberTool.vue'
import KeyGeneratorTool from '../components/KeyGeneratorTool.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/base64', component: Base64Tool },
  { path: '/url', component: UrlTool },
  { path: '/json', component: JsonTool },
  { path: '/uuid', component: UuidTool },
  { path: '/hash', component: HashTool },
  { path: '/timestamp', component: TimestampTool },
  { path: '/name', component: NameGeneratorTool },
  { path: '/password', component: PasswordGeneratorTool },
  { path: '/random', component: RandomNumberTool },
  { path: '/key', component: KeyGeneratorTool }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router