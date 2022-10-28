<template>
  <div class="product-content flex w-full flex">
    <div class="content-header flex p-2 w-full">
      <div class="col-9">
        <div class="px-2">
          <h2>Mô tả sản phẩm</h2>
        </div>
        <div v-if="!readMoreActive">
          <div
            class="product-description px-2 pt-4 mr-8"
            v-html="product.product_description.slice(0, 2000)"
          ></div>
          <div class="w-full justify-content-center flex my-4">
            <my-button label="Read More" @click="readMore()"></my-button>
          </div>
        </div>
        <div v-if="readMoreActive">
          <div
            class="product-description px-2 pt-4 mr-8"
            v-html="product.product_description"
          ></div>
          <div class="w-full justify-content-center flex my-4">
            <my-button
              label="Less"
              @click="readMore()"
              class="p-button-outlined"
            ></my-button>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="px-2">
          <h2>Thông tin chi tiết</h2>
          <div class="product-params mt-2">
            <div class="flex p-2">
              <div class="col-5">Thương hiệu</div>
              <div class="col-7">{{ product.brand.brand_name }}</div>
            </div>
          </div>
          <div class="product-params">
            <div class="flex p-2">
              <div class="col-5">Bảo hành</div>
              <div class="col-7">12 tháng</div>
            </div>
          </div>
          <div class="px-2 py-3 product-information">Thông tin chung</div>
          <div
            v-for="(attribute, k) in product.product_attribute.slice(0, 4)"
            :key="k"
            class="product-params"
          >
            <div class="flex p-2">
              <div class="col-5">
                <span>{{ attribute.attribute_name }}</span>
              </div>
              <div class="col-7">
                <span>{{ attribute.params }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="product.product_attribute.length > 8"
            class="align-items-center justify-content-center text-center"
          >
            <a class="read-more-href" @click="openAttributeModal"
              ><span> Xem thêm nội dung </span> <i class="pi pi-angle-down"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <my-dialog
      header="Thông số kỹ thuật"
      v-model:visible="displayAttributeModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '40vw' }"
      :modal="true"
      :dismissableMask="true"
      :closeOnEscape="true"
    >
      <div class="col-12">
        <div class="px-2">
          <div class="product-params mt-2">
            <div class="flex p-2">
              <div class="col-5">Thương hiệu</div>
              <div class="col-7">{{ product.brand.brand_name }}</div>
            </div>
          </div>
          <div class="product-params">
            <div class="flex p-2">
              <div class="col-5">Bảo hành</div>
              <div class="col-7">12 tháng</div>
            </div>
          </div>
          <div class="px-2 py-3 product-information">Thông tin chung</div>
          <div
            v-for="(attribute, k) in product.product_attribute"
            :key="k"
            class="product-params"
          >
            <div class="flex p-2">
              <div class="col-5">
                <span>{{ attribute.attribute_name }}</span>
              </div>
              <div class="col-7">
                <span>{{ attribute.params }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <my-button
          label="Đóng"
          @click="closeAttributeModal"
          class="p-button-outlined p-button-secondary p-button-sm"
        />
      </template>
    </my-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    product: { type: Object },
  },

  setup() {
    const readMoreActive = ref(false);
    const displayAttributeModal = ref(false);
    const readMore = () => {
      readMoreActive.value = !readMoreActive.value;
    };
    const openAttributeModal = () => {
      displayAttributeModal.value = true;
    };
    const closeAttributeModal = () => {
      displayAttributeModal.value = false;
    };
    return {
      readMoreActive,
      readMore,
      displayAttributeModal,
      openAttributeModal,
      closeAttributeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-content {
  min-height: 20rem;
  background-color: white;
}
.product-description {
  ::v-deep *{
    font-size: 1rem;
    margin-bottom: 1rem !important;
    text-align: justify !important;
  }
}

.product-information {
  color: rgb(207, 15, 15);
}

.product-params:nth-child(even) {
  background-color: white;
}
.product-params:nth-child(odd) {
  background-color: rgb(246, 246, 246);
}
.read-more-href {
  text-decoration: none;
  color: rgb(207, 15, 15);
  cursor: pointer;
}
</style>
