<template>
  <div class="tag" :class="{ 'selected': selectedCategory.indexOf(text) >= 0 }" @click="selectCategoryHandler(text)">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})

const { selectedCategory, selectCategoryHandler } = useNovelFilter()

</script>

<style lang="css" scoped>
.tag {
  padding: 5px 8px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 8px;
  background-color: #d3d3d3;
}

#app-container.dark-mode .tag {
  background-color: #3a3a3a;
}

.tag:hover {
  background-color: #ffefeb;
  color: var(--text-color-light)
}

#app-container.dark-mode .tag:hover {
  background-color: #ffefeb;
}

.tag.selected {
  background-color: #ff6f61;
  color: #fff;
}

#app-container.dark-mode .tag.selected {
  background-color: #ff6f61;
  color: #fff;
}
</style>