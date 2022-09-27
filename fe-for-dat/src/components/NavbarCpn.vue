<template>
  <div class="navbar">
    <div class="category">
      <div class="item" v-for="(item, i) in listItem" :key="i">
        <img class="item-img" src="@/assets/images/icons-nav/unnamed.webp" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
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
    return {
      listItem,
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

  //   .category {
  //     padding: 0.5rem;
  //   }

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
