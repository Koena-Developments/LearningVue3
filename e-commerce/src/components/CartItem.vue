<template>
  <div class="item">
    <img :src="cartItem.image" :alt="cartItem.title" />
    <div>{{ cartItem.title }}</div>
    <div>R{{ cartItem.price.toFixed(2) }}</div>
  </div>

  
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

.item {
  display: grid;
  grid-template-columns: 70px 1fr 50px;
  gap: 10px;
  text-align: center;
  align-items: center;
  padding: 10px;
}

.item img {
  width: 100%;
}
</style>