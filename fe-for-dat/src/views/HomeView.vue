<template>
  <div class="home-view">
    <SliderCpn />
    <div class="product">
      <ListProductCpn />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SliderCpn from "@/components/SliderCpn.vue";
import ListProductCpn from "@/components/products/ListProductCpn.vue";

export default defineComponent({
  components: { SliderCpn, ListProductCpn },
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
    min-height: 100vh;
  }
}
</style>
