<template>
  <div class="home-view">
    <!-- <SliderCpn :listRootItem="listRootItem" :listBrand="listBrand" />? -->
    <TheLoadingCpn :isLoading="showLoading" />

    <div class="product">
      <ListProductCpn
        v-for="(category, j) in listCategoryHaveProduct"
        :key="j"
        :listProduct="listProduct"
        :category="category"
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
  props: ["category_name"],
  setup(props) {
    const store = useStore();
    const showLoading = ref(false);

    // const display = "none";
    onMounted(async () => {
      window.scrollTo(0, 0);
      showLoading.value = true;
      await store.dispatch("category/getCategory", props.category_name);
      showLoading.value = false;

    });
    const listItem = computed(() => {
      return store.getters["category/getCategory"] || [];
    });

    const listCategoryHaveProduct = computed(() => {
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
      listCategoryHaveProduct,
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
    min-height: 80vh;
    :deep(.list-product) {
      padding: 0;
    }
  }
}
</style>
