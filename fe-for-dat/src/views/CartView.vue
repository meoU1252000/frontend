<template>
  <div class="home-view">
    <div class="product">
      <CartCpn />
    </div>
  </div>
</template>

<script>
import CartCpn from "@/components/CartCpn.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CartCpn },
});
</script>

<style lang="scss" scoped>
.home-view {
  margin-top: var(--height-header);
  .product {
    background-color: rgb(248 248 252);
    min-height: 70vh;
  }
}
</style>
