<template>
  <div>
    <SearchBar />
    <router-view />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';

// import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {
    // AppNavbar
    SearchBar
  }
};
</script>
