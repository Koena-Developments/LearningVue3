/*
    structure of the data
    id: 1,
    title: "string",
    price:, 0.1,
    description: 'string',
    category: string,
    image: "url"
*/

const app = Vue.createApp({
    data() {
      return {
     
        products: [
          {
            productName: 'iPhone 12',
            price: 10000,
            productDescription: "This is the new iPhone 12 which you need to buy",
            quantity: 0,
            total: 0
          },
          {
            productName: 'iPhone 15',
            price: 15000,
            productDescription: "This is the new iPhone 15 which you need to buy",
            quantity: 0,
            total: 0
          },
          {
            productName: 'iPhone 16',
            price: 24000,
            productDescription: "This is the new iPhone 16 which you need to buy",
            quantity: 0,
            total: 0
          }
        ],

        // for holding faker store products
        fakestoreproducts:[],
        isNotEmpty: false
      };
    },
    computed: {
      totalQuantity() {
        return this.products.reduce((sum, p) => sum + p.quantity, 0);
      },
      grandTotal() {
        return this.products.reduce((sum, p) => sum + p.total, 0);
      }
    },
    methods: {
      addToCart(product) {
        product.quantity += 1;
        product.total = product.quantity * product.price;
        this.checkingStatus();
      },
      removeProduct(product) {
        if (product.quantity > 0) {
          product.quantity -= 1;
          product.total = product.quantity * product.price;
          this.checkingStatus();
        }
      },
      checkout() {
        if (this.totalQuantity > 0) {
          alert(`You checked out ${this.totalQuantity} items totaling R${this.grandTotal}`);
          this.products.forEach(p => {
            p.quantity = 0;
            p.total = 0;
          });
          this.isNotEmpty = false;
        }
      },
      checkingStatus() {
        this.isNotEmpty = this.products.some(p => p.quantity > 0);
      },
    }
  });
  
  app.mount('#app');
  