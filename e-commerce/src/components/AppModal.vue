<template>
  <div>
     <h2>fake-store</h2>
    <div id="anth">
        <div class="product-card" v-for="product in fakerstore" :key="product.id">
            <img :src="product.image" alt="Product image" />
            <p><strong>{{ product.title }}</strong></p>
            <p>R{{ product.price }}</p>
            <p>Description: {{ product.description }}</p>
            <p>Category: {{ product.category }}</p>
            <button @click="addToCart(product)">Add to Cart</button>
            <button @click="removeProduct(product)">Remove</button>
            </div>
            <div v-if="true">
                <h3>Checkout Summary</h3>
                <p>Total Items: {{ counter }}</p>
                <p>Total Price: R{{ total }}</p>
                <button @click="checkout">Checkout</button>
              </div>
    </div>
  </div>
</template>

<script>
// import AppModal from './components/AppModal.vue';
export default {
  
  name: 'App',
 /*
    structure of the data
    id: 1,
    title: "string",
    price: 0.1,
    description: 'string',
    category: string,
    image: "url"
    */
    data() {
        return {
            fakerstore: [],
            cart: [],
            counter: 0,
            total: 0,
            isNotEmpty: false
        };
    },
    methods: {
        getProducts() {
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => { this.fakerstore = data; });
        },
        addToCart(product) {
            this.cart.push(product);
            this.counter++;
            console.log(`Added: ${product.title}, Counter: ${this.counter}`);
            this.checkingStatus()
            this.calculateTotal()
        },

        // still need to plan the logic
        removeProduct(product) {
            const index = this.cart.indexOf(product);
            if (index > -1) {
                this.cart.splice(index, 1);
                this.counter--;
                console.log(`Removed: ${product.title}, Counter: ${this.counter}`);
                this.calculateTotal()
            }
        },
        calculateTotal() {
            this.total = this.cart.reduce((total, product) => total + product.price, 0);
            return this.total;
        },
        checkingStatus() {
            if(this.counter > 0)
            {
            this.isNotEmpty =true;
            }
            else if(this.counter <=0)
            {
                this.isNotEmpty = false;
            }
        },

        checkout()
        {
            if (this.counter > 0) {
                alert(`You checked out ${this.counter} items totaling R${this.total}`);                
                this.total =0
                this.counter = 0
            }
            else{
                alert('nothing was added to cart') ;           
            }
        }

    },
    mounted() {
        this.getProducts();
} 
}
</script>

<style>
        body {
          background-color: #f5f5f5;
          font-family: Arial, sans-serif;
        }
    
        .product-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          padding: 16px;
          margin: 20px;
          width: 220px;
          display: inline-block;
          vertical-align: top;
          text-align: center;
        }
    
        img {
          width: 150px;
          height: 150px;
          object-fit: cover;
        }
    
        button {
          margin: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
</style>