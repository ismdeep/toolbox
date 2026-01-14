<template>
  <div class="tool-content">
    <div class="tool-section" v-if="!isViewMode">
      <label>标题：</label>
      <input v-model="title" type="text" placeholder="例如：项目截止日期" />
      
      <div class="radio-group">
        <label><input type="radio" v-model="timeMode" value="range" /> 指定开始和结束时间</label>
        <label><input type="radio" v-model="timeMode" value="duration" /> 指定倒计时时长</label>
      </div>
      
      <template v-if="timeMode === 'range'">
        <label>开始时间：</label>
        <input v-model="startTime" type="datetime-local" step="1" />
        
        <label>结束时间：</label>
        <input v-model="endTime" type="datetime-local" step="1" />
      </template>
      
      <template v-else>
        <label>倒计时时长：</label>
        <div class="duration-inputs">
          <div class="duration-item">
            <input v-model.number="durationYears" type="number" min="0" />
            <span>年</span>
          </div>
          <div class="duration-item">
            <input v-model.number="durationMonths" type="number" min="0" />
            <span>月</span>
          </div>
          <div class="duration-item">
            <input v-model.number="durationDays" type="number" min="0" />
            <span>日</span>
          </div>
          <div class="duration-item">
            <input v-model.number="durationHours" type="number" min="0" />
            <span>时</span>
          </div>
          <div class="duration-item">
            <input v-model.number="durationMinutes" type="number" min="0" />
            <span>分</span>
          </div>
          <div class="duration-item">
            <input v-model.number="durationSeconds" type="number" min="0" />
            <span>秒</span>
          </div>
        </div>
      </template>
      
      <div class="buttons">
        <button @click="generateUrl">生成倒计时链接</button>
      </div>
      
      <label v-if="generatedUrl">生成的链接：</label>
      <textarea v-if="generatedUrl" v-model="generatedUrl" rows="3" readonly></textarea>
      <div class="buttons" v-if="generatedUrl">
        <button @click="copyUrl">复制链接</button>
        <button @click="openUrl">打开链接</button>
      </div>
    </div>
    
    <div class="countdown-display" v-else>
      <h1>{{ title }}</h1>
      <div class="time-info">
        <p>开始时间：{{ formatTime(startTime) }}</p>
        <p>结束时间：{{ formatTime(endTime) }}</p>
      </div>
      <div class="countdown">
        <div class="time-unit">
          <span class="number">{{ days }}</span>
          <span class="label">天</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ hours }}</span>
          <span class="label">时</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ minutes }}</span>
          <span class="label">分</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ seconds }}</span>
          <span class="label">秒</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="progress-text">已完成 {{ progress.toFixed(2) }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = ref('')
const timeMode = ref('range')
const startTime = ref('')
const endTime = ref('')
const durationYears = ref(0)
const durationMonths = ref(0)
const durationDays = ref(0)
const durationHours = ref(0)
const durationMinutes = ref(0)
const durationSeconds = ref(0)
const generatedUrl = ref('')
const currentTime = ref(Date.now())
let timer = null

const isViewMode = computed(() => route.query.title && route.query.start && route.query.end)

const days = computed(() => Math.floor(remaining.value / 86400))
const hours = computed(() => Math.floor((remaining.value % 86400) / 3600))
const minutes = computed(() => Math.floor((remaining.value % 3600) / 60))
const seconds = computed(() => remaining.value % 60)

const remaining = computed(() => {
  const end = new Date(endTime.value).getTime()
  const diff = Math.floor((end - currentTime.value) / 1000)
  return diff > 0 ? diff : 0
})

const progress = computed(() => {
  const start = new Date(startTime.value).getTime()
  const end = new Date(endTime.value).getTime()
  const total = end - start
  const elapsed = currentTime.value - start
  return total > 0 ? Math.min((elapsed / total) * 100, 100) : 0
})

const generateUrl = () => {
  if (!title.value) {
    alert('请输入标题')
    return
  }
  
  let start, end
  
  if (timeMode.value === 'duration') {
    const totalMs = 
      (durationYears.value || 0) * 365 * 24 * 60 * 60 * 1000 +
      (durationMonths.value || 0) * 30 * 24 * 60 * 60 * 1000 +
      (durationDays.value || 0) * 24 * 60 * 60 * 1000 +
      (durationHours.value || 0) * 60 * 60 * 1000 +
      (durationMinutes.value || 0) * 60 * 1000 +
      (durationSeconds.value || 0) * 1000
    
    if (totalMs === 0) {
      alert('请输入倒计时时长')
      return
    }
    
    start = Math.floor(Date.now() / 1000)
    end = Math.floor((Date.now() + totalMs) / 1000)
  } else if (!startTime.value || !endTime.value) {
    alert('请输入开始和结束时间')
    return
  } else {
    start = Math.floor(new Date(startTime.value).getTime() / 1000)
    end = Math.floor(new Date(endTime.value).getTime() / 1000)
  }
  
  const params = new URLSearchParams({
    start: start,
    end: end,
    title: encodeURIComponent(title.value)
  })
  generatedUrl.value = `${window.location.origin}/countdown?${params.toString()}`
}

const copyUrl = () => {
  navigator.clipboard.writeText(generatedUrl.value)
  alert('链接已复制')
}

const openUrl = () => {
  window.open(generatedUrl.value, '_blank')
}

const formatTime = (time) => {
  return new Date(time).toLocaleString('zh-CN')
}

onMounted(() => {
  if (isViewMode.value) {
    title.value = decodeURIComponent(route.query.title)
    startTime.value = new Date(parseInt(route.query.start) * 1000).toISOString()
    endTime.value = new Date(parseInt(route.query.end) * 1000).toISOString()
    timer = setInterval(() => {
      currentTime.value = Date.now()
    }, 1000)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.countdown-display {
  text-align: center;
  padding: 40px 20px;
}

.countdown-display h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.time-info {
  margin-bottom: 40px;
  color: #666;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.time-unit .number {
  font-size: 48px;
  font-weight: bold;
  color: #0645ad;
}

.time-unit .label {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.progress-bar {
  width: 100%;
  max-width: 600px;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  margin: 20px auto;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 1s linear;
}

.progress-text {
  color: #666;
  font-size: 14px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  cursor: pointer;
}

.duration-inputs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.duration-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.duration-item input {
  width: 60px;
}

.duration-item span {
  font-size: 14px;
  color: #666;
}
</style>
