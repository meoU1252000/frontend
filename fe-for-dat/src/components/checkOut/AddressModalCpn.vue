<template>
  <my-dialog
    header="Thêm Địa Chỉ Mới"
    :visible="displayModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    @update:visible="closeModal"
  >
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="w-full">
      <div class="content-header w-full">
        <div class="card">
          <div class="mt-5">
            <div class="grid p-fluid px-4">
              <div class="col-12">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                  </span>
                  <my-inputText
                    placeholder="Họ và tên"
                    v-model="state.user_name"
                    :class="{
                      'p-invalid': v$.user_name.$invalid && submitted,
                    }"
                  />
                </div>
              </div>

              <div class="col-12">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-phone"></i>
                  </span>
                  <my-inputText
                    placeholder="Số điện thoại"
                    v-model="state.phone"
                    :class="{
                      'p-invalid': v$.phone.$invalid && submitted,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="grid p-fluid px-4">
            <div class="col-12">
              <div class="p-inputgroup">
                <my-dropdown
                  v-model="state.city"
                  :options="listCities"
                  optionLabel="full_name"
                  optionValue="code"
                  placeholder="Chọn tỉnh/thành phố"
                  :filter="true"
                  :class="{
                    'p-invalid': v$.city.$invalid && submitted,
                  }"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="p-inputgroup">
                <my-dropdown
                  v-model="state.district"
                  :options="listDistricts"
                  optionLabel="full_name"
                  optionValue="code"
                  placeholder="Chọn quận/huyện"
                  :filter="true"
                  :class="{
                    'p-invalid': v$.district.$invalid && submitted,
                  }"
                />
              </div>
            </div>
          </div>

          <div class="grid p-fluid px-4">
            <div class="col-12">
              <div class="p-inputgroup">
                <my-dropdown
                  v-model="state.ward"
                  :options="listWards"
                  optionLabel="full_name"
                  optionValue="code"
                  placeholder="Chọn xã/phường/thị trấn"
                  :filter="true"
                  :class="{
                    'p-invalid': v$.ward.$invalid && submitted,
                  }"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-bookmark"></i>
                </span>
                <my-inputText
                  placeholder="Nhập địa chỉ"
                  v-model="state.address"
                  :class="{
                    'p-invalid': v$.address.$invalid && submitted,
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog_footer_form">
        <my-button
          label="Trở Lại"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeModal"
        />
        <my-button label="Thêm Địa Chỉ" type="submit" icon="pi pi-check" autofocus />
      </div>
    </form>

  </my-dialog>
</template>
<script>
import { defineComponent, onMounted, computed, reactive, ref } from "vue";
import { useStore } from "vuex";

import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default defineComponent({
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  props: {
    displayModal: { type: Boolean, default: false },
    account: { type: Object },
  },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      user_name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    });

    const selectedAddress = ref();

    const rules = computed(() => {
      return {
        user_name: {
          required: helpers.withMessage("Vui lòng nhập họ tên", required),
        },
        phone: {
          required: helpers.withMessage(
            "Vui lòng nhập số điện thoại",
            required
          ),
          maxLength: maxLength(10),
          minLengthValue: minLength(10),
        },
        city: {
          required: helpers.withMessage(
            "Vui lòng chọn tỉnh/thành phố",
            required
          ),
        },
        district: {
          required: helpers.withMessage("Vui lòng chọn quận/huyện", required),
        },
        ward: {
          required: helpers.withMessage(
            "Vui lòng chọn phường/xã/thị trấn",
            required
          ),
        },
        address: {
          required: helpers.withMessage("Vui lòng nhập địa chỉ", required),
        },
      };
    });

    const submitted = ref(false);

    const v$ = useVuelidate(rules, state);

    onMounted(async () => {
      await store.dispatch("auth/getListCity");
    });

    const listCities = computed(() => {
      return store.getters["auth/getCities"] || [];
    });

    const listAddress = computed(() => {
      return store.getters["auth/getUserAddress"] || [];
    });

    const dataSelectedAddress = async () => {
      const data = listAddress.value.filter((address) => {
        if (address.id == selectedAddress.value) {
          return address;
        }
      });
      if (data.length > 0) {
        state.user_name = data[0].receiver_name;
        state.phone = data[0].receiver_phone;

        const arr_address = data[0].receiver_address.split(",");
        state.address = arr_address[0];
        state.ward = arr_address[1];
        state.district = arr_address[2];
        state.city = arr_address[3];

        return data;
      }
      return [];
    };

    const listDistricts = computed(() => {
      const province = listCities.value.filter((code) => {
        if (state.city == code.code) {
          return code.districts;
        }
      });
      if (province.length > 0) {
        const districts = province[0].districts;
        return districts;
      }
      return [];
    });

    const listWards = computed(() => {
      const districts = listDistricts.value.filter((code) => {
        if (state.district == code.code) {
          return code.wards;
        }
      });
      if (districts.length > 0) {
        const wards = districts[0].wards;
        return wards;
      }
      return [];
    });

    const handleSubmit = async (isFormValid) => {
      submitted.value = true;
      if (isFormValid) {
        const city = listCities.value.filter((code) => {
          if (state.city == code.code) {
            return code.districts;
          }
        });
        const districts = listDistricts.value.filter((code) => {
          if (state.district == code.code) {
            return code.wards;
          }
        });
        const wards = listWards.value.filter((code) => state.ward == code.code);
        const address =
          state.address +
          "," +
          wards[0].full_name +
          "," +
          districts[0].full_name +
          "," +
          city[0].full_name;

        const customer_address = {
          receiver_name: state.user_name,
          receiver_phone: state.phone,
          receiver_address: address,
          token: props.account.token,
        };

        const check = await store.dispatch("auth/createAddress", customer_address);
        if(check){
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Thêm địa chỉ thành công",
          });
          await store.dispatch("auth/getListAddress", props.account.token);
        }else {
          window.Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Lỗi khi thêm địa chỉ. Vui lòng đăng nhập hoặc thử lại sau.",
          });
        }
        closeModal();
      }
    };

    const closeModal = () => {
      emit("close-modal");
    };

    return {
      listAddress,
      dataSelectedAddress,
      selectedAddress,
      listDistricts,
      listWards,
      listCities,
      submitted,
      v$,
      rules,
      state,
      handleSubmit,
      closeModal,
    };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
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
.dialog_footer_form {
  border-top: 0 none;
  background: #ffffff;
  color: #495057;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  text-align: right;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  padding-right: 0;
  padding-bottom: 0;
}

.dialog_footer_form button {
  margin: 0 0.5rem 0 0;
  width: auto;
}
@media only screen and (max-width: 1920px) {
  .user-content {
    .content-header {
      .card {
        :deep(.p-datatable) {
          font-size: 0.8rem;
          .p-datatable-wrapper {
            table {
              tbody {
                tr {
                  .text-center {
                    text-align: left !important;
                    button {
                      i {
                        width: 2rem !important;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
