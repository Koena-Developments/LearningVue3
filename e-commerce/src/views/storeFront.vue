<template>
  <div class="container">
    <header>
      <div class="title">PRODUCT LIST</div>
      <div class="icon-cart" @click="toggleSidebar">
        <!-- Cart Icon -->
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
        </svg>
        <span>{{ counter }}</span>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search products..."
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
        <li
          v-for="s in filteredSuggestions"
          :key="s.id"
          @mousedown.prevent="selectSuggestion(s)"
        >
          {{ s.title }}
        </li>
      </ul>
    </div>

    <!-- Product Grid -->
    <div class="listProduct">
      <div class="item" v-for="product in filteredProducts" :key="product.id">
        <img :src="product.image" alt="Product image" />
        <h2>{{ product.title }}</h2>
        <div class="price">R{{ product.price.toFixed(2) }}</div>
        <button @click="addToCart(product)">Add to Cart</button>
        <button class="danger" @click="removeProduct(product)">Remove</button>
        <router-link :to="`/product/${product.id}`"><button>View Product</button></router-link>
      </div>
    </div>

    <!-- Cart Sidebar -->
    <div class="cartTab">
      <h1>Shopping Cart</h1>
      <div class="listCart">
        <div class="item" v-for="(item, idx) in cart" :key="idx">
          <img :src="item.image" alt="Product image" />
          <div>{{ item.title }}</div>
          <div>R{{ item.price.toFixed(2) }}</div>
        </div>
      </div>
      <div class="btn">
        <button class="close" @click="clearCart">CLOSE</button>
        <button class="checkOut" @click="checkout">Check Out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreFront',
  data() {
    return {
      fakerstore: [],
      cart: [],
      counter: 0,
      total: 0,
      searchTerm: '',
      showSuggestions: false
    };
  },
  computed: {
    filteredSuggestions() {
      const term = this.searchTerm.toLowerCase();
      return this.fakerstore
        .filter(p => p.title.toLowerCase().includes(term))
        .slice(0, 5);
    },
    filteredProducts() {
      const term = this.searchTerm.toLowerCase();
      return this.fakerstore.filter(p => p.title.toLowerCase().includes(term));
    }
  },
  methods: {
    fetchProducts() {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => (this.fakerstore = data));
    },
    addToCart(product) {
      this.cart.push(product);
      this.counter = this.cart.length;
      this.calculateTotal();
      document.body.classList.add('activeTabCart');
    },
    removeProduct(product) {
      const idx = this.cart.indexOf(product);
      if (idx > -1) {
        this.cart.splice(idx, 1);
        this.counter = this.cart.length;
        this.calculateTotal();
      }
    },
    calculateTotal() {
      this.total = this.cart.reduce((sum, p) => sum + p.price, 0);
    },
    clearCart() {
      this.cart = [];
      this.counter = 0;
      this.total = 0;
      document.body.classList.remove('activeTabCart');
    },
    checkout() {
      if (!this.counter) return alert('Cart is empty');
      alert(`You checked out ${this.counter} items totaling R${this.total.toFixed(2)}`);
      this.clearCart();
    },
    toggleSidebar() {
      document.body.classList.toggle('activeTabCart');
    },
    selectSuggestion(item) {
      this.searchTerm = item.title;
      this.showSuggestions = false;
      // Optionally scroll to or highlight the product card
    },
    hideSuggestions() {
      setTimeout(() => (this.showSuggestions = false), 200);
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
body { margin: 0; font-family: 'Poppins', sans-serif; }
.container { width: 900px; margin: auto; max-width: 90vw; text-align: center; padding-top: 10px; transition: transform .5s; }
svg { width: 30px; }
header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
.icon-cart { position: relative; cursor: pointer; }
.icon-cart span { position: absolute; background: red; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: #fff; top: 50%; right: -20px; }
.title { font-size: xx-large; }
.search-container { position: relative; margin: 20px 0; }
.search-container input { width: 100%; padding: 10px 14px; border-radius: 24px; border: 1px solid #ccc; box-shadow: 0 2px 6px rgba(0,0,0,0.1); font-size: 16px; }
.search-container .suggestions { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-top: none; max-height: 200px; overflow-y: auto; z-index: 10; }
.search-container .suggestions li { padding: 8px 12px; cursor: pointer; }
.search-container .suggestions li:hover { background: #f0f0f0; }
.listProduct { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.listProduct .item { background: #EEEEE6; padding: 20px; border-radius: 20px; }
.listProduct .item img { width: 90%; filter: drop-shadow(0 50px 20px #0009); }
.listProduct .item h2 { font-weight: 500; font-size: large; }
.listProduct .item .price { letter-spacing: 7px; font-size: small; }
.listProduct .item button { background: #353432; color: #eee; border: none; padding: 5px 10px; margin-top: 10px; border-radius: 20px; cursor: pointer; }
button.danger { background: #e53935; margin-left: 5px; }
.cartTab { width: 400px; max-width:100%; background:#353432; color:#eee; position:fixed; top:0; right:-400px; bottom:0; display:grid; grid-template-rows:70px 1fr 70px; transition:.5s; }
body.activeTabCart .cartTab { right:0; }
body.activeTabCart .container { transform:translateX(-250px); }
.cartTab h1 { padding:20px; margin:0; font-weight:300; }
.listCart { overflow:auto; }
.listCart::-webkit-scrollbar { width:0; }
.listCart .item img { width:100%; }
.listCart .item { display:grid; grid-template-columns:70px 1fr 50px; gap:10px; text-align:center; align-items:center; padding:10px; }
.btn { display:grid; grid-template-columns:repeat(2,1fr); }
.cartTab button { background:#E8BC0E; border:none; font-family:Poppins; font-weight:500; cursor:pointer; }
.cartTab .close { background:#eee; }
@media(max-width:992px) { .listProduct { grid-template-columns:repeat(3,1fr); } }
@media(max-width:768px) { .listProduct { grid-template-columns:repeat(2,1fr); } }
</style>
