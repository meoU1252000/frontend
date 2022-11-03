<template>
  <div class="sidebar-content">
        <div class="header text-xl">
          <div
            class="header-content w-11 p-4 flex align-items-center justify-content-center mx-auto border-dashed border-x-none border-top-none"
          >
            <img src="@/assets/images/icon-orthers/delivery-truck.png" alt="" />
            <h6 class="ml-2">Sản phẩm được miễn phí giao hàng</h6>
          </div>
        </div>
        <div class="body">
          <div class="body-content w-11 p-4">
            <h4>Chính sách bán hàng</h4>
            <div class="content pt-3 align-items-center flex">
              <img src="@/assets/images/icon-orthers/truck.svg" alt="" />
              <span class="pl-2"
                >Miễn phí giao hàng trên toàn lãnh thổ Việt Nam</span
              >
            </div>
            <div class="content pt-3 align-items-center flex">
              <img src="@/assets/images/icon-orthers/shield.svg" alt="" />
              <span class="pl-2">Cam kết hàng chính hãng 100%</span>
            </div>
            <div class="content pt-3 align-items-center flex">
              <img src="@/assets/images/icon-orthers/return.svg" alt="" />
              <span class="pl-2">Đổi trả trong vòng 10 ngày</span>
            </div>
          </div>
          <div class="body-content w-11 p-4">
            <h4>Dịch vụ khác</h4>
            <div class="content pt-3 align-items-center flex">
              <i class="pi pi-cog"></i>
              <span class="pl-2">Sửa chữa đồng giá 150.000đ</span>
            </div>
            <div class="content pt-3 align-items-center flex">
              <i class="pi pi-desktop"></i>
              <span class="pl-2">Vệ sinh máy tính, laptop</span>
            </div>
            <div class="content pt-3 align-items-center flex">
              <img src="@/assets/images/icon-orthers/shield.svg" alt="" />
              <span class="pl-2">Bảo hành tại nhà</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.sidebar-content {
  min-height: 20rem;
  background-color: white;
  .header {
    .header-content {
      color: rgb(83, 195, 5);
      border-bottom: 1px solid;
      border-color: rgb(224, 224, 224);
      img {
        widows: 2rem;
        height: 2rem;
      }
    }
  }
  .body {
    .body-content {
      i {
        font-size: 1.25rem;
        color: rgb(20, 53, 195);
      }
    }
  }
}
@media only screen and (max-width: 1920px) {
  .sidebar-content {
    .header {
      .header-content{
        padding:1rem 1rem 1rem 0rem !important;
      }
    }
  }
}
</style>