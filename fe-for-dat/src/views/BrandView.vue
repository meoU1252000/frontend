<template>
    <div class="home-view">
      <!-- <SliderCpn :listRootItem="listRootItem" :listBrand="listBrand" />? -->
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
  import { defineComponent, onMounted, ref,computed } from "vue";
  // import SliderCpn from "@/components/SliderCpn.vue";
  import ListProductCpn from "@/components/products/ListProductCpn.vue";
  import { useStore } from "vuex";
  // import { useRoute } from "vue-router";
  
  export default defineComponent({
    components: { ListProductCpn },
    props: ["category_name"],
    setup(props) {
      const store = useStore();
  
      // const display = "none";
      onMounted(async () => {
        await store.dispatch("category/getCategory", props.category_name);
        window.scrollTo(0, 0);
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
  