<template>
  <div class="home-view">
    <div class="product">
      <OrderCpn />
    </div>
  </div>
</template>
<script>
import OrderCpn from "@/components/order/OrderCpn.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { OrderCpn },

  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.home-view {
  margin-top: var(--height-header);

  .product {
    background-color: rgb(248 248 252);
    min-height: 70vh;
    :deep(.list-product) {
      padding: 0;
    }
  }
}
</style>
