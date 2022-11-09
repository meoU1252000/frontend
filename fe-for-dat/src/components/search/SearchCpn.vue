<template>
  <div class="list-product">
    <div class="grid mx-auto w-11 p-7">
      <div class="col flex-grow-1 justify-content-center bg-white">
        <div class="head-categoryView">
          <h4 class="title">Sắp xếp theo</h4>
          <div class="filter">
            <my-button
              label="Mặc Định"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'a' }"
              @click="sortByDefault(listItem)"
            ></my-button>
            <my-button
              label="Bán Chạy"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'b' }"
            ></my-button>
            <my-button
              label="Mới Về"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'c' }"
              @click="sortByNewProduct(listItem)"
            ></my-button>
            <my-button
              label="Giá Giảm Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'd' }"
              @click="sortByLowPrice(listItem)"
            ></my-button>
            <my-button
              label="Giá Tăng Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'e' }"
              @click="sortByHigherPrice(listItem)"
            ></my-button>
          </div>
        </div>
        <div class="main-product" v-if="listItem.length > 0">
          <ProductsCpn
            v-for="(product, i) in listItem"
            :key="i"
            :product="product"
          />
        </div>
        <div class="main-product" v-else>
          <div class="p-6">
            <h3>Không tìm thấy sản phẩm</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ProductsCpn from "../products/ProductsCpn.vue";
export default defineComponent({
  props: {
    listItem: { type: Object },
  },
  components: { ProductsCpn },
  setup() {
    const selected = ref("a");
    const sortByLowPrice = (listItem) => {
      selected.value = "d";
      return listItem.sort(function (a, b) {
        return b.product_price - a.product_price;
      });
    };
    const sortByNewProduct = (listItem) => {
      selected.value = "c";
      return listItem.sort(function (a, b) {
        return b.id - a.id;
      });
    };

    const sortByDefault = (listItem) => {
      selected.value = "a";
      return listItem.sort(function (a, b) {
        return a.id - b.id;
      });
    };

    const sortByHigherPrice = (listItem) => {
      selected.value = "e";
      return listItem.sort(function (a, b) {
        return a.product_price - b.product_price;
      });
    };
    return {
      selected,
      sortByLowPrice,
      sortByNewProduct,
      sortByDefault,
      sortByHigherPrice,
    };
    // ])
  },
});
</script>

<style lang="scss" scoped>
.list-product {
  min-height: 100px;
  padding: 5rem 10rem;
}
.category_item {
  width: 100%;
}

.filter-sidebar {
  background-color: #fff;
  border-radius: 10px;
  width: 16%;
  min-height: 32rem;
  .border-top-1 {
    border-color: #ddd;
  }
}

.input-range-currency {
  display: flex;
  width: 100%;
  :deep(input) {
    text-align: center;
    width: 50%;
    font-size: 0.75rem;
  }
}

.list {
  min-height: 100px;
  background-color: #fff;
  border-radius: 10px;
}

.head {
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 2px solid #cccccc36;
}

.head-categoryView {
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 2px solid #cccccc36;
}
.filter {
  margin-left: 1rem;
  button {
    margin: 0.5rem;
  }
}

.main-product {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.active {
  color: white !important;
  background-color: rgb(207, 15, 15, 1) !important;
  border-color: rgb(207, 15, 15, 1) !important;

  &:enabled:hover {
    background-color: rgb(145, 10, 10) !important;
    border-color: rgb(207, 15, 15, 1) !important;
  }
  &:focus {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black !important;
  }
  &:enabled:focus {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black !important;
  }
}
@media only screen and (max-width: 1920px) {
  .list-product {
    padding: 2rem 5rem;
  }
}
</style>
