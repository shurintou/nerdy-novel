<template>

  <div id="theme-toggle" class="theme-toggle" @click="toggleDarkModeHandler">
    <i class="fas" :class="{ 'fa-sun': !isDarkMode, 'fa-moon': isDarkMode }"></i>
  </div>

</template>

<script lang="ts" setup>
const localStorageDarkModeKey = 'isDarkMode'
const { isDarkMode, toggleDarkMode } = useDarkMode()

onMounted(() => {
  const localStorageDarkMode = localStorage.getItem(localStorageDarkModeKey)
  isDarkMode.value = localStorageDarkMode === 'true'
})

const toggleDarkModeHandler = function () {
  toggleDarkMode()
  localStorage.setItem(localStorageDarkModeKey, JSON.stringify(isDarkMode.value))
}
</script>

<style lang="css" scoped>
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
</style>