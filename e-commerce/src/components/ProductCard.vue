<template>
  <div class="item">
    <img :src="product.image" :alt="product.title" />
    <h2>{{ product.title }}</h2>
    <div class="price">R{{ product.price.toFixed(2) }}</div>
    <button @click="$emit('add-to-cart', product)">Add to Cart</button>
    <button @click="$emit('remove-product', product)">Remove</button>
    <router-link :to="`/product/${product.id}`"><button>View Product</button></router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

.item {
  background: #EEEEE6;
  padding: 20px;
  border-radius: 20px;
}

.item img {
  width: 90%;
  filter: drop-shadow(0 50px 20px #0009);
}

.item h2 {
  font-weight: 500;
  font-size: large;
}

.item .price {
  letter-spacing: 7px;
  font-size: small;
}

.item button {
  background: #353432;
  color: #eee;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 20px;
  cursor: pointer;
}
</style>