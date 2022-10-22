<template>
  <div class="sidebar-content">
    <div class="header text-xl">
      <div
        class="header-content w-full p-4 flex align-items-center justify-content-between"
      >
        <h6>Khuyến Mãi</h6>
        <a @click="openEventModal"
          ><i class="pi pi-tags"></i> Chọn Mã Khuyến Mãi</a
        >
        <my-dialog
          header="Mã Giảm Giá"
          v-model:visible="displayEventModal"
          :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
          :style="{ width: '26vw'}"
          :modal="true"
          :dismissableMask="true"
          :closeOnEscape="true"
        >
          <div class="col-12">
            <div class="p-inputgroup">
              <my-inputText placeholder="Nhập mã giảm giá" />
              <my-button label="Áp Dụng" />
            </div>
          </div>
          <div class="col-12 mt-2">
            <h4>Mã giảm giá</h4>
            <div
              class="event-code flex h-6rem border-1 mt-3"
            >
              <div class="col-3">
                <div class="image">
                    <img src="https://shopfront-cdn.tekoapis.com/cart/discount.png" alt="">
                </div>
              </div>
              <div class="col-9">
                <div class="flex flex-column">
                    <div class="event-code-content h-3rem">
                        <h5>Giảm 1.000.000đ</h5>
                    </div>
                    <div class="flex justify-content-between text-sm align-items-center">
                        <span class="text-500">
                           HSD: 31/11/2022
                        </span>
                        <my-button label="Áp Dụng" class="p-button-link p-button-sm" />
                    </div>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <my-button
              label="Đóng"
              @click="closeEventModal"
              class="p-button-outlined p-button-secondary p-button-sm"
            />
          </template>
        </my-dialog>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const displayEventModal = ref(false);
    const openEventModal = () => {
      displayEventModal.value = true;
    };
    const closeEventModal = () => {
      displayEventModal.value = false;
    };
    return {
      displayEventModal,
      openEventModal,
      closeEventModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-content {
  min-height: 4rem;
  background-color: white;
  .header {
    .header-content {
      h6{
          font-size: 1rem;
          font-weight: 500;
        }
      a {
        text-decoration: none;
        color: rgb(207, 15, 15, 1);
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
}
.event-code {
  border-color: #ccc;
  border-radius: 8px;
  .col-3{
    .image{
        border-style: none;
        border-radius: 0.25rem;
        border-width: 1px;
        border-color: unset;
        opacity: 1;
        background-color: rgb(232, 235, 249);
        width: 70%;
        min-width: 76px;
        height: 76px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;

    }
  }
}
.p-button-link{
    color: rgb(207, 15, 15, 1) !important;
}
</style>
