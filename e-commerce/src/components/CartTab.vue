<template>
  <div class="cart-tab">
    <h2>Cart</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        {{ item.title }} - R{{ item.price.toFixed(2) }}
      </li>
    </ul>
    <p><strong>Total: R{{ total.toFixed(2) }}</strong></p>
    <button @click="$emit('clear-cart')">Clear Cart</button>
    <button @click="$emit('checkout')">Checkout</button>
  </div>
</template>

<script>
export default {
  props: ['cart', 'total']
};
</script>

<style scoped>
.cart-tab {
  background: #f0f0f0;
  padding: 1em;
  margin-top: 2em;
}
</style>
