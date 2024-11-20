<template>
  <header>
    <div class="main-header header-title">
      <h1><span class="home-page-navigation" @click="homePageNavigation">呆书网</span></h1>
    </div>
    <div class="header-content">
      <nav>
      </nav>
      <ToggleDarkModeButton />
    </div>
  </header>
</template>

<script lang="ts" setup>
const homePageNavigation = () => {
  window.location.href = '/'
}
</script>


<style lang="css" scoped>
header {
  background: var(--header-bg-light);
  padding: 10px 20px;
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

#app-container.dark-mode header {
  background: var(--header-bg-dark);
}

#app-container.dark-mode header {
  background: var(--header-bg-dark);
}

.home-page-navigation {
  cursor: pointer;
}
</style>