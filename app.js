const app= Vue.createApp({
    data(){
        return{
            productName:'Iphone 12',
            price: 10000,
            productDescription: 'this is the new iphone12 which you need to buy',
            MadeIn: 'south africa',
            Quantity:0,
            isEmpty: false
        }
    },
    methods:{
        checkingStatus(cartStatus)
        {
            /*i want to create a function that checks the state of the Items in the cart
            firstly check the Quantity first if it is = 0 then update the isEmpty status to true
            else false 
            */

            if(this.Quantity == 0){
                this.isEmpty = true
            }
        },

        addToCart()
        {
            this.checkingStatus(this.Quantity)
            this.Quantity +=1

            // console.log(this.Quantity)

        },

        changeTitle(newTitle)
        {
            this.title = newTitle
        },
    }
})
app.mount('#app')


























const app2 = Vue.createApp({
    data(){
        return{
            isCardEmpty: false,
            cart:0
        }
    },
        methods:{
            addProduct()
            {
                this.cart +=1
                
            },
            removeProduct()
            {
               this.cart -=1
            }
    }
})
app2.mount('#content')