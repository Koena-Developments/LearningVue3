// import {ref} from 'vue'

const app = Vue.createApp({

    data() {
        return {
            Quantity: 0,
            products: [
                { productName: 'Iphone 12', price: 10000, productDescription: "this is the new iphone 12 which you need to buy", MadeIn: "South Africa", total: 0 },
                { productName: 'Iphone 15', price: 15000, productDescription: "this is the new iphone 15 which you need to buy", MadeIn: "South Africa", total: 0 },
                { productName: 'Iphone 16', price: 24000, productDescription: "this is the new iphone 16 which you need to buy", MadeIn: "South Africa", total: 0 }
            ],
            isNotEmpty: false
        }
    },
    methods: {
        checkingStatus() {
            /*i want to create a function that checks the state of the Items in the cart
            firstly check the Quantity first if it is = 0 then update the isEmpty status to true
            else false 
            */
            if (this.Quantity > 0) {
                this.isNotEmpty = true
            }
            else {
                this.isNotEmpty = false
            }
        },


        addToCart() {
            this.Quantity +=1
            for (i = 0; i < this.products.length; i++) {
                  console.log(this.products[i].price)  
            }
            this.checkingStatus(this.Quantity)
            this.calculateTotal()
        },

        buyItem() {
            alert("you purchased " + this.Quantity + " items costing " + this.total)
        },

        // remove the product and then return new total
        removeProduct() {
            this.checkingStatus()
            this.Quantity -= 1
            this.calculateTotal()
        },

        // i want to get the Quantity and price of item multiply them and display them

        calculateTotal() {
            for(i = 0; i < this.products.length;i++)
            {
                this.products[i].total = this.Quantity * this.products[i].price
            }
        },
    }
})
app.mount('#app')


























const app2 = Vue.createApp({
    data() {
        return {
            isCardEmpty: false,
            cart: 0
        }
    },
    methods: {
        addProduct() {
            this.cart += 1

        },
        removeProduct() {
            this.cart -= 1
        }
    }
})
app2.mount('#content')