<template>
  <div class="home-view">
    <div class="product">
      <AddressCpn :account="account" />
    </div>
  </div>
</template>
<script>
import AddressCpn from "@/components/user/AddressCpn.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { AddressCpn },

  setup() {
    const store = useStore();
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });
    return { account };
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
