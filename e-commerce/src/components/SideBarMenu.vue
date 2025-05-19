<template>
  <div class="category">
    <div>
    <input type="radio" id="male" value="male" name="gender" v-model="selectedGender" @change="filterProducts">
    <label for="male">Men</label>

    <input type="radio" id="female" value="female" name="gender" v-model="selectedGender" @change="filterProducts">
    <label for="female">Women</label>
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
  top: -990px;
  display: flex;
  align-content: center;
  height: 180px;
  width: 26%;
}

.category input {
  margin-top: 10px;
}
</style>
