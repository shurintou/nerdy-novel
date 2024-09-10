<template>
  <div>
    <LayoutHeader/>
    <slot />
    <LayoutFooter/>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped></style>
