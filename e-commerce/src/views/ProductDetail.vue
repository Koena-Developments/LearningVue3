<template>
  <div class="container">
    <header>
      <div class="title">PRODUCT DETAIL</div>
      <div class="icon-cart" @click="toggleSidebar">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
        </svg>
        <span>{{ cart.length }}</span>
      </div>
    </header>

    <div class="detail" v-if="product">
      <div class="image">
        <img :src="product.image" alt="Product image" />
      </div>
      <div class="content">
        <h1 class="name">{{ product.title }}</h1>
        <div class="price">R{{ product.price }}</div>
        
        <div class="buttons">
          <button @click="addToCart(product)">
            Add To Cart
            <span>
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
              </svg>
            </span>
          </button>
        
        </div>
        <div class="description">{{ product.description }}</div>
      </div>
    </div>

    <div class="title">Similar Products</div>
    <div class="listProduct">
      <div class="item" v-for="sim in similarProducts" :key="sim.id">
        <img :src="sim.image" alt="Similar product" />
        <h2>{{ sim.title }}</h2>
        <div class="price">R{{ sim.price }}</div>
        <button @click="addToCart(sim)">Add to Cart</button>
        <router-link :to="`/product/${sim.id}`"><button>View</button></router-link>
      </div>
    </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ id: { type: [String, Number], required: true } })

const product = ref(null)
const similarProducts = ref([])
const cart = ref([])
const total = ref(0)

const fetchProduct = async (productId) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`)
    product.value = await res.json()
    fetchSimilar()
  } catch (e) { console.error(e) }
}
const fetchSimilar = async () => {
  if (!product.value) return
  const res = await fetch('https://fakestoreapi.com/products')
  const all = await res.json()
  similarProducts.value = all.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0,4)
}

const calculateTotal = () => { total.value = cart.value.reduce((sum,p) => sum+p.price,0) }
const addToCart = (item) => { cart.value.push(item); calculateTotal(); document.body.classList.add('activeTabCart') }
const clearCart = () => { cart.value=[]; total.value=0; document.body.classList.remove('activeTabCart') }
const checkout = () => { if(!cart.value.length) return alert('Cart is empty'); alert(`Checked out ${cart.value.length} items totaling R${total.value.toFixed(2)}`); clearCart() }
const toggleSidebar = () => { document.body.classList.toggle('activeTabCart') }

const route = useRoute()
onMounted(() => fetchProduct(props.id))
watch(() => route.params.id, id=>fetchProduct(id))
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
}
.container {
  width: 900px;
  margin: auto;
  max-width: 90vw;
  text-align: center;
  padding-top: 10px;
  transition: transform .5s;
}
svg {
  width: 30px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.icon-cart {
  position: relative;
  cursor: pointer;
}
.icon-cart span {
  position: absolute;
  background-color: red;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  top: 50%;
  right: -20px;
}

.title {
  font-size: 2em;
  margin: 20px 0;
}

img {
  margin: 20px 0;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  text-align: left;
  margin-bottom: 30px;
}

.image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
}

.content {
  padding-left: 30px;
  margin-top: 0;
}

.name {
  font-size: 2.5em;
  margin: 0 0 10px;
  color: #333;
}

.price {
  font-weight: bold;
  font-size: 1.5em;
  letter-spacing: 3px;
  margin-bottom: 25px;
  color: black;
}

.buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.buttons button {
  background-color: #f0c14b;
  color: #333;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-family: Poppins;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buttons button:hover {
  background-color: #ddb347;
}

.buttons svg {
  width: 18px;
  margin-left: 5px;
}

.buttons span {
  display: flex;
  align-items: center;
}

.description {
  font-weight: 300;
  line-height: 1.6;
  color: #555;
}

.listProduct {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.listProduct .item {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.listProduct .item img {
  width: 80%;
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.listProduct .item h2 {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #333;
}

.listProduct .item .price {
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
}

.listProduct .item button {
  background-color: #f0c14b;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
  margin: 5px;
}

.listProduct .item button:hover {
  background-color: #ddb347;
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

/* Responsive */
@media only screen and (max-width: 992px) {
  .detail {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .content {
    padding-left: 0;
  }

  .image {
    display: flex;
    justify-content: center;
  }

  .image img {
    max-width: 70%;
  }

  .listProduct {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media only screen and (max-width: 767px) {
  .buttons {
    flex-direction: column;
    align-items: center;
  }

  .buttons button {
    width: 80%;
  }
}
</style>