const app2 = Vue.createApp({
    data(){
    return{
        fakerstore: []
    }
    },

    methods:{
        getProducts()
        {
            fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {this.fakerstore = data;

            });
        }
        },
        mounted() {
            this.getProducts();
    }
});

app2.mount('#anth');

