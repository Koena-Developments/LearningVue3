const app = Vue.createApp({
  data() {
    return {
      products: [
        {
          productName: 'iPhone 12',
          price: 10000,
          productDescription: "This is the new iPhone 12 which you need to buy",
          MadeIn: "South Africa",
          quantity: 0,
          total: 0
        },
        {
          productName: 'iPhone 15',
          price: 15000,
          productDescription: "This is the new iPhone 15 which you need to buy",
          MadeIn: "South Africa",
          quantity: 0,
          total: 0
        },
        {
          productName: 'iPhone 16',
          price: 24000,
          productDescription: "This is the new iPhone 16 which you need to buy",
          MadeIn: "South Africa",
          quantity: 0,
          total: 0
        }
      ],
      isNotEmpty: false
    };
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

    buyItem(product) {
      if (product.quantity > 0) {
        alert(`You purchased ${product.quantity} of ${product.productName} for R${product.total}`);
        product.quantity = 0;
        product.total = 0;
        this.checkingStatus();
      } else {
        alert("No quantity selected for this product.");
      }
    },

    checkingStatus() {
      const hasItems = this.products.some(p => p.quantity > 0);
      this.isNotEmpty = hasItems;
    }
  }
});

app.mount('#app');
