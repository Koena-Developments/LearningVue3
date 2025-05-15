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
      <li v-for="s in filteredSuggestions" :key="s.id" @mousedown.prevent="selectSuggestion(s)">
        {{ s.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchTerm: '',
      showSuggestions: false
    };
  },
  props: {
  
    products: {
      type: Array,
      required: true
    }
  },
  computed: {
   
filteredSuggestions() {
 const term = this.searchTerm.toLowerCase();
  if (term.length <= 2) {
    return [];
    }
    return this.products.filter(p => p.title.toLowerCase().includes(term) || p.price.toString().includes(term)).slice(0, 5);
}

},
  methods: {
    
    selectSuggestion(item) {
      this.searchTerm = item.title;
      this.$emit('search', this.searchTerm); 
      this.showSuggestions = false;
    },
    hideSuggestions() {
      setTimeout(() => (this.showSuggestions = false), 200);
    },
   
    },

  watch: {
    search_Term(newTerm) {
      this.$emit('search', newTerm);
    },
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
  background: #474545;
}
</style>