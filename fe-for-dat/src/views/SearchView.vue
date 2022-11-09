<template>
  <div class="home-view">
    <!-- <SliderCpn :listRootItem="listRootItem" :listBrand="listBrand" />? -->
    <div class="product">
      <SearchCpn :listItem="listItem" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
// import SliderCpn from "@/components/SliderCpn.vue";
import SearchCpn from "@/components/search/SearchCpn.vue";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";

export default defineComponent({
  components: { SearchCpn },
  setup() {
    const store = useStore();
    // const display = "none";
    onMounted(async () => {
      window.scrollTo(0, 0);
    });
    const listItem = computed(() => {
      return store.getters["search/getListProduct"] || [];
    });

    return {
      listItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  margin-top: var(--height-header);

  .product {
    background-color: rgb(248 248 252);
    min-height: 80vh;
    :deep(.list-product) {
      padding: 0;
    }
  }
}
</style>
