<template>
  <div class="list-product">
    <div class="list" v-if="categoryView === false">
      <div class="head">
        <h3 class="title">{{ category.category_name }}</h3>
        <my-button
          @click="goToCategoryPage(category.category_name)"
          class="p-button-text"
        >
          Xem tất cả >
        </my-button>
      </div>
      <!-- <div class="head-categoryView">
          <h4 class="title">Sắp xếp theo </h4>
          <div class="filter">
            <my-button
              label="Bán Chạy"
              class="p-button-outlined p-button-sm p-button-secondary"
            ></my-button>
            <my-button
              label="Mới Về"
              class="p-button-outlined p-button-sm p-button-secondary"
              @click="sortByNewProduct(listProduct)"
            ></my-button>
            <my-button
              label="Giá Giảm Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              @click="sortByLowPrice(listProduct)"
            ></my-button>
            <my-button
              label="Giá Tăng Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              @click="sortByHigherPrice(listProduct)"
            ></my-button>
          </div>
        </div> -->
      <div class="main-product">
        <my-carousel
          :value="category.products"
          :numVisible="4"
          :numScroll="4"
          v-if="category.products.length > 4"
        >
          <template #item="slotProps">
            <ProductsCpn
              :product="slotProps.data"
            />
          </template>
        </my-carousel>
        <ProductsCpn
        v-else
          v-for="(product, i) in category.products"
          :key="i"
          :product="product"
        />
      </div>
    </div>
    <div class="grid mx-auto w-11 p-7" v-else>
      <div class="col-fixed font-bold mr-2 border-round filter-sidebar">
        <div class="filter-content">
          <h5 class="mb-3 p-2">Khoảng Giá</h5>
          <div class="input-range-currency mb-3">
            <my-inputNumber
              inputId="currency-vn-min"
              v-model="valueMin"
              class="mx-1"
              mode="currency"
              currency="VND"
              locale="vi-VN"
              readonly="true"
            />
            <my-inputNumber
              inputId="currency-vn-max"
              v-model="valueMax"
              class="mx-1"
              mode="currency"
              currency="VND"
              locale="vi-VN"
              readonly="true"
            />
          </div>
          <my-slider
            v-model="valueChange"
            :range="true"
            class="mx-auto w-10 mb-4"
          ></my-slider>
        </div>

        <ListAttributeCpn
          v-for="(attribute, k) in listCategoryHaveAttribute"
          :key="k"
          :attribute="attribute"
          :listItem="listItem"
        />
      </div>
      <div class="col flex-grow-1 justify-content-center bg-white">
        <div class="head-categoryView">
          <h4 class="title">Sắp xếp theo</h4>
          <div class="filter">
            <my-button
              label="Bán Chạy"
              class="p-button-outlined p-button-sm p-button-secondary"
            ></my-button>
            <my-button
              label="Mới Về"
              class="p-button-outlined p-button-sm p-button-secondary"
              @click="sortByNewProduct(listProduct)"
            ></my-button>
            <my-button
              label="Giá Giảm Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              @click="sortByLowPrice(listProduct)"
            ></my-button>
            <my-button
              label="Giá Tăng Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              @click="sortByHigherPrice(listProduct)"
            ></my-button>
          </div>
        </div>
        <div class="main-product">
          <ProductsCpn
            v-for="(product, i) in listProduct"
            :key="i"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import ProductsCpn from "./ProductsCpn.vue";
import ListAttributeCpn from "../attribute/ListAttributeCpn.vue"
export default defineComponent({
  props: {
    listCategoryHaveAttribute: { type: Object },
    listProduct: { type: Object },
    category: { type: Object },
    categoryView: { type: Boolean },
  },
  components: { ProductsCpn ,ListAttributeCpn},
  setup(props) {
    const route = useRouter();
    const goToCategoryPage = (name) => {
      route.push(`/danh-muc/${name}`);
    };
    const valueMax = computed(() => {
      return props.category.highest_product_price * 2 || [];
    });
    const valueMin = ref(0);
    const valueChange = ref([0, 100000000]);

    const drop = ref();
    const sortByLowPrice = (listProduct) => {
      return listProduct.sort(function (a, b) {
        return a.product_price - b.product_price;
      });
    };
    const sortByNewProduct = (listProduct) => {
      return listProduct.sort(function (a, b) {
        return b.id - a.id;
      });
    };

    const sortByHigherPrice = (listProduct) => {
      return listProduct.sort(function (a, b) {
        return b.product_price - a.product_price;
      });
    };

    const listItem = computed(() =>{
      return props.category.products || [];
    })

    // const filteredItems = computed(() => {
    //   return props.category.products.filter((product) => {
    //     return product.product_attribute.forEach( params => {
    //       if (product.product_attribute.params.includes(params)) {
    //         return product.product_attribute.params.includes(params);
    //       }
    //     });
    //   });
    // })

    return {
      goToCategoryPage,
      sortByLowPrice,
      sortByHigherPrice,
      sortByNewProduct,
      // filteredItems,
      valueMax,
      valueMin,
      drop,
      valueChange,
      listItem
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
@media only screen and (max-width: 1366px) {
  .list-product{
    padding: 2rem 5rem;
  }
}
</style>
