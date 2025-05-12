<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search products..."
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
    />
    <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
      <li
        v-for="item in filteredSuggestions"
        :key="item.id"
        @mousedown.prevent="selectSuggestion(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: String,
    allProducts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchTerm: this.modelValue || '',
      showSuggestions: false
    };
  },
  computed: {
    filteredSuggestions() {
      const term = this.searchTerm.toLowerCase();
      return this.allProducts
        .filter(p => p.title.toLowerCase().includes(term))
        .slice(0, 5);
    }
  },
  watch: {
    searchTerm(val) {
      this.$emit('update:modelValue', val);
    },
    modelValue(val) {
      this.searchTerm = val;
    }
  },
  methods: {
    selectSuggestion(item) {
      this.$emit('select', item);
      this.showSuggestions = false;
    },
    hideSuggestions() {
      setTimeout(() => (this.showSuggestions = false), 200);
    }
  }
};
</script>

<style scoped>
.search-container {
  position: relative;
  margin: 20px 0;
}
.search-container input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 24px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  font-size: 16px;
}
.search-container .suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}
.search-container .suggestions li {
  padding: 8px 12px;
  cursor: pointer;
}
.search-container .suggestions li:hover {
  background: #f0f0f0;
}
</style>
