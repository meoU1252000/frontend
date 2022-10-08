<template>
    <div class="home-view">
      <SliderCpn :listRootItem="listRootItem" />
      <div class="product">
        <ListProductCpn
          v-for="(category, i) in listCategoryHaveProduct"
          :key="i"
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
  import { useStore } from "vuex";
  
  export default defineComponent({
    components: { SliderCpn, ListProductCpn },
    setup() {
      const store = useStore();
  
      onMounted(async () => {
        await store.dispatch("product/getListProducts");
        await store.dispatch("category/getListCategories");
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
  
      const listCategoryHaveProduct = computed(() => {
        return listItem.value.filter((item) => item.products.length > 0);
      });
      // console.log(listCategoryHaveProduct)
  
      return {
        listItem,
        listRootItem,
        listProduct,
        listCategoryHaveProduct,
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
  