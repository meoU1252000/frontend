<template>
  <div class="home-view">
    <div class="product">
      <CheckOutCpn :account="account" />
    </div>
  </div>
</template>
<script>
import CheckOutCpn from "@/components/checkOut/CheckOutCpn.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CheckOutCpn },

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
