<template>
  <div class="home-view">
    <SliderCpn :listRootItem="listRootItem" :listBrand="listBrand" />
    <div class="product">
      <ListProductBrandCpn
        v-for="(brand, i) in listBrandHaveProduct.slice(0,2)"
        :key="i"
        :listBrand="listBrand"
        :brand="brand"
      />
      <ListProductCpn
        v-for="(category, j) in listCategoryHaveProduct.slice(0,5)"
        :key="j"
        :listProduct="listProduct"
        :category="category"
      />
    </div>
    <!-- <div class="product">
      <ListProductCpn :listProduct="listProduct"/>
    </div> -->
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
import SliderCpn from "@/components/SliderCpn.vue";
import ListProductCpn from "@/components/products/ListProductCpn.vue";
import ListProductBrandCpn from "@/components/products/ListProductBrandCpn.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { SliderCpn, ListProductCpn,ListProductBrandCpn },
  setup() {
    const store = useStore();

    onMounted(async () => {
      // await store.dispatch("product/getListProducts");
      // await store.dispatch("category/getListCategories");
      // await store.dispatch("brand/getListBrands");
      window.scrollTo(0, 0);

      // console.log("--------",store);
    });
    // const store = useStore();
    const listItem = computed(() => {
      return store.getters["category/getListCategory"] || [];
    });
    const listRootItem = computed(() => {
      return listItem.value.filter((item) => item.category_parent === 0 && item.category_status === 1);
    });
    const listProduct = computed(() => {
      return store.getters["product/getListProduct"];
    });

    const listBrand = computed(() => {
      return store.getters["brand/getListBrand"] || [];
    });

    const listCategoryHaveProduct = computed(() => {
      return listItem.value.filter((item) => item.products.length > 0);
    });

    const listBrandHaveProduct = computed(() => {
      return listBrand.value.filter((item) => item.products.length > 0);
    });
    // console.log(listCategoryHaveProduct)

    return {
      listItem,
      listRootItem,
      listProduct,
      listCategoryHaveProduct,
      listBrand,
      listBrandHaveProduct,
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
  }
}
</style>
