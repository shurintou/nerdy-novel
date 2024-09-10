<template>
  <div>
    <p>static header</p>
    <slot />
    <p>static footer</p>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped></style>
