<template>
  <div class="item">
    <img :src="product.image" :alt="product.title" />
    
    <div class="details">
    
    <div class="title">
    <h2>{{ product.title }}</h2>
    </div>
    
    <div class="price">R{{ product.price.toFixed(2) }}

    </div>
    
    <div>
      <button @click="$emit('add-to-cart', product)">Add to Cart</button>
     <button @click="$emit('remove-product', product)">Remove</button> 
    </div>
    
    <div>
    <router-link :to="`/product/${product.id}`"><button>View Product</button></router-link>
    </div>  
  
  </div>
  
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #EEEEE6;
  padding: 20px;
  border-radius: 20px;
  filter: drop-shadow(0 50px 20px #0009);
  width: 200px;
  height: auto;
  cursor: pointer;
}


.details
{
  position: absolute;
  width: 90%;
  height: auto;
  border: 1px solid red;
  padding: 15px;
}


.item .title
{
  font-size: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 86px;
}
.item img {
  border-radius: 4px solid red;
  width: 100px;
  height: 100px;
  object-fit: contain;
}
/* .item img:hover {
  zoom:50%;
} */

.item h2 {
  font-weight: 500;
  font-size: large;
}

.item .price {
  letter-spacing: 7px;
  font-size: 18px;
}

.item button {
  background: #353432;
  color: #eee;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 20px;
  cursor: pointer;
}
</style>