<template>
  <div class="container">
    <header>
      <div class="title">PRODUCT LIST</div>
      <div class="icon-cart" @click="toggleSidebar">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
        </svg>
        <span>{{ cart.length }}</span>
      </div>
    </header>

    <SearchBar :products="fakestore" @search="handleSearch" />

    <div class="listProduct">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        @remove-product="removeProduct"
      />
    </div>

    <ShoppingCart
      :cartItems="cart"
      :totalAmount="total"
      @close-cart="toggleSidebar"
      @checkout="checkout"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import SearchBar from '@/components/SearchBar.vue'

const fakestore  = ref([])
const cart       = ref([])    // each item will now have { id, title, price, quantity, ... }
const total      = ref(0)
const searchTerm = ref('')

const filteredProducts = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return fakestore.value.filter(p =>
    p.title.toLowerCase().includes(term)
  )
})

const fetchProducts = async () => {
  try {
    const res  = await fetch('https://fakestoreapi.com/products')
    fakestore.value = await res.json()
  } catch (e) {
    console.error('Fetch error:', e)
  }
}

// REVISED: sum up price * quantity
const calculateTotal = () => {
  total.value = cart.value.reduce(
    (sum, p) => sum + (p.price * p.quantity), 
    0
  )
}

// REVISED: merge duplicates by id and adjust quantity
const addToCart = (product, qty = 1) => {
  // find existing
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    existing.quantity += qty
  } else {
    cart.value.push({
      ...product,
      quantity: qty
    })
  }
  calculateTotal()
  document.body.classList.add('activeTabCart')
}

const removeProduct = product => {
  const idx = cart.value.findIndex(item => item.id === product.id)
  if (idx !== -1) {
    cart.value.splice(idx, 1)
    calculateTotal()
  }
}

const clearCart = () => {
  cart.value = []
  total.value = 0
  document.body.classList.remove('activeTabCart')
}

const toggleSidebar = () => {
  document.body.classList.toggle('activeTabCart')
}

const checkout = async () => {
  if (!cart.value.length) return alert('Cart is empty')

  const lineItems = cart.value.map(item => ({
    id: item.id,
    quantity: item.quantity
  }))

  const res = await fetch('http://localhost:5125/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lineItems)
  })

  if (!res.ok) {
    console.error(await res.text())
    return alert('Checkout session failed')
  }

  const { url } = await res.json()
  window.location.href = url
}

const handleSearch = term => {
  searchTerm.value = term
}

onMounted(fetchProducts)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.container {
  width: 900px;
  margin: auto;
  max-width: 90vw;
  text-align: center;
  padding-top: 10px;
  transition: transform 0.5s;
}

svg { width: 30px; }
svg:hover { animation: cart_shake 0.2s infinite; }

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
  background: red;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  top: 50%;
  right: -20px;
}

.title { font-size: xx-large; }

.listProduct {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

body.activeTabCart .container { transform: translateX(-20px); }
body.activeTabCart .cartTab { right: -59%; }

@keyframes cart_shake {
  0%   { transform: rotate(12deg); }
  100% { transform: rotate(-12deg); }
}

@media (max-width: 992px) { .listProduct { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .listProduct { grid-template-columns: repeat(2, 1fr); } }
</style>
