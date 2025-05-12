<template>
  <div class="container">
    <header>
      <div class="title">PRODUCT DETAIL</div>
      <div class="icon-cart" @click="toggleSidebar">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
        </svg>
        <span>{{ counter }}</span>
      </div>
    </header>

    <!-- product card -->
    <div class="detail">
      <div class="image" v-if="product">
        <img :src="product.image" alt="Product image" />
      </div>
      <div class="content" v-if="product">
        <h1 class="name">{{ product.title }}</h1>
        <div class="price">R{{ product.price }}</div>
        <div class="buttons">
          <button @click="handleAddToCart">
            Add To Cart
            <span>
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
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
        <!-- <div>{{ sim.id }}</div> -->
        <button @click="handleAddToCartSimilar(sim)">Add to Cart</button>
        <router-link :to="`/product/${sim.id}`"><button @Click="refreshPage()">View</button></router-link>
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

<script>
export default {
  name: 'ProductDetail',
  props: ['id'],
  data() {
    return {
      product: null,
      similarProducts: [],
      cart: [],
      counter: 0,
      total: 0
    };
  },
  methods: {
    fetchProduct() {
      fetch(`https://fakestoreapi.com/products/${this.id}`)
        .then(r => r.json())
        .then(data => {
          this.product = data;
          this.fetchSimilar();
        });
    },
    fetchSimilar() {
      if (!this.product) return;
      fetch('https://fakestoreapi.com/products')
        .then(r => r.json())
        .then(all => {
          this.similarProducts = all
            .filter(p => p.category === this.product.category && p.id !== this.product.id)
            .slice(0, 4);
        });
    },
    // does not work need to change it
    refreshPage()
    {
      window.location.reload()
    },

    handleAddToCart() {
      this.cart.push(this.product);
      this.counter = this.cart.length;
      this.calculateTotal();
      document.body.classList.add('activeTabCart');
    },

    handleAddToCartSimilar(prod) {
      this.cart.push(prod);
      this.counter = this.cart.length;
      this.calculateTotal();
      document.body.classList.add('activeTabCart');
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
      alert(`Checked out ${this.counter} items totaling R${this.total.toFixed(2)}`);
      this.clearCart();
    },
    
    toggleSidebar() {
      document.body.classList.toggle('activeTabCart');
    }
  },
  mounted() {
    this.fetchProduct();
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
  font-size: xx-large;
  margin: 20px 0;
  border: 2px solid red;
}


img {
  margin: 20px 0;
  width: 10px;
  border: 2px solid black;
}


.detail {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  text-align: left;

  /* width: 50; */
}

.image img {
  width: 79%;
}

.content {
  padding-left: 50px;
  margin-top: -40px;
}

.name {
  font-size: xxx-large;
  margin: 40px 0 10px;
}

.price {
  font-weight: bold;
  font-size: x-large;
  letter-spacing: 7px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.buttons button {
  background-color: #eee;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  font-family: Poppins;
  font-size: large;
  cursor: pointer;
}

.buttons svg {
  width: 15px;
}

.buttons span {
  background-color: #555454;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-left: 20px;
}

 img
{
  width: 200px;
}

.description {
  font-weight: 300;
}

.listProduct {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}


/* Cart Sidebar */

.cartTab {
  width: 400px;
  max-width: 100%;
  background-color: #353432;
  color: #eee;
  position: fixed;
  top: 0;
  right: -30%;
  bottom: 0;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  transition: .5s;
}

body.activeTabCart .cartTab {
  right: -70%;
}
body.activeTabCart .container {
  transform: translateX(-250px);
}
.cartTab h1 {
  padding: 20px;
  margin: 0;
  font-weight: 300;
}
.listCart {
  overflow: auto;
}
.listCart::-webkit-scrollbar {
  width: 0;
}
.listCart .item img {
  width: 100%;
}
.listCart .item {
  display: grid;
  grid-template-columns: 70px 1fr 50px;
  gap: 10px;
  text-align: center;
  align-items: center;
  padding: 10px;
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
}
.cartTab .close {
  background-color: #eee;
}

/* Responsive */
@media only screen and (max-width: 992px) {
  .detail {
    grid-template-columns: 40% 1fr;
  }
  .listProduct {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 767px) {
  .detail {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .image img {
    height: 40vh;
    object-fit: contain;
  }
  .name {
    font-size: x-large;
  }
  .buttons button {
    font-size: small;
  }
  .buttons {
    justify-content: center;
  }
  .listProduct {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
