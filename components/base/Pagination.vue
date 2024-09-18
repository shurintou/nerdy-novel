<template>
  <div class="pagination">
    <div class="pagination-numbers">
      <button :class="['pagination-number',]" :disabled="total === 1 || current === 1" @click="goToPage(1)">
        {{ firstPageText }}
      </button>

      <button @click="prevPage" :disabled="current === 1" class="pagination-button">上一{{ unit }}</button>

      <button :class="['pagination-number', 'active']"> {{ current }} </button>

      <button @click="nextPage" :disabled="current === total" class="pagination-button">下一{{ unit }}</button>

      <button v-if="total > 1" :class="['pagination-number',]" :disabled="current === total" @click="goToPage(total)">
        {{ lastPageText }}
      </button>

      <select @change="handlePageChange" @focus="handleSelectFocus" @blur="handleSelectBlur" class="pagination-select">
        <option value="" v-show="!isSelectOpen">{{ selectText }}</option>
        <option v-for="page in allPages" :key="page" :value="page">
          第{{ page }}{{ unit }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  current: {
    type: Number,
    default: 1,
  },
  unit: {
    type: String,
    default: '页'
  },
  firstPageText: {
    type: String,
    default: '首页'
  },
  lastPageText: {
    type: String,
    default: '尾页'
  },
  selectText: {
    type: String,
    default: '跳转'
  },
})

const emit = defineEmits(['page-changed'])

const prevPage = () => {
  if (props.current > 1) emit('page-changed', props.current - 1)
}

const nextPage = () => {
  if (props.current < props.total) emit('page-changed', props.current + 1)
}

const goToPage = (page: number) => {
  emit('page-changed', page)
}

const allPages = computed(() => {
  return Array.from({ length: props.total }, (_, i) => i + 1)
})

function handlePageChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const selectedPage = parseInt(target.value)
  if (!isNaN(selectedPage)) {
    goToPage(selectedPage)
    return
  }
  goToPage(1)
}

const isSelectOpen = ref(false)

function handleSelectFocus(): void {
  isSelectOpen.value = true
}

function handleSelectBlur(): void {
  isSelectOpen.value = false
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'ZCOOL KuHei', sans-serif;
  margin-bottom: 5px;
}

.pagination-numbers {
  display: flex;
  gap: 4px;
}

.pagination-select {
  font-size: 0.775rem;
  font-weight: bold;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
  color: var(--text-color-light);
  cursor: pointer;
}

.pagination-button,
.pagination-number {
  background-color: #e0e0e0;
  color: var(--text-color-light);
  border: none;
  border-radius: 8px;
  font-weight: bold;
  padding: 8px 16px;
  margin: 0 4px;
  cursor: pointer;
  font-size: 0.775rem;
}

@media (max-width: 768px) {

  .pagination-button,
  .pagination-number,
  .pagination-select {
    font-size: 0.675rem;
    padding: 4px 8px;
  }
}

.pagination-button:disabled,
.pagination-number:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-number.active {
  background-color: var(--primary-button-color);
  color: var(--text-color-dark);
}

#app-container.dark-mode .pagination-button,
#app-container.dark-mode .pagination-select,

#app-container.dark-mode .pagination-number {
  background-color: var(--novel-background-color-dark);
  color: var(--text-color-dark);
}

#app-container.dark-mode .pagination-number.active {
  background-color: var(--primary-button-color);
}
</style>
