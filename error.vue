<template>
  <div id="app-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="layout">
      <LayoutHeader />
      <div class="error-page">
        <div class="error-content">
          <h1 class="error-hero">出错啦!</h1>
          <p class="error-message">
            错误代码:{{ errCode }}
          </p>
          <p class="error-message">
            对不起，{{ errorMsg }}
          </p>
          <button @click="handleError" class="home-btn">回到主页</button>
        </div>
      </div>
      <LayoutFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as PropType<NuxtError>
})
const handleError = () => clearError({ redirect: '/' })

const appConfig = useAppConfig()
const errCode = props.error?.statusCode || 500
const errorMsg = computed(() => {
  if (errCode === 404) {
    return `${appConfig.webError[404].statusMessage}`
  } else if (errCode.toString().startsWith('4')) {
    return `${appConfig.webError[400].statusMessage}`
  }
  return `${appConfig.webError[500].statusMessage}`
})

const { isDarkMode } = useDarkMode()
</script>

<style lang="css" scoped>
html,
body {
  margin: 0;
  height: 100%;
}

#app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: var(--background-color-light);
}

.error-content {
  text-align: center;
}

.error-hero {
  font-size: 6rem;
  color: var(--primary-button-color);
}

.error-message {
  font-size: 1.5rem;
  margin: 15px 0;
}

.home-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #6b9c8c;
  color: white;
  border-radius: 5px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
}

.home-btn:hover {
  border: none;
  background-color: rgba(94, 166, 160, 0.8);
}

#app-container.dark-mode {
  background-color: var(--background-color-dark);
  color: var(--text-color-dark);
}

#app-container.dark-mode .error-page {
  background-color: var(--background-color-dark);
}
</style>
