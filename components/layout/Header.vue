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
      <ToggleDarkModeButton />
    </div>
  </header>
</template>


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
}

nav ul li a:hover {
  color: var(--primary-button-color);
}

#app-container.dark-mode header {
  background: var(--header-bg-dark);
}

#app-container.dark-mode header {
  background: var(--header-bg-dark);
}
</style>