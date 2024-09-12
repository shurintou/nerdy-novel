<template>
  <footer>
    <p>&copy; 2024 My Novel Website. All rights reserved.</p>
    <a class="back-to-top" @click="backToTop()"><i class="fas fa-arrow-up"></i></a>
  </footer>
</template>

<script setup lang="ts">
// 获取 "回到顶部" 按钮
const backToTop = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="css" scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  color: var(--text-color-light);
  background-color: var(--footer-bg-light);
  position: relative;
}

footer p {
  margin: 0;
  text-align: center;
  flex: 1;
}

footer .back-to-top {
  position: absolute;
  right: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 5px 10px;
  background-color: #555;
  border-radius: 5px;
  transition: background-color 0.3s;
}

footer .back-to-top:hover {
  cursor: pointer;
  background-color: #777;
}

#app-container.dark-mode footer {
  color: var(--text-color-dark);
  background-color: var(--background-color-dark);
}
</style>