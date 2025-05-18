<template>
  <div class="cart-container">
    <h3 class="cart-title">Cart</h3>
    <ul>
      <li
        v-for="(item, index) in cartItems"
        :key="index"
        class="cart-item"
      >
        <span>{{ item.name }}</span>
        <button
          @click="$emit('remove-item', index)"
          class="remove-button"
        >
          Remove
        </button>
      </li>
    </ul>
    <button
      @click="$emit('checkout')"
      class="checkout-button"
    >
      Checkout
    </button>
  </div>
</template>

<script setup>
// eslint-disable-next-line
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['remove-item', 'checkout']);
</script>

<style scoped>
.cart-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 1rem;
  width: 100%;
  max-width: 33%;
}

.cart-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.remove-button {
  color: #ef4444;
  text-decoration: underline transparent;
  transition: text-decoration 0.3s;
}

.remove-button:hover {
  text-decoration: underline;
}

.checkout-button {
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
}

.checkout-button:hover {
  background-color: #15803d;
}
</style>