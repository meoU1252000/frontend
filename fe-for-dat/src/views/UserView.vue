<template>
  <div class="home-view">
    <div class="product">
      <AccountCpn />
    </div>
  </div>
</template>
<script>
import AccountCpn from "@/components/user/AccountCpn.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { AccountCpn },
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
