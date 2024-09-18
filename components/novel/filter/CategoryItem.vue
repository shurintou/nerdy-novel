<template>
  <div class="categories" :class="{ 'expandable': !isTop, 'expanded': isExpanded, }">
    <p>{{ title }}</p>
    <div :class="{ 'static-category-grid': isTop, 'category-grid': !isTop, 'expanded': isExpanded, }">
      <NovelFilterItemTag v-for="category in categoryList" :text="category" />
    </div>
  </div>

</template>

<script lang="ts" setup>

defineProps({
  isTop: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  categoryList: {
    type: Array<string>,
    default: [],
  },
  queryKey: {
    type: String,
    require: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  }
})

</script>

<style lang="css" scoped>
.categories {
  background-color: var(--filter-background-color-light);
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  /* The transition property must be explicitly set here to take effect */
  transition: max-height 0.4s ease, var(--color-transition), var(--background-color-transition);
}

#app-container.dark-mode .categories {
  background-color: var(--filter-background-color-dark);
}

.expandable.categories {
  max-height: 0;
}

.expandable.categories.expanded {
  max-height: 70vh;
  transition: max-height 1.2s ease, var(--color-transition), var(--background-color-transition);
}

.static-category-grid,
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 8px;
  padding: 5px 15px 0px 15px;
}

p {
  font-size: 0.975rem;
  font-weight: 600;
  color: var(--text-color-light);
  padding: 5px 15px 0px 15px;
  margin: 0;
}

#app-container.dark-mode p {
  color: var(--text-color-dark);
}
</style>