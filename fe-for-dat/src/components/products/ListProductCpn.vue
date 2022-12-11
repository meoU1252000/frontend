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
      <div class="main-product">
        <my-carousel
          :value="category.products"
          :numVisible="4"
          :numScroll="4"
          v-if="category.products.length > 4"
          class="w-full"
        >
          <template #item="slotProps">
            <ProductsCpn :product="slotProps.data" />
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
        <div class="filter-content mb-2">
          <h5 class="mb-3 p-2">Khoảng Giá</h5>
          <div class="input-range-currency mb-3">
            <my-inputNumber
              inputId="currency-vn-min"
              v-model="valueStart"
              class="mx-1"
              mode="currency"
              currency="VND"
              locale="vi-VN"
              readonly="true"
            />
            <my-inputNumber
              inputId="currency-vn-max"
              v-model="valueEnd"
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
            :step="100000"
            :min="0"
            :max="valueMax"
            class="mx-auto w-10 mb-4"
            @change="changeSliderPrice"
          ></my-slider>
          <my-button
            label="Lọc Giá"
            class="p-button-sm p-button flex mx-auto w-9"
            @click="filterPrice"
          ></my-button>
        </div>
        <ListAttributeCpn
          v-for="(attribute, k) in listCategoryHaveAttribute"
          :key="k"
          :attribute="attribute"
          :listItem="listItem"
          :category="category"
          :brand="brand"
          :propertyFilter="propertyFilter"
          @filter-item="filteredItems"
          @remove-item="removeFilter"
        />
      </div>
      <div class="col flex-grow-1 justify-content-center bg-white">
        <div class="head-categoryView" v-if="result.length > 0 || result == -1">
          <h4 class="title">Sắp xếp theo</h4>
          <div class="filter">
            <my-button
              label="Mặc Định"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'a' }"
              @click="sortByDefault(result)"
            ></my-button>
            <my-button
              label="Bán Chạy"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'b' }"
              @click="sortBySold(result)"
            ></my-button>
            <my-button
              label="Mới Về"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'c' }"
              @click="sortByNewProduct(result)"
            ></my-button>
            <my-button
              label="Giá Giảm Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'd' }"
              @click="sortByLowPrice(result)"
            ></my-button>
            <my-button
              label="Giá Tăng Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'e' }"
              @click="sortByHigherPrice(result)"
            ></my-button>
          </div>
        </div>
        <div
          class="head-categoryView"
          v-else-if="resultPrice.length > 0 || resultPrice == -1"
        >
          <h4 class="title">Sắp xếp theo</h4>
          <div class="filter">
            <my-button
              label="Mặc Định"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'a' }"
              @click="sortByDefault(resultPrice)"
            ></my-button>
            <my-button
              label="Bán Chạy"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'b' }"
              @click="sortBySold(resultPrice)"
            ></my-button>
            <my-button
              label="Mới Về"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'c' }"
              @click="sortByNewProduct(resultPrice)"
            ></my-button>
            <my-button
              label="Giá Giảm Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'd' }"
              @click="sortByLowPrice(resultPrice)"
            ></my-button>
            <my-button
              label="Giá Tăng Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'e' }"
              @click="sortByHigherPrice(resultPrice)"
            ></my-button>
          </div>
        </div>
        <div class="head-categoryView" v-else>
          <h4 class="title">Sắp xếp theo</h4>
          <div class="filter">
            <my-button
              label="Mặc Định"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'a' }"
              @click="sortByDefault(listProduct)"
            ></my-button>
            <my-button
              label="Bán Chạy"
              class="p-button-outlined p-button-sm p-button-secondary p-button"
              :class="{ active: selected === 'b' }"
              @click="sortBySold(listProduct)"
            ></my-button>
            <my-button
              label="Mới Về"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'c' }"
              @click="sortByNewProduct(listProduct)"
            ></my-button>
            <my-button
              label="Giá Giảm Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'd' }"
              @click="sortByLowPrice(listProduct)"
            ></my-button>
            <my-button
              label="Giá Tăng Dần"
              class="p-button-outlined p-button-sm p-button-secondary"
              :class="{ active: selected === 'e' }"
              @click="sortByHigherPrice(listProduct)"
            ></my-button>
          </div>
        </div>
        <div class="main-product" v-if="result.length > 0">
          <ProductsCpn
            v-for="(product, i) in result"
            :key="i"
            :product="product"
          />
        </div>

        <div class="main-product" v-else-if="resultPrice.length > 0">
          <ProductsCpn
            v-for="(product, i) in resultPrice"
            :key="i"
            :product="product"
          />
        </div>

        <div class="main-product" v-else-if="result == -1 || resultPrice == -1">
          <h4>Không tìm thấy sản phẩm phù hợp.</h4>
        </div>

        <div class="main-product" v-else>
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
import ListAttributeCpn from "../attribute/ListAttributeCpn.vue";
export default defineComponent({
  props: {
    listCategoryHaveAttribute: { type: Object },
    listProduct: { type: Object },
    category: { type: Object },
    brand: { type: Object },
    categoryView: { type: Boolean },
  },
  components: { ProductsCpn, ListAttributeCpn },
  setup(props) {
    const route = useRouter();
    const goToCategoryPage = (name) => {
      route.push(`/danh-muc/${name}`);
    };
    const propertyFilter = ref([]);
    const selected = ref("a");
    const valueMax = computed(() => {
      if (props.brand) {
        return props.brand.highest_product_price * 2;
      } else if (props.category) {
        return props.category.highest_product_price * 2;
      } else {
        return [];
      }
    });
    const valueStart = ref(0);
    const valueEnd =ref(valueMax.value);
    const valueChange = ref([0, valueMax.value]);
    const result = ref([]);
    const resultPrice = ref([]);
    const drop = ref();
    const sortByLowPrice = (listProduct) => {
      selected.value = "d";
      return listProduct.sort(function (a, b) {
        return b.product_price - a.product_price;
      });
    };
    const sortByNewProduct = (listProduct) => {
      selected.value = "c";
      return listProduct.sort(function (a, b) {
        return b.id - a.id;
      });
    };

    const sortByDefault = (listProduct) => {
      selected.value = "a";
      return listProduct.sort(function (a, b) {
        return a.id - b.id;
      });
    };

    const sortByHigherPrice = (listProduct) => {
      selected.value = "e";
      return listProduct.sort(function (a, b) {
        return a.product_price - b.product_price;
      });
    };

    const sortBySold = (listProduct) => {
      selected.value = "b";
      return listProduct.sort(function (a, b) {
        return b.product_sold - a.product_sold;
      });
    };

    const listItem = computed(() => {
      if (props.brand) {
        return props.brand.products ;
      } else if (props.category) {
        return props.category.products;
      }else{
        return [];
      }
    });

    const filteredItems = async (property) => {
      propertyFilter.value.push(property);
      // console.log(propertyFilter.value);
      const productArray = [];
      listItem.value.forEach((product) => {
        const attributeArray = [];

        product.product_attribute.forEach((attribute) => {
          attributeArray.push(attribute.params);
        });
        // console.log(attributeArrayTest);
        const check = propertyFilter.value.some((ele) => {
          // console.log(attributeArray);
          return attributeArray.includes(ele);
        });
        if (check) {
          productArray.push(product);
        }
      });
      if (productArray.length > 0) {
        result.value = productArray;
        switch (selected.value) {
          case "a":
            sortByDefault(result.value);
            break;
          case "b":
            sortBySold(result.value);
            break;
          case "c":
            sortByNewProduct(result.value);
            break;
          case "d":
            sortByLowPrice(result.value);
            break;
          case "e":
            sortByHigherPrice(result.value);
            break;
        }
      } else {
        result.value = -1;
      }

      filterPrice();
    };

    const removeFilter = async (property) => {
      propertyFilter.value = propertyFilter.value.filter(
        (ele) => ele != property
      );
      if(propertyFilter.value.length ==0){
        return result.value = 0;
      }
      // console.log(propertyFilter.value);
      const productArray = [];
      listItem.value.forEach((product) => {
        const attributeArray = [];

        product.product_attribute.forEach((attribute) => {
          attributeArray.push(attribute.params);
        });
        const check = propertyFilter.value.some((ele) => {
          return attributeArray.includes(ele);
        });
        if (check) {
          productArray.push(product);
        }
      });
      result.value = productArray;
      if (productArray.length > 0) {
        switch (selected.value) {
          case "a":
            sortByDefault(result.value);
            break;
          case "b":
            sortBySold(result.value);
            break;
          case "c":
            sortByNewProduct(result.value);
            break;
          case "d":
            sortByLowPrice(result.value);
            break;
          case "e":
            sortByHigherPrice(result.value);
            break;
        }
      } else {
        result.value = -1;
      }
      filterPrice();
    };

    const filterPrice = () => {
      const productArray = [];
      if (propertyFilter.value.length > 0) {
        // filteredItems();
        if (result.value.length > 0) {
          result.value.filter((product) => {
            console.log(product);
            if (
              product.product_price >= valueStart.value &&
              product.product_price <= valueEnd.value
            ) {
              productArray.push(product);
            }
          });
        } else {
          listItem.value.forEach((product) => {
            const attributeArray = [];

            product.product_attribute.forEach((attribute) => {
              attributeArray.push(attribute.params);
            });
            // console.log(attributeArrayTest);
            const check = propertyFilter.value.some((ele) => {
              // console.log(attributeArray);
              return attributeArray.includes(ele);
            });
            if (check) {
              productArray.push(product);
            }
          });
        }
        console.log(productArray.value);

        if (productArray.length > 0) {
          result.value = productArray;
          switch (selected.value) {
            case "a":
              sortByDefault(result.value);
              break;
            case "b":
              sortBySold(result.value);
              break;
            case "c":
              sortByNewProduct(result.value);
              break;
            case "d":
              sortByLowPrice(result.value);
              break;
            case "e":
              sortByHigherPrice(result.value);
              break;
          }
        } else {
          result.value = -1;
        }
      } else {
        props.listProduct.filter((product) => {
          if (
            product.product_price >= valueStart.value &&
            product.product_price <= valueEnd.value
          ) {
            productArray.push(product);
          }
        });
        resultPrice.value = productArray;
        if (productArray.length > 0) {
          switch (selected.value) {
            case "a":
              sortByDefault(resultPrice.value);
              break;
            case "b":
              sortBySold(resultPrice.value);
              break;
            case "c":
              sortByNewProduct(resultPrice.value);
              break;
            case "d":
              sortByLowPrice(resultPrice.value);
              break;
            case "e":
              sortByHigherPrice(resultPrice.value);
              break;
          }
        } else {
          resultPrice.value = -1;
        }
      }
    };
    const changeSliderPrice = () => {
      valueStart.value = valueChange.value[0];
      valueEnd.value = valueChange.value[1];
      console.log(valueEnd.value);
      console.log(valueChange.value[1]);
    };

    return {
      goToCategoryPage,
      sortByLowPrice,
      sortByHigherPrice,
      sortByNewProduct,
      filteredItems,
      valueStart,
      valueEnd,
      drop,
      valueChange,
      listItem,
      selected,
      sortByDefault,
      sortBySold,
      propertyFilter,
      result,
      removeFilter,
      filterPrice,
      changeSliderPrice,
      valueMax,
      resultPrice,
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
  :deep(.border-top-1) {
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
