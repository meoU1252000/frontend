<template>
  <div class="home-view">
    <div class="product">
      <ProductCpn :product="product" :urlKind="urlKind"/>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";

import ProductCpn from "@/components/products/ProductCpn.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { ProductCpn },
  props: ["id","kind"],
  setup() {
    const store = useStore();
    const route = useRoute();

    const listItem = computed(() => {
      return store.getters["product/getListProduct"] || [];
    });

    const urlKind = computed(() =>{
       return route.params.kind;
    })

    const product = computed(() => {
      const id = route.params.id;
      return listItem.value && listItem.value?.length
        ? listItem.value.find((product) => id == product.id) : []
    });
    onMounted(async () => {

      window.scrollTo(0, 0);
    });

    return {
      product,
      urlKind
    };
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  margin-top: var(--height-header);

  .product {
    background-color: rgb(248 248 252);
    min-height: 70vh;
  }
}
</style>
