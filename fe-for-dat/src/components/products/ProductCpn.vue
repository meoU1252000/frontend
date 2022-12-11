<template>
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="product-content flex w-9 flex mx-auto">
      <div class="content-header flex p-2 w-full">
        <div class="col-5 pt-5">
          <div class="image flex justify-content-center">
            <my-image
              :src="currentSrc"
              alt=""
              imageClass="imageFit"
              preview
              v-if="currentSrc != null"
            />
            <my-image
              :src="image"
              alt=""
              imageClass="imageFit"
              preview
              v-else
            />
          </div>
          <div
            class="image-slider flex mt-3 border-dashed border-x-none border-top-none"
          >
            <my-carousel
              :value="listImage"
              :numVisible="4"
              :numScroll="1"
              class="overflow-hidden"
              :responsiveOptions="responsiveOptions"
              v-if="listImage.length > 0"
            >
              <template #item="slotProps">
                <my-image
                  :src="slotProps.data.product_src"
                  alt=""
                  imageClass="w-4rem h-4rem mr-3"
                  @mouseover="changeSource(slotProps.data.product_src)"
                />
              </template>
            </my-carousel>
          </div>
          <div class="p-4 text-base">
            <div v-for="(attribute, j) in productAttribute" :key="j">
              <span>
                - {{ attribute.attribute_name }}: {{ attribute.params }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div class="title border-dashed border-x-none border-top-none">
            <div class="product-name">
              <h6 class="text-3xl">{{ product.product_name }}</h6>
            </div>
            <div class="brand flex text-base align-items-baseline mt-2">
              <div class="flex pr-3">
                <label>Thương Hiệu</label>
                <router-link to="/">{{ brand.brand_name }}</router-link>
              </div>
              <div class="separate"></div>
              <div class="pl-3">
                <label>Mã Sản Phẩm: </label>
                <span>SP-{{ product.id }}</span>
              </div>
            </div>
            <div class="flex mt-3 align-items-center">
              <star-rating
                v-model:rating="rating"
                :show-rating="false"
                :read-only="true"
                star-size="30"
                class="justify-content-center"
              ></star-rating>
              <h5 class="ml-2">{{total}} đánh giá</h5>
            </div>
            <div
              class="filter mt-2 brand"
              v-for="(attribute, i) in attributes"
              :key="i"
            >
              <div class="filter-color" v-if="(attribute.param.length > 1) && (product.category_root == 'Laptop' || product.category_root == 'Điện Thoại')" >
                <label
                  >{{ attribute.attribute_name }}:
                  {{ product_current_attribute[i]["params"] }}
                </label>
                <div class="flex mt-2 attributes" >
                  <div
                    class="product-color pr-2 custom-button"
                    v-for="(param, j) in attribute.param"
                    :key="j"
                  >
                    <my-button
                      :label="param.param_value"
                      class="p-button-outlined p-button-sm"
                      :class="{
                        'button-2':
                          product_current_attribute[i]['params'] ==
                          param.param_value,
                        'p-button-secondary':
                          product_current_attribute[i]['params'] !=
                          param.param_value,
                      }"
                     
                      @click="
                        goToProductFilterPage(
                          param.param_value,
                          attribute.attribute_name
                        )
                      "
                    ></my-button>
                  </div>
                </div>
              </div>
            </div>

            <div class="quantity mt-3">
              Còn {{ product.product_quantity_stock }} sản phẩm
            </div>
            <div class="product_footer_wrap mt-3">
              <div class="price">
                <span class="text-xl">{{
                  formatter(product.product_price)
                }}</span>
              </div>
            </div>
          </div>
          <div
            class="flex mt-4 action_button border-dashed border-x-none border-top-none"
            v-if="product.product_quantity_stock > 0 && product.product_price > 0"
          >
            <div class="col-6">
              <my-button class="w-full justify-content-center action-buy" @click="goToCheckOutPage(product)"
                >MUA NGAY</my-button
              >
              <!-- <my-button
                class="p-button-outlined w-full justify-content-center action-add" disabled="disabled"
                v-else>Hết Hàng</my-button
              > -->
            </div>
            <div class="col-6">
              <my-button
                class="p-button-outlined w-full justify-content-center action-add"
                :value="product"
                @click="addCart(product)"
                >THÊM VÀO GIỎ HÀNG</my-button
              >
            </div>
          </div>
          <div
            class="flex mt-4 action_button border-dashed border-x-none border-top-none"
            v-else
          >
            <my-button
              class="w-full justify-content-center p-button-secondary h-4rem"
              disabled="disabled"
              >HẾT HÀNG</my-button
            >
          </div>
          <div class="pt-3 text-base event-content">
            <h4>Khuyến mãi liên quan</h4>
            <ul class="pl-4 text-sm">
              <li class="pt-3 pb-2">
                Trả góp 6 tháng lãi suất 0% với đơn hàng >3tr
                <router-link to="/">Xem chi tiết</router-link>
              </li>
              <li class="pb-2">
                Nhập mã PV100 giảm thêm 5% tối đa 100.000đ khi thanh toán qua
                VNPAY-QR.
                <router-link to="/">Xem chi tiết</router-link>
              </li>
              <li class="pb-2">
                Nhập mã PV1000 giảm thêm 1.000.000đ khi thanh toán qua VNPAY-QR.
                <router-link to="/">Xem chi tiết</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar w-3 ml-3">
      <SideBarCpn />
    </div>
  </div>
  <div
    class="px-7 pb-7 mx-auto w-11 flex justify-content-between"
    v-if="product.product_description"
  >
    <ProductDescriptionCpn :product="product" />
  </div>
  <div class="px-7 pb-7 mx-auto w-11 flex justify-content-between">
    <ProductRatingCpn :product="product" />
  </div>
  <div class="px-7 pb-7 mx-auto w-11 flex justify-content-between">
    <ProductCommentCpn :product="product" />
  </div>
</template>

<script>
import { computed, defineComponent, ref, onMounted } from "vue";
// import { inject } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { formatter } from "@/function/common";
import { addProductToCart, setStateCart } from "@/function/handleLocalStorage";
import ProductDescriptionCpn from "./ProductDescriptionCpn.vue";
import ProductCommentCpn from "./ProductCommentCpn.vue";
import ProductRatingCpn from "./ProductRatingCpn.vue";
import { getCartList } from "@/function/getCartList";
import SideBarCpn from "./SideBarCpn.vue";
// import Swal from 'sweetalert2';
export default defineComponent({
  components: {
    ProductDescriptionCpn,
    SideBarCpn,
    ProductCommentCpn,
    ProductRatingCpn,
  },
  props: {
    product: { type: Object },
    urlKind: { type: String },
  },

  setup(props) {
    const images = ref([]);
    const store = useStore();
    const currentSrc = ref();
    const route = useRouter();
    const brand = computed(() => {
      return props.product.brand || [];
    });
    const responsiveOptions = ref([
      {
        breakpoint: "1920",
        numVisible: 3,
        numScroll: 3,
      },
    ]);
    onMounted(async () => {
      
      window.scrollTo(0, 0);
    });
    const filterParam = ref({
      chip: "",
      rom: "",
      ram: "",
      color: "",
    });
    const image = computed(() => {
      return props.product.main_image_src || [];
    });
    const listImage = computed(() => {
      return props.product.images || [];
    });

    const listProduct = computed(() => {
      return store.getters["product/getListProduct"] || [];
    });
    const productAttribute = computed(() => {
      return props.product.product_attribute || [];
    });

    const product_current_attribute = computed(() => {
      const currentItem = productAttribute.value.filter((attribute) => {
        return attribute.params;
      });
      if (props.urlKind.includes("iphone") || props.urlKind.includes("macbook") || props.product.category_root == "Laptop" || props.product.category_root == "Điện Thoại") {
        Object.assign(filterParam.value, {
          rom: currentItem[3].params,
          color: currentItem[5].params,
        });
      }
      return currentItem;
    });

    const changeSource = (key) => {
      return (currentSrc.value = key);
    };

    const category = computed(() => {
      return props.product.category || [];
    });

    const attributes = computed(() => {
      return category.value.attribute;
    });

    const goToProductFilterPage = (value, name) => {
      const tempFilter = filterParam;
      if (props.urlKind.includes("iphone") || props.urlKind.includes("macbook") || props.product.category_root == "Laptop" || props.product.category_root == "Điện Thoại") {
        switch (name) {
          case "Màu sắc":
            filterParam.value.color = value;
            break;
          case "ROM":
          default:
            filterParam.value.rom = value;
        }
        console.log(filterParam.value.rom);
        try {
          listProduct.value.forEach((ele) => {
            if (ele.kind !== props.urlKind) return;
            if(props.urlKind.includes("iphone") || props.urlKind.includes("macbook") || props.product.category_root == "Laptop" || props.product.category_root == "Điện Thoại"){
              if (
                ele.product_attribute[5].params == filterParam.value.color &&
                ele.product_attribute[3].params == filterParam.value.rom
              ) {
                route.push(`/san-pham/${props.urlKind}/${ele.id}`);
                changeSource(null);
                throw "Nothing";
              }
            }
          });
        } catch (e) {
          if (e === "Nothing") return;
        }

        filterParam.value = tempFilter;
        console.log(filterParam.value);
        window.Swal.fire({
          icon: "error",
          title: "Lỗi...",
          text: "Không có sản phẩm tương ứng!",
        });
      } else {
        filterParam.value.color = value;
        try {
          listProduct.value.forEach((ele) => {
            if (ele.kind !== props.urlKind) return;
            if ( ele.product_attribute[5].params == filterParam.value.color ) {
              route.push(`/san-pham/${props.urlKind}/${ele.id}`);
              changeSource(null);
              throw "Nothing";
            }
          });
        } catch (e) {
          if (e === "Nothing") return;
        }

        filterParam.value = tempFilter;
        console.log(filterParam.value);
        window.Swal.fire({
          icon: "error",
          title: "Lỗi...",
          text: "Không có sản phẩm tương ứng!",
        });
      }
    };

    const cartList = computed(() => {
      const cartItem = store.getters["product/getCart"] || [];

      return getCartList(listProduct.value, cartItem);
    });

    const addCart = (item) => {
      if (cartList.value.length > 0) {
        const check = cartList.value.find((product) => {
          if (product.productId === item.id) {
            if (product.quantity >= product.productStock) {
              window.Swal.fire({
                icon: "error",
                title: "Lỗi...",
                text: "Số lượng sản phẩm vượt quá số lượng tồn. Vui lòng thử lại!",
              });
              return 1;
            } else {
              window.Swal.fire({
                icon: "success",
                title: "Thành Công",
                text: "Thêm sản phẩm vào giỏ hàng thành công!",
              });
              const cartItem = {
                productId: item.id,
                quantity: 1,
                maxQuantity: item.product_quantity_stock,
              };
              addProductToCart(cartItem);
              setStateCart(store);
              return 1;
            }
          }
        });
        if (!check) {
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Thêm sản phẩm vào giỏ hàng thành công!",
          });
          const cartItem = {
            productId: item.id,
            quantity: 1,
            maxQuantity: item.product_quantity_stock,
          };
          addProductToCart(cartItem);
          setStateCart(store);
        }
      } else {
        const cartItem = {
          productId: item.id,
          quantity: 1,
          maxQuantity: item.product_quantity_stock,
        };
        addProductToCart(cartItem);
        setStateCart(store);
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Thêm sản phẩm vào giỏ hàng thành công!",
        });
      }
    };

    const star = computed(() => {
      return props.product.product_star || 0;
    });

    const star5 = computed(() => {
      return star.value.star_5 || 0;
    });

    const star4 = computed(() => {
      return star.value.star_4 || 0;
    });

    const star3 = computed(() => {
      return star.value.star_3 || 0;
    });

    const star2 = computed(() => {
      return star.value.star_2 || 0;
    });

    const star1 = computed(() => {
      return star.value.star_1 || 0;
    });

    const total = computed(() => {
      return star.value.total || 0;
    });

     const rating = computed(() => {
      return (
        (star1.value * 1 +
          star2.value * 2 +
          star3.value * 3 +
          star4.value * 4 +
          star5.value * 5) /
          total.value || 0
      );
    });

    const goToCheckOutPage = (item) => {
      addCart(item);
      route.push(`/thanh-toan`);
    };

    return {
      brand,
      images,
      category,
      formatter,
      listImage,
      currentSrc,
      changeSource,
      image,
      productAttribute,
      attributes,
      responsiveOptions,
      product_current_attribute,
      goToProductFilterPage,
      filterParam,
      listProduct,
      addCart,
      addProductToCart,
      star,
      star5,
      star4,
      star3,
      star2,
      star1,
      total,
      rating,
      goToCheckOutPage
    };
  },
});
</script>

<style lang="scss" scoped>
.product-content {
  min-height: 20rem;
  background-color: white;
  .content-header {
    .col-5 {
      .image {
        display: flex;
        justify-content: center;
      }
    }
  }

  .content-header {
    .col-5 {
      .image-slider {
        min-height: 7rem;
        border-bottom: 1px solid;
        border-color: rgb(224, 224, 224);
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .brand {
    color: rgb(130, 134, 158);
    a {
      padding-left: 0.4rem;
      text-decoration: none;
      color: rgb(207, 15, 15, 1);
    }
    .separate::after {
      content: "";
      border-right: 1px solid;
      text-align: end;
    }
  }

  .attributes{
    flex-flow: wrap;
    .product-color{
      margin: 0rem 0.5rem 0.5rem 0rem;
    }
  }
  .quantity {
    font-size: 0.8rem;
    font-weight: 400;
    color: #e6983a;

    margin: 0.2rem 0;
  }
  .price {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: rgb(207, 15, 15, 1);
    font-weight: 700;
    margin-bottom: 1rem;
    .price-second {
      font-size: 0.85rem;
      text-decoration: line-through;
      color: #82869e;
      font-weight: 500;
    }
  }
  .title {
    min-height: 25rem;
    border-bottom: 1px solid;
    border-color: rgb(224, 224, 224);
  }
  .action_button {
    min-height: 5rem;
    border-bottom: 1px solid;
    border-color: rgb(224, 224, 224);

    .action-buy {
      background-color: rgb(207, 15, 15, 1) !important;
      border-color: rgb(207, 15, 15, 1) !important;
      &:enabled:hover {
        background-color: rgb(145, 10, 10) !important;
        border-color: rgb(207, 15, 15, 1) !important;
      }
      &:focus {
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
      }
    }

    .action-add {
      color: rgb(207, 15, 15, 1) !important;
      &:enabled:hover {
        background: rgba(246, 59, 59, 0.04) !important;
        border-color: rgb(145, 10, 10) !important;
      }
      &:focus {
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
      }
    }
  }
  .event-content {
    a {
      color: rgb(207, 15, 15, 1);
    }
  }
}

.custom-button {
  .button-1 {
    background-color: rgb(207, 15, 15, 1) !important;
    border-color: rgb(207, 15, 15, 1) !important;
    &:enabled:hover {
      background-color: rgb(145, 10, 10) !important;
      border-color: rgb(207, 15, 15, 1) !important;
    }
    &:focus {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
    }
  }

  .button-2 {
    color: rgb(207, 15, 15, 1) !important;
    &:enabled:hover {
      background: rgba(246, 59, 59, 0.04) !important;
      border-color: rgb(145, 10, 10) !important;
    }
    &:focus {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
    }
  }
}

@media only screen and (max-width: 1920px) {
  .product-content {
    .content-header {
      .col-5 {
        .image {
          :deep(.p-image) {
            img {
              width: 100% !important;
              height: 15rem !important;
              object-fit: contain;
            }
          }
        }
      }
      .col-7 {
        padding: 1rem !important;
      }
    }
  }
}
</style>
