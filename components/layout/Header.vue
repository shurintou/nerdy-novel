<template>
  <header>
    <div class="main-header header-title">
      <h1>呆书网</h1>
    </div>
    <div class="header-content">
      <nav>
        <ul>
          <li><a :href="`/`">主页</a></li>
          <li><a :href="`/novels`">全部作品</a></li>
        </ul>
      </nav>
      <div id="theme-toggle" class="theme-toggle" @click="toggleBrightnessMode">
        <i class="fas" :class="{ 'fa-sun': !isDarkMode, 'fa-moon': isDarkMode }"></i>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const localDarkModeFlagKey = 'isDarkMode'
const darkModeCookie = useCookie('isDarkMode')
const isDarkMode = ref(JSON.parse(darkModeCookie.value || 'false') === true)

// onNuxtReady(() => {
//   const localDarkModeStoredString = localStorage.getItem(localDarkModeFlagKey)
//   let localIsDarkMode = false
//   if (localDarkModeStoredString === 'true') {
//     localIsDarkMode = true
//   }
//   isDarkMode.value = localIsDarkMode
//   localStorage.setItem(localDarkModeFlagKey, JSON.stringify(localIsDarkMode))
//   document.body.classList.toggle('dark-mode', localIsDarkMode)
// })

onNuxtReady(() => {
  console.log(isDarkMode.value)
  document.body.classList.toggle('dark-mode', isDarkMode.value)
})

const toggleBrightnessMode = function () {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem(localDarkModeFlagKey, JSON.stringify(isDarkMode.value))
  darkModeCookie.value = JSON.stringify(isDarkMode.value)
  document.body.classList.toggle('dark-mode', isDarkMode.value)
}

</script>

<style lang="css" scoped>
header {
  background: var(--header-bg-light);
  padding: 10px 20px;
  transition: color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-header {
  max-width: 1200px;
  margin: 0 auto;
}

.header-title {
  text-align: left;
  margin-bottom: 10px;
}

.header-title h1 {
  margin: 0;
  color: #f8f8f8;
  font-size: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  flex-grow: 1;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline;
}

nav ul li a {
  text-decoration: none;
  color: #f8f8f8;
  font-weight: 500;
  padding: 8px 16px;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: var(--primary-button-color);
}

body.dark-mode header {
  background: var(--header-bg-dark);
}

.theme-toggle {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s;
}

.theme-toggle:focus {
  outline: none;
}

.fa-sun {
  color: #f6f6f6;
}

.fa-moon {
  color: #ffdf5d;
}

body.dark-mode header {
  background: var(--header-bg-dark);
}
</style>