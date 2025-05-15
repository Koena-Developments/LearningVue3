<template>
  <!-- <div class="item">
    <img :src="cartItem.image" :alt="cartItem.title" />
    <div>{{ cartItem.title }}</div>
    <div>R{{ cartItem.price.toFixed(2) }}</div>
  </div> -->
  <div class="cartTab">
      <h1>Shopping Cart</h1>
      <div class="listCart">
        <div class="item" v-for="item in cart" :key="item.id">
          <img :src="item.image" alt="Product image" />
          <div>{{ item.title }}</div>
          <div>R{{ item.price }}</div>
        </div>
      </div>
      <div class="btn">
        <button class="close" @click="clearCart">CLOSE</button>
        <button class="checkOut" @click="checkout">Check Out</button>
      </div>
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
  },
  methods:{
    clearCart() {
      this.cart = [];
      this.counter = 0;
      this.total = 0;
      document.body.classList.remove('activeTabCart');
    },
      handleAddToCartSimilar(prod) {
      this.cart.push(prod);
      this.counter = this.cart.length;
      this.calculateTotal();
      document.body.classList.add('activeTabCart');
    },

     handleRemoveSimilarProduct(productToRemove) {
      const indexToRemove = this.similarProducts.findIndex((product) => product.id === productToRemove.id);
      if (indexToRemove !== -1)
      {
        this.similarProducts.splice(indexToRemove, 1);
      }
    },
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


.listCart {
  overflow-y: auto;
  padding: 10px;
}

.listCart::-webkit-scrollbar {
  width: 0;
}

.listCart .item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #555;
}

.listCart .item:last-child {
  border-bottom: none;
}

.listCart .item img {
  width: 60px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.listCart .item div:nth-child(2) {
  flex-grow: 1;
  text-align: left;
}

.listCart .item div:nth-child(3) {
  font-weight: bold;
}

.cartTab {
  width: 400px;
  max-width: 90%;
  background-color: #353432;
  color: #eee;
  position: fixed;
  top: 0;
  right: -100%;
  bottom: 0;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
}

body.activeTabCart .cartTab {
  transform: translateX(-100%);
}

body.activeTabCart .container {
  transform: translateX(-200px);
}

.cartTab h1 {
  padding: 20px;
  margin: 0;
  font-weight: 300;
  text-align: center;
}

.cartTab .btn {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.cartTab button {
  background-color: #E8BC0E;
  border: none;
  font-family: Poppins;
  font-weight: 500;
  cursor: pointer;
  padding: 15px 0;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.cartTab button:hover {
  background-color: #d1a608;
}

.cartTab .close {
  background-color: #eee;
  color: #333;
}

.cartTab .close:hover {
  background-color: #ddd;
}
</style>