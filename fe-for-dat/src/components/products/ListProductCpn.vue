<template>
  <div class="list-product">
    <div class="list">
      <div class="head">
        <h3 class="title">Laptop</h3>
        <span>Xem tất cả ></span>
      </div>
      <div class="main-product">
        <ProductCpn
          v-for="(product, i) in listProduct"
          :key="i"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ProductCpn from "./ProductCpn.vue";

export default defineComponent({
  components: { ProductCpn },
  setup() {
    const listProduct = ref([
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
      {
        name: "Laptop Acer Nitro 5 AN515-55-70AX",
        img: "https://lh3.googleusercontent.com/FPVLsfy8AOkj2wb3s6Qeb4OhfsFbHX4IkZ516gFugr48FzCi1KPPweWdcvw8z5uAmpDPrM7TaHyuZFPDh8iz=w500-rw",
        price: "28.490.000 ₫",
        quantity: "3",
      },
    ]);
    return {
      listProduct,
    };
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
