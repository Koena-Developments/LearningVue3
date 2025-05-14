<template>
  <div class="cartTab">
    <h1>Shopping Cart</h1>
    
    <div class="listCart">
      <CartItem v-for="(item, idx) in cartItems" :key="idx" :cartItem="item" />
    </div>

    <div class="totalAmount">R{{ totalAmount.toFixed(2) }}</div>
    <div class="btn">
      <button class="close" @click="$emit('close-cart')">CLOSE</button>
      <button class="checkOut" @click="$emit('checkout')">Check Out</button>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  name: 'ShoppingCart',
  components: {
    CartItem
  },
  props: {
    cartItems: {
      type: Array,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>

/* Styles for the shopping cart sidebar */
.cartTab {
  width: 400px;
  max-width: 50%;
  max-height: 30%; 
  background: #353432;
  color: #eee;
  position: fixed;
  top: 0;
  right: -400px;
  bottom: 0;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  transition: 0.5s;
}

.cartTab h1 {
  padding: 20px;
  margin: 0;
  font-weight: 300;
}

.listCart::-webkit-scrollbar {
  width: 0;
}

.totalAmount {
  position: fixed;
  bottom: 79%; 
  padding: 20px;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  width: 10%;
  margin-left: 34%;
  top: 26%;
}

.btn {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: fixed;
  bottom: 70%;
  width: 47%;
}

.cartTab button {
  background: #E8BC0E;
  border: none;
  font-family: Poppins;
  font-weight: 500;
  cursor: pointer;
  padding: 15px 0;
  font-size: 1em; 
  transition: 0.5s ease-in-out;
}

.cartTab button:hover {
  /* background: #E8BC0E;
  border: none;
  font-family: Poppins;
  font-weight: 500;
  cursor: pointer;
  padding: 15px 0;
  font-size: 1em;  */
  background: #8a7008; 
  
}

.cartTab .close {
  background: #eee;
  color: #333;
  transition: 0.5s ease-in;
}



.cartTab .close:hover {
  background: darkgrey;
  color: white;

}
</style>