<template>
  <div class="list-product">
    <div class="list">
      <div class="head">
        <h3 class="title">{{ brand.brand_name }}</h3>
        <my-button
          @click="goToBrandPage(brand.brand_name)"
          class="p-button-text"
        >
          Xem tất cả >
        </my-button>
      </div>
      <div class="main-product">
        <my-carousel
          :value="brand.products.slice(0, 20)"
          :numVisible="4"
          :numScroll="4"
          v-if="brand.products.length > 4"
          class="w-full"
        >
          <template #item="slotProps">
            <ProductsCpn :product="slotProps.data" />
          </template>
        </my-carousel>
        <ProductsCpn
          v-else
          v-for="(product, i) in brand.products"
          :key="i"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ProductsCpn from "./ProductsCpn.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    listBrand: { type: Object },
    brand: { type: Object },
  },
  components: { ProductsCpn },
  setup() {
    const route = useRouter();
    const goToBrandPage = (name) => {
      route.push(`/thuong-hieu/${name}`);
    };
    return {
      goToBrandPage,
    };
    // ])
  },
});
</script>

<style lang="scss" scoped>
.list-product {
  min-height: 100px;
  padding: 5rem 10rem;

  .list {
    min-height: 100px;
    background-color: #fff;
    border-radius: 10px;

    .head {
      height: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      border-bottom: 2px solid #cccccc36;

      span {
        cursor: pointer;
        color: rgb(130, 134, 158);
      }
    }
  }

  .main-product {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 1920px) {
  .list-product {
    padding: 2rem 5rem;
  }
}
</style>
