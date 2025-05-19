<!-- src/components/SideBarMenu.vue -->
<template>
  <aside class="sidebar">
    <h2 class="sidebar__title">Filter By</h2>

    <section class="sidebar__section">
      <h3>Gender</h3>
      <div class="option" v-for="g in genders" :key="g.value">
        <input
          type="radio"
          :id="g.value"
          :value="g.value"
          name="gender"
          v-model="selectedGender"
          @change="emitFilters"
        />
        <label :for="g.value">{{ g.label }}</label>
      </div>
    </section>

    <section class="sidebar__section">
      <h3>Category</h3>
      <div class="option" v-for="c in categories" :key="c.value">
        <input
          type="radio"
          :id="c.value"
          :value="c.value"
          name="category"
          v-model="selectedCategory"
          @change="emitFilters"
        />
        <label :for="c.value">{{ c.label }}</label>
      </div>
    </section>

    <button class="sidebar__reset" @click="resetFilters">Reset All</button>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filter-change']);

const genders = [
  { label: 'Men',   value: 'male'   },
  { label: 'Women', value: 'female' },
];
const categories = [
  { label: 'Jewelry',     value: 'jewelery'   },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing',    value: 'clothing'    },
];

const selectedGender   = ref('');
const selectedCategory = ref('');

const emitFilters = () => {
  emit('filter-change', {
    gender:   selectedGender.value,
    category: selectedCategory.value,
  });
};

const resetFilters = () => {
  selectedGender.value   = '';
  selectedCategory.value = '';
  emitFilters();
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 100px;
  left: 0;
  width: 240px;
  padding: 1.5rem;
  background: #fff;
  font-family: 'Poppins', sans-serif;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  border-right: 1px solid #eee;
}
.sidebar__title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.sidebar__section {
  margin-bottom: 1.5rem;
}
.sidebar__section h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}
.option {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
}
.option input {
  margin-right: 0.75rem;
  width: 16px;
  height: 16px;
  accent-color: #f43397; 
}
.option label {
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
}
.sidebar__reset {
  display: block;
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}
.sidebar__reset:hover {
  background: #f9f9f9;
}
</style>
