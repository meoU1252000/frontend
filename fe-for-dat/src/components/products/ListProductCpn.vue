<template>
  <div class="list-product">
    <div class="list">
      <div class="head">
        <h3 class="title">{{category.category_name}}</h3>
        <span>Xem tất cả ></span>
      </div>
      <div class="main-product">
        <ProductCpn
          v-for="(product, i) in category.products"
          :key="i"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ProductCpn from "./ProductCpn.vue";
export default defineComponent({
  props: {
    listProduct: {type: Object},
    category: {type: Object}
  },
  components: { ProductCpn },
  setup() {
    return {
    
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
      border-bottom: 2px solid #ccc;

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
</style>
