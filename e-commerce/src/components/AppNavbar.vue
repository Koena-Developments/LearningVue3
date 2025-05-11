<template>
  <div class="menu">
    <ul>
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="['item', { active: activeIndex === index }]"
        @click="setActive(index, $event)"
      >
        <i :class="item.icon"></i> {{ item.label }}
        <i
          v-if="item.children"
          class="fa-solid fa-chevron-down"
          :class="{ showMenuChild: item.expanded }"
          @click.stop="toggleExpand(index)"
        ></i>

        <ul v-show="item.children && item.expanded">
          <li
            v-for="(child, cIndex) in item.children"
            :key="cIndex"
          >
            {{ child }}
          </li>
        </ul>
      </li>
    </ul>
    <div id="action" ref="actionIndicator" class=""></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';

const menuItems = reactive([
  { label: 'Dashboard', icon: 'fa-solid fa-house-user' },
  {
    label: 'Products',
    icon: 'fa-solid fa-shirt',
    expanded: false,
    children: ['Add product', 'List product']
  },
  {
    label: 'Users',
    icon: 'fa-solid fa-user',
    expanded: false,
    children: ['Add user', 'List user', 'Block user']
  },
  { label: 'Setting', icon: 'fa-solid fa-gear' }
]);

const activeIndex = ref(0);
const actionIndicator = ref(null);

const setActive = async (index, event) => {
  if (event.target.classList.contains('fa-chevron-down')) return;

  activeIndex.value = index;

  await nextTick();
  updateActionStyles();
};

const toggleExpand = (index) => {
  menuItems[index].expanded = !menuItems[index].expanded;
  nextTick(updateActionStyles);
};

const updateActionStyles = () => {
  const action = actionIndicator.value;
  const activeItem = document.querySelectorAll('.item')[activeIndex.value];

  if (action && activeItem) {
    document.documentElement.style.setProperty('--height-begin', action.offsetHeight + 'px');
    document.documentElement.style.setProperty('--top-begin', action.offsetTop + 'px');
    document.documentElement.style.setProperty('--height-end', activeItem.offsetHeight + 'px');
    document.documentElement.style.setProperty('--top-end', activeItem.offsetTop + 'px');

    action.classList.remove('runanimation');
    void action.offsetWidth;
    action.classList.add('runanimation');
  }
};

onMounted(() => {
  updateActionStyles();
});
</script>

<style scoped>
:root {
  --top-begin: 0px;
  --top-end: 0px;
  --height-begin: 40px;
  --height-end: 40px;
}
body {
  font-family: system-ui;
  height: 100vh;
  background-image: radial-gradient(ellipse at left, #2D193B, #090A20);
}
.menu {
  background-color: rgb(42, 36, 77, 0.2);
  width: 280px;
  padding: 20px;
  border-radius: 20px;
  margin: 70px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}
ul li {
  padding: 10px;
  margin-bottom: 30px;
  position: relative;
  color: #757474;
  cursor: pointer;
  transition: 0.5s;
  transition-delay: 1s;
}
ul li i {
  width: 30px;
  font-size: 15px;
  position: relative;
  z-index: 1;
  text-align: center;
  margin-right: 30px;
}
ul li::before {
  position: absolute;
  top: 0;
  left: 5px;
  width: 40px;
  height: 100%;
  content: '';
  background-color: #312b57;
  border-radius: 30px;
  transition: 1s;
}
li i:nth-child(2) {
  position: absolute;
  right: 0;
  top: 15px;
  transition: 0.5s;
  opacity: 0.5;
}
ul li li {
  margin-bottom: unset;
  margin-top: 10px;
  padding-left: 50px;
  opacity: 0;
  animation: shochild 1s ease 1 forwards;
  position: relative;
  z-index: 1;
}
@keyframes shochild {
  from {
    opacity: 0;
    transform: translate(0, -20px);
  }
  to {
    opacity: 1;
  }
}
li li:nth-last-child(1) {
  margin-bottom: 0;
  padding-bottom: 0;
}
ul li li::before {
  position: absolute;
  left: 13px;
  top: 50%;
  width: 5px;
  height: 5px;
  content: '';
  background-color: #dd789a;
  z-index: 1;
  transition: 1s;
}
ul li li:nth-child(1),
ul li li:nth-child(1)::before {
  transition-delay: 1.2s;
}
ul li li:nth-child(2),
ul li li:nth-child(2)::before {
  transition-delay: 1.4s;
}
ul li li:nth-child(3),
ul li li:nth-child(3)::before {
  transition-delay: 1.6s;
}
ul li li:nth-child(2) {
  animation-delay: 0.2s;
}
ul li li:nth-child(3) {
  animation-delay: 0.4s;
}
ul ul {
  position: relative;
  display: none;
  transition: 1s;
}
.showMenuChild {
  transform: rotate(180deg);
}
.showMenuChild ~ ul {
  display: block;
}
#action {
  background-color: red;
  position: absolute;
  width: 40px;
  height: var(--height-end);
  border-radius: 30px;
  background-image: linear-gradient(to bottom, #c45ab3, #dd789a);
  top: var(--top-end);
  left: 5px;
  transition: 1s;
}
.active li::before {
  background-color: #eee;
}
.runanimation {
  animation: animationaction 1s ease-in 1;
}
.active,
.active li {
  color: #fff;
}
@keyframes animationaction {
  0% {
    height: var(--height-begin);
    top: var(--top-begin);
  }
  30% {
    height: var(--height-begin);
    width: 10px;
    height: 10px;
    transform: translate(15px);
  }
  50% {
    filter: none;
    height: 10px;
  }
  70% {
    width: 10px;
    transform: translate(15px);
    filter: blur(3px);
  }
  100% {
  }
}
</style>
