<template>
  <div class="cart-icon">
   <span v-if="counter">{{ counter }}</span>
  </div>
</template>

<script>
export default {
  props: ['counter']
};
</script>

<style scoped>
.cart-icon {
  font-size: 1.5em;
  float: right;
}
</style>
