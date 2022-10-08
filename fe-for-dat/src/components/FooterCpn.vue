<template>
  <div class="w-full footer h-25rem">
    <div class="flex justify-content-between footer_wrap h-full">
      <div class="flex-initial justify-content-center h-full">
        <h4 style="color: white">Thông tin Cửa Hàng</h4>
        <div class="store_link">
          <router-link class="text" to="/"
            >Giới Thiệu Thành Đạt Store</router-link
          >
          <router-link class="text" to="/">Hệ Thống Cửa Hàng</router-link>
          <router-link class="text" to="/">Hỏi Đáp</router-link>
          <router-link class="text" to="/">Tin Tuyển Dụng</router-link>
        </div>
      </div>
      <div class="flex-initial justify-content-center h-full">
        <h4 style="color: white">Chính sách Mua hàng và Bảo hành</h4>
        <div class="store_link">
          <router-link class="text" to="/">Quy Định Chung</router-link>
          <router-link class="text" to="/"
            >Chính Sách Bảo Mật Thông Tin</router-link
          >
          <router-link class="text" to="/"
            >Chính Sách Vận Chuyển Và Lắp Đặt</router-link
          >
          <router-link class="text" to="/">Chính Sách Bảo Hành</router-link>
          <router-link class="text" to="/"
            >Chính Sách Đổi Trả Và Hoàn Tiền</router-link
          >
        </div>
      </div>
      <div class="flex-initial justify-content-center h-full">
        <h4 style="color: white">Hỗ Trợ Khách Hàng</h4>
        <div class="store_link">
          <router-link class="text" to="/">Trung Tâm Bảo Hành</router-link>
          <router-link class="text" to="/">Thanh Toán Và Giao Hàng</router-link>
          <router-link class="text" to="/"
            >Dịch Vụ Sửa Chữa Và Bảo Trì</router-link
          >
        </div>
      </div>
      <div class="flex-initial justify-content-center h-full">
        <h4 style="color: white">Liên Hệ</h4>
        <div class="store_link">
          <span class="text"
            >Địa Chỉ: 472/5 Phan Huy Ích, phường 12, Quận Gò Vấp, TP Hồ Chí
            Minh</span
          >
          <span class="text">Số Điện Thoại: 0984978407</span>
          <span class="text">Email: datB1809227@student.ctu.edu.vn</span>
          <div class="flex">
            <router-link class="text icon_link" to="/">
              <i class="pi pi-facebook"></i
            ></router-link>
            <router-link class="text icon_link" to="/">
              <i class="pi pi-google"></i
            ></router-link>
            <router-link class="text icon_link" to="/">
              <i class="pi pi-instagram"></i
            ></router-link>
          </div>
        </div>
      </div>
      <div class="flex-initial justify-content-center h-full">
        <div class="map_container">
          <div class="map">
            <div id="googleMap">
              <GoogleMapCpn />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import GoogleMapCpn from "@/components/GoogleMapCpn.vue";
export default defineComponent({
  components: { GoogleMapCpn },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scope>
.footer {
  background: #333333;
  .footer_wrap {
    padding: 3rem 10rem 0 10rem;
    .store_link {
      margin-top: 2rem;
      display: block;
      width: 12rem;
      // word-break: break-word;
    }
    .text {
      display: block;
      margin-top: 1rem;
      text-decoration: none;
      color: white;
    }
  }
}
.map_container {
  width: 100%;
  // height: 210px;
  // overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  .map {
    height: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    #googleMap {
      height: 100%;
    }
  }
}
.icon_link{
  margin-right: 1rem;
}

.icon_link i{
  font-size: 1.25rem;
}
</style>
