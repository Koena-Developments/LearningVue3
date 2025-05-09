const app2 = Vue.createApp({
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
        // removeProduct(product) {
        //     const index = this.cart.indexOf(product);
        //     if (index > -1) {
        //         this.cart.splice(index, 1);
        //         this.counter--;
        //         console.log(`Removed: ${product.title}, Counter: ${this.counter}`);
        //     }
        // },
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
});

app2.mount('#anth');
