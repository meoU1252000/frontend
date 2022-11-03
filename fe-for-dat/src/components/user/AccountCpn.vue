<template>
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="user-content flex w-9 flex mx-auto">
      <div class="content-header p-2 w-full">
        <div class="pt-5 w-full text-center">
          <h2>Thông Tin Tài Khoản</h2>
        </div>
        <div class="mt-6">
          <div class="grid p-fluid px-4">
            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
                </span>
                <my-inputText
                  placeholder="Họ và tên"
                  :value="account.userName"
                />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-phone"></i>
                </span>
                <my-inputText
                  placeholder="Số điện thoại"
                  mask="(+84) 000-0000-00"
                  :value="account.userPhone"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div class="grid p-fluid px-4">
            <div class="col-12">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
                </span>
                <my-inputText
                  placeholder="Địa chỉ Email"
                  :value="account.userEmail"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 px-5 w-full password-row">
          <div class="row-separate"><h3>Thay Đổi Mật Khẩu</h3></div>
        </div>
        <div class="mt-2">
          <div class="grid p-fluid px-4">
            <div class="col-12"><h4>Mật khẩu hiện tại</h4></div>
            <div class="col-12">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-key"></i>
                </span>
                <my-inputText placeholder="Nhập vào mật khẩu hiện tại" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="grid p-fluid px-4">
            <div class="col-12"><h4>Mật khẩu mới</h4></div>
            <div class="col-12">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-key"></i>
                </span>
                <my-inputText placeholder="Nhập vào mật khẩu mới" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="grid p-fluid px-4">
            <div class="col-12"><h4>Xác nhận mật khẩu</h4></div>
            <div class="col-12">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-key"></i>
                </span>
                <my-inputText placeholder="Xác nhận mật khẩu" />
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 px-4">
          <my-button
            class="mt-2 w-1 flex justify-content-center"
            label="Xác Nhận"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });
    return {
      account,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
  .password-row {
    .row-separate {
      &:after {
        content: " ";
        display: block;
        position: relative;
        border-top: 1px solid black;
        width: 100%;
        opacity: 0.2;
        padding-left: 0px;
        top: 1rem;
      }
    }
  }
  button {
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
}
@media only screen and (max-width: 1920px) {
  .user-content {
    .content-header{
      .px-4{
        .w-1{
          width: 13.33333% !important;
        }
      }
    }
   
  }
}
</style>
