<template>
  <div>
    <h3 class="similar-title">Similar Projects</h3>
    <div class="similar-container">
      <div
        v-for="product in similarProducts"
        :key="product.id"
        class="similar-item"
        @click="$emit('select-product', product)"
      >
        <img
          :src="product.image"
          alt="Product"
          class="similar-image"
        />
        <p class="similar-name">{{ product.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  similarProducts: {
    type: Array,
    required: true
  }
});

defineEmits(['select-product']);
</script>

<style scoped>
.similar-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.similar-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.similar-item {
  cursor: pointer;
}

.similar-image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.25rem;
}

.similar-name {
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.25rem;
}
</style>
