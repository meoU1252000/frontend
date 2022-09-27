<template>
  <router-link to="/" class="product no-underline">
    <div class="image">
      <img
        src="https://lh3.googleusercontent.com/_SApryKFms-BYshoOG9JRUG14-JLrnShoUSZ7_4_JqcYW5YaL2eRJ0cw4AXNjOmHDi1q-f-dVFH3BwyiCMxg-7-mAsKPGA-LcA=rw-w230"
        alt=""
      />
    </div>
    <div class="name">
      <span>Laptop Acer Nitro 5 AN515-55-70AX</span>
    </div>
    <div class="quantity">Còn 2 sản phẩm</div>
    <div class="price">
      <span>20000000đ</span>
      <span>20000000đ</span>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.product {
  width: 20%;
  min-height: 20rem;
  color: var(--black-color);
  border: 1px solid #ccc;
}
</style>
