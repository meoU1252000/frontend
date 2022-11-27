<template>
    <TheLoadingCpn :isLoading="showLoading" />

  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="user-content flex w-9 flex mx-auto">
      <div class="content-header p-2 w-full">
        <my-TabView ref="tabview1">
          <my-TabPanel header="Thông Tin Tài Khoản">
            <form @submit.prevent="handleChangeInfo(!v$Info.$invalid)">
              <div class="mt-2">
                <div class="grid p-fluid px-4">
                  <div class="col-12 md:col-6">
                    <div class="p-inputgroup">
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                      </span>
                      <my-inputText
                        placeholder="Họ và tên"
                        v-model="stateInfo.user_name"
                        :class="{
                          'p-invalid': v$Info.user_name.$invalid && submitted,
                        }"
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
                        v-model="stateInfo.phone"
                        :class="{
                          'p-invalid': v$Info.phone.$invalid && submitted,
                        }"
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
                        v-model="stateInfo.email"
                        :class="{
                          'p-invalid': v$Info.email.$invalid && submitted,
                        }"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <my-button
                class="ml-4 mt-3 w-2 flex justify-content-center"
                label="Xác Nhận"
                type="submit"
              />
            </form>
          </my-TabPanel>
          <my-TabPanel header="Đổi Mật Khẩu">
            <form @submit.prevent="handleChangePassword(!v$Info.$invalid)">
              <div class="mt-2">
                <div class="grid p-fluid px-4">
                  <div class="col-12"><h4>Mật khẩu hiện tại</h4></div>
                  <div class="col-12">
                    <div class="p-inputgroup w-full">
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-key"></i>
                      </span>
                      <my-password
                        :feedback="false"
                        toggleMask
                        class="w-full"
                        inputClass="w-full"
                        placeholder="Nhập vào mật khẩu hiện tại"
                        v-model="statePassword.old_password"
                        :class="{
                          'p-invalid':
                            v$Password.old_password.$invalid && submitted,
                        }"
                      />
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
                      <my-password
                        placeholder="Nhập vào mật khẩu mới"
                        :feedback="false"
                        toggleMask
                        v-model="statePassword.password"
                        class="w-full"
                        inputClass="w-full"
                        :class="{
                          'p-invalid':
                            v$Password.password.$invalid && submitted,
                        }"
                      />
                    </div>
                    <small id="username1-help"
                      >Mật Khẩu phải có tối thiểu tám ký tự, ít nhất một chữ cái
                      viết hoa, một chữ cái viết thường, một số và một kí tự đặc
                      biệt!</small
                    >
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
                      <my-password
                        placeholder="Xác nhận mật khẩu"
                        :feedback="false"
                        toggleMask
                        inputClass="w-full"
                        v-model="statePassword.confirm_password"
                        class="w-full"
                        :class="{
                          'p-invalid':
                            v$Password.confirm_password.$invalid && submitted,
                        }"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-5 mt-3 px-4">
                <my-button
                  class="mt-2 w-2 flex justify-content-center"
                  label="Xác Nhận"
                  type="submit"
                />
              </div>
            </form>
          </my-TabPanel>
        </my-TabView>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import {
  helpers,
  maxLength,
  minLength,
  required,
  sameAs,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {
  setStateLogin,
  setUserLocal,
  getUserLocal,
  removeUserLocal,
} from "@/function/handleLogin";
import { useRouter } from "vue-router";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";

export default defineComponent({
  components: { TheLoadingCpn },
  setup() {
    const route = useRouter();
    const store = useStore();
    const showLoading = ref(false);
    const account = computed(() => {
      const user = store.getters["auth/getUserInfo"];

      return user || null;
    });

    const stateInfo = reactive({
      user_name: "",
      phone: "",
      email: "",
    });

    const statePassword = reactive({
      password: "",
      old_password: "",
      confirm_password: "",
    });

    watchEffect(() => {
      if (account.value != null) {
        console.log(account.value);
        Object.assign(stateInfo, {
          user_name: account.value.userName,
          phone: account.value.userPhone,
          email: account.value.userEmail,
        });
      }
    });

    const rulesInfo = computed(() => {
      return {
        email: {
          required: helpers.withMessage("Vui lòng nhập email", required),
        },
        phone: {
          required: helpers.withMessage(
            "Vui lòng nhập số điện thoại",
            required
          ),
          maxLength: maxLength(10),
          minLengthValue: minLength(10),
        },
        user_name: {
          required: helpers.withMessage("Vui lòng nhập họ tên", required),
        },
      };
    });

    const rulesPassword = computed(() => {
      return {
        password: {
          minLengthValue: minLength(8),
          valid: function (value) {
            const containsUppercase = /[A-Z]/.test(value);
            const containsLowercase = /[a-z]/.test(value);
            const containsNumber = /[0-9]/.test(value);
            const containsSpecial = /[#?!@$%^&*-]/.test(value);
            return (
              containsUppercase &&
              containsLowercase &&
              containsNumber &&
              containsSpecial
            );
          },
          required: helpers.withMessage("Vui lòng nhập mật khẩu", required),
        },
        confirm_password: {
          required: helpers.withMessage("Vui lòng nhập mật khẩu", required),
          sameAs: sameAs(statePassword.password),
        },
        old_password: {
          minLengthValue: minLength(8),
          valid: function (value) {
            const containsUppercase = /[A-Z]/.test(value);
            const containsLowercase = /[a-z]/.test(value);
            const containsNumber = /[0-9]/.test(value);
            const containsSpecial = /[#?!@$%^&*-]/.test(value);
            return (
              containsUppercase &&
              containsLowercase &&
              containsNumber &&
              containsSpecial
            );
          },
          required: helpers.withMessage("Vui lòng nhập mật khẩu", required),
        },
      };
    });

    const submitted = ref(false);
    const v$Info = useVuelidate(rulesInfo, stateInfo);
    const v$Password = useVuelidate(rulesPassword, statePassword);

    const handleChangeInfo = async (isFormValid) => {
      submitted.value = true;
      const user = {
        email: stateInfo.email,
        customer_phone: stateInfo.phone,
        customer_name: stateInfo.user_name,
        token: account.value.token,
      };
      if (isFormValid) {
        showLoading.value = true;
        const check = await store.dispatch("auth/changeInfo", user);
        showLoading.value = false;
        // console.log(check);
        if (check) {
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Chỉnh sửa thông tin thành công",
          });
          const userInfo = getUserLocal("login");
          userInfo.user.email = user.email;
          userInfo.user.customer_name = user.customer_name;
          userInfo.user.customer_phone = user.customer_phone;
          setUserLocal("login", userInfo);
          setStateLogin(store);
        } else {
          window.Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Chỉnh sửa thông tin thất bại. Vui lòng thử lại",
          });
        }
      }
    };

    const handleChangePassword = async (isFormValid) => {
      submitted.value = true;
      const user = {
        password: statePassword.password,
        old_password: statePassword.old_password,
        token: account.value.token,
      };
      if (isFormValid) {
        showLoading.value = true;
        const check = await store.dispatch("auth/changePassword", user);
        showLoading.value = false;

        console.log(check);
        if (check.message != "Request failed with status code 400") {
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại",
          });
          route.push(`/`);
          removeUserLocal("login");
          setStateLogin(store);
        } else {
          window.Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Đổi mật khẩu thất bại. Vui lòng thử lại",
          });
        }
      }
    };

    return {
      account,
      submitted,
      stateInfo,
      v$Info,
      rulesInfo,
      handleChangeInfo,
      statePassword,
      handleChangePassword,
      rulesPassword,
      v$Password,
      showLoading
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
    .content-header {
      .px-4 {
        .w-1 {
          width: 13.33333% !important;
        }
      }
    }
  }
}
</style>
