<template>
  <div class="home-view">
    <!-- <SliderCpn :listRootItem="listRootItem" :listBrand="listBrand" />? -->
    <TheLoadingCpn :isLoading="showLoading" />

    <div class="product">
      <ListProductCpn
        v-for="(brand, j) in listBrandHaveProduct"
        :key="j"
        :listProduct="listProduct"
        :brand="brand"
        :categoryView="categoryView"
        :listCategoryHaveAttribute="listCategoryHaveAttribute"
        :listItem="listItem"
        class="category_item"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
// import SliderCpn from "@/components/SliderCpn.vue";
import ListProductCpn from "@/components/products/ListProductCpn.vue";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";

export default defineComponent({
  components: { ListProductCpn,TheLoadingCpn },
  props: ["brand_name"],
  setup(props) {
    const store = useStore();
    const showLoading = ref(false);

    // const display = "none";
    onMounted(async () => {
      await store.dispatch("brand/getBrand", props.brand_name);
      window.scrollTo(0, 0);
    });
    const listItem = computed(() => {
      return store.getters["brand/getBrand"] || [];
    });

    const listBrandHaveProduct = computed(() => {
      return listItem.value.filter((item) => item.products.length > 0);
    });
    const listProduct = computed(() => {
      return listItem.value && listItem.value?.length
        ? listItem.value[0].products
        : [];
    });
    const listCategoryHaveAttribute = computed(() => {
      return listItem.value && listItem.value?.length
        ? listItem.value[0].category_attributes
        : [];
    });

    // const params = ref();
    // const handleFilter = () => {
    //   console.log(params.value);
    // };

    const categoryView = ref(true);

    return {
      categoryView,
      listProduct,
      listCategoryHaveAttribute,
      listBrandHaveProduct,
      showLoading
    };
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  margin-top: var(--height-header);

  .product {
    background-color: rgb(248 248 252);
    min-height: 100vh;
    :deep(.list-product) {
      padding: 0;
    }
  }
}
</style>
