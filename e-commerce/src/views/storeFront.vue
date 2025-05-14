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

    <SearchBar :products="fakerstore" @search="handleSearch" />

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

<script>
import ProductCard from '@/components/ProductCard.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'StoreFront',
  components: {
    ProductCard,
    ShoppingCart,
    SearchBar
  },
  data() {
    return {
      fakerstore: [],
      cart: [],
      total: 0,
      searchTerm: ''
    };
  },
  computed: {
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
      this.calculateTotal();
      document.body.classList.add('activeTabCart');
    },

    removeProduct(product) {
      const idx = this.cart.indexOf(product);
      if (idx > -1) {
        this.cart.splice(idx, 1);
        this.calculateTotal();
      }
    },

    calculateTotal() {
      this.total = this.cart.reduce((sum, p) => sum + p.price, 0);
    },

    clearCart() {
      this.cart = [];
      this.total = 0;
      document.body.classList.remove('activeTabCart');
    },

    checkout() {
      if (!this.cart.length)
        return alert('Cart is empty');
      alert(`You checked out ${this.cart.length} items totaling R${this.total.toFixed(2)}`);
      this.clearCart();
    },

    toggleSidebar() {
      document.body.classList.toggle('activeTabCart');
    },

    handleSearch(term) {
      this.searchTerm = term;
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
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
  transition: transform 0.5s;
}

svg {
  width: 30px;
}

svg:hover{
  animation: cart_shake 0.2s;
  animation-iteration-count: infinite;
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
  animation-name: cart_shake;
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

.title {
  font-size: xx-large;
}

.listProduct {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

body.activeTabCart .container {
  transform: translateX(-250px);
}

body.activeTabCart .cartTab {
  right: -80%;
}

@keyframes cart_shake {
  0% {transform: rotate(12deg);}
  100%{transform: rotate(-12deg);}
}

@media (max-width: 992px) {
  .listProduct {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .listProduct {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>