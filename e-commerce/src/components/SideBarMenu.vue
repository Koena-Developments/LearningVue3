<template>
  <div class="category">
    <h1>filter</h1>

    <div class="contains">
      <input type="radio" id="male" value="male" name="gender" v-model="selectedGender" @change="filterProducts">
      <label for="male">Men</label>
    </div>  
    
    <div class="contains">
      <input type="radio" id="female" value="female" name="gender" v-model="selectedGender" @change="filterProducts">
      <label for="female">Women</label>
    </div>

    <div class="contains">
      <input type="radio" id="jewelry" value="" name="jewelry" v-model="selectedGender" @change="filterProducts">
      <label for="jewelry">jewelry</label>
    </div>  
    
    <div class="contains">
      <input type="radio" id="electronics" value="electronics" v-model="selectedGender" @change="filterProducts">
      <label for="electronics">Electronics</label>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const selectedGender = ref('');
const emit = defineEmits(['filter-gender']);

const filterProducts = () => {
  emit('filter-gender', selectedGender.value);
};
</script>

<style scoped>
.category {
  border: 1px solid red;
  border-radius: 5px;
  position: relative;
  top: -1279px;
  display: flex; 
  flex-direction: column;
  margin-left: -8px;
  height: 100vh; 
  width: 26%; 
}
input[type='radio'] {
  box-sizing: border-box;
  appearance: none;
  background: white;
  outline: 1px solid #333;
  border: 3px solid white;
  width: 10px;
  height: 10px;
}

.contains {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.contains, label{
    margin: 5px;
}

.contains input[type='radio']:hover {
  background: #333;
  border: 3px solid #333;
  cursor: pointer;
}

.category input {
    display: flex;
    flex-direction: column;
  margin-top: 10px;
}

</style>


