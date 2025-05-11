import { createRouter, createWebHistory } from 'vue-router';
import StoreFront from '../views/storeFront.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
  {
    path: '/',
    name: 'StoreFront',
    component: StoreFront
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
