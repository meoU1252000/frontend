<template>
  <div class="navbar">
    <div class="category" @mouseleave="handleLeave">
      <div
        class="item"
        v-for="(item, i) in listItem"
        :key="i"
        @mouseover="handleHover(item.name)"
      >
        <img class="item-img" src="@/assets/images/icons-nav/unnamed.webp" />
        <span>{{ item.name }}</span>
      </div>
      <div class="modal" :style="{ display: display }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const display = ref("none");
    const item = ref(0);
    const listItem = ref([
      {
        icon: "",
        name: "Laptop",
      },
      {
        icon: "",
        name: "Sản phẩm apple",
      },
      {
        icon: "",
        name: "PC-Máy tính bộ",
      },
      {
        icon: "",
        name: "Pc-Màn hình máy tính",
      },
    ]);
    const handleHover = (key) => {
      display.value = "block";
      item.value = key;
    };
    const handleLeave = () => {
      item.value = 0;
      display.value = "none";
    };
    return {
      display,
      item,
      listItem,
      handleHover,
      handleLeave,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  width: 200px;
  height: 450px;
  background-color: #fff;
  top: 0;
  z-index: 2;
  margin: 3rem 0 0 10rem;
  border-radius: 10px;

  .category {
    position: relative;

    .modal {
      position: absolute;
      width: calc(100vw - 33rem);
      height: 28.5rem;
      background-color: #fff;
      right: -500%;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: rgb(243, 245, 252);
      color: rgb(20, 53, 195);
      border-radius: 10px;
    }

    .item-img {
      width: 1.6rem;
    }

    span {
      margin-left: 0.5rem;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
