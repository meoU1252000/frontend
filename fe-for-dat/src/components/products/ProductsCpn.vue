<template>
  <router-link
    :to="{ name: 'showProductView', params: { id: product.id, kind:product.kind } }"
    class="product no-underline"
  >
    <div class="image">
      <img :src="product.main_image_src" alt="" />
    </div>
    <div class="wrap">
      <div class="name">
        <span>{{ product.product_name }}</span>
      </div>
      <div class="quantity">
        Còn {{ product.product_quantity_stock }} sản phẩm
      </div>
      <div class="product_footer_wrap">
        <div class="price">
          <span>{{ formatter(product.product_price) }}</span>
          <span class="price-second"></span>
        </div>
        <div class="icon">
          <img src="@/assets/images/icon-orthers/delivery-truck.png" alt="" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";
import { formatter } from "@/function/common";

export default defineComponent({
  props: {
    product: { type: Object },
  },
  setup() {
    
    return {
      formatter,
    };
  },
});
</script>

<style lang="scss" scoped>
.product {
  width: 20%;
  height: 27rem;
  color: var(--black-color);
  border: 1px solid #cccccc36;

  .image {
    display: flex;
    justify-content: center;
    img {
      width: 15rem;
      height: 20rem;
      object-fit: contain;
    }
  }

  .wrap {
    margin: 0 1rem;

    .name {
      span {
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .quantity {
      font-size: 0.75rem;
      font-weight: 400;
      color: #e6983a;

      margin: 0.2rem 0;
    }

    .product_footer_wrap {
      display: flex;
      align-items: center;

      .icon {
        flex: 1;
        display: flex;
        justify-content: flex-end;

        img {
          width: 2rem;
          height: 2rem;
          object-fit: contain;
        }
      }
    }
    .price {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: rgb(207, 15, 15, 1);
      font-weight: 700;

      .price-second {
        font-size: 0.85rem;
        text-decoration: line-through;
        color: #82869e;
        font-weight: 500;
      }
    }
  }
}
@media only screen and (max-width: 1920px) {
  .product {
    height: 22rem;
    .image {
      img {
        width: 10rem;
        height: 15rem;
        object-fit: contain;
      }
    }
  }
}
</style>
