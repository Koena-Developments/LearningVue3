<template>
  <div class="cart-icon">
    <span v-if="counter">{{ counter }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  counter: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.cart-icon {
  font-size: 1.5em;
  float: right;
}
</style>