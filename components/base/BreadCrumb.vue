<template>
  <nav aria-label="breadcrumb" class="breadcrumb">
    <span> 当前位置： </span>
    <template v-for="(breadcrumb, index) in breadCrumbs" :key="breadcrumb.name">
      <a v-if="index < breadCrumbs.length - 1" :href="breadcrumb.path" class="breadcrumb-item">
        <span class="breadcrumb-text">{{ breadcrumb.name }}</span>
      </a>
      <span v-else class="breadcrumb-item">
        {{ breadcrumb.name }}
      </span>
    </template>
  </nav>
</template>

<script lang="ts" setup>
const { breadCrumbs } = useBreadCrumb()
</script>

<style lang="css" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 10px auto 0px auto;
  background-color: var(--background-color-light);
  border-radius: 6px;
  position: sticky;
  top: 0px;
}

.breadcrumb-item {
  margin-right: 6px;
  text-decoration: none;
}

.breadcrumb-item:hover .breadcrumb-text {
  color: #007bff;
}

.breadcrumb-text {
  text-decoration: underline;
}

.breadcrumb-item::after {
  content: "/";
  color: var(--bread-crumb-link-color-light);
}

.breadcrumb-item:last-child::after {
  content: '';
  margin-left: 0;
}

.breadcrumb span {
  color: var(--bread-crumb-link-color-light);
  margin-right: 6px;
}

#app-container.dark-mode .breadcrumb span {
  color: var(--bread-crumb-link-color-dark);

}

#app-container.dark-mode .breadcrumb-item::after {
  color: var(--bread-crumb-link-color-dark);
}

#app-container.dark-mode .breadcrumb-item:hover .breadcrumb-text {
  color: #007bff;
  text-decoration: underline;
}

#app-container.dark-mode .breadcrumb {
  background-color: var(--background-color-dark);
}
</style>
