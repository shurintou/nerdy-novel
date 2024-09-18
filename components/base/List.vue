<template>
  <div class="list-container">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
