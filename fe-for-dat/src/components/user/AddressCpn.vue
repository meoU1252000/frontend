<template>
  <TheLoadingCpn :isLoading="showLoading" />
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="user-content flex w-9 flex mx-auto">
      <div class="content-header p-2 w-full">
        <div class="card">
          <my-TabView ref="tabview1">
            <my-TabPanel header="Quản Lý Địa Chỉ">
              <div class="pt-2 w-full text-center">
                <h2>Quản Lý Địa Chỉ</h2>
              </div>
              <div class="mt-5">
                <DataTable
                  :value="listAddress"
                  stripedRows
                  showGridlines
                  responsiveLayout="scroll"
                >
                  <Column field="receiver_address" header="Địa Chỉ"></Column>
                  <Column
                    field="receiver_name"
                    header="Tên Người Nhận"
                  ></Column>
                  <Column
                    field="receiver_phone"
                    header="Số Điện Thoại"
                  ></Column>
                  <Column
                    :exportable="false"
                    header="Tác Vụ"
                    class="text-center"
                  >
                    <template #body="slotProps">
                      <my-button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-warning"
                        @click="handleDeleteAddress(slotProps.data)"
                      />
                    </template>
                  </Column>
                </DataTable>
              </div>
            </my-TabPanel>
            <my-TabPanel header="Thêm Địa Chỉ">
              <div class="pt-2 w-full text-center">
                <h2>Thêm Địa Chỉ Giao Hàng Mới</h2>
              </div>
              <form @submit.prevent="handleSubmit(!v$.$invalid)">
                <div class="mt-5">
                  <div class="grid p-fluid px-4">
                    <div class="col-12 md:col-6">
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

                    <div class="col-12 md:col-6">
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
                <div class="mt-5">
                  <div class="grid p-fluid px-4">
                    <div class="col-12 md:col-6">
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
                    <div class="col-12 md:col-6">
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
                </div>
                <div class="mt-5">
                  <div class="grid p-fluid px-4">
                    <div class="col-12 md:col-6">
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
                    <div class="col-12 md:col-6">
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
                <div class="my-5 px-4">
                  <my-button
                    class="mt-2 flex justify-content-center"
                    label="Xác Nhận"
                    type="submit"
                  />
                </div>
              </form>
            </my-TabPanel>
            <my-TabPanel header="Sửa Địa Chỉ">
              <div class="pt-2 w-full text-center">
                <h2>Sửa Địa Chỉ Giao Hàng</h2>
              </div>
              <form @submit.prevent="handleUpdate(!v$.$invalid)">
                <div class="mt-5">
                  <div class="grid p-fluid px-4">
                    <div class="col-12">
                      <my-dropdown
                        v-model="selectedAddress"
                        :options="listAddress"
                        optionLabel="receiver_address"
                        optionValue="id"
                        placeholder="Chọn địa chỉ cần sửa"
                        @change="dataSelectedAddress"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="selectedAddress != null">
                  <div class="mt-5">
                    <div class="grid p-fluid px-4">
                      <div class="col-12 md:col-6">
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

                      <div class="col-12 md:col-6">
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
                  <div class="mt-5">
                    <div class="grid p-fluid px-4">
                      <div class="col-12 md:col-6">
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
                      <div class="col-12 md:col-6">
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
                  </div>
                  <div class="mt-5">
                    <div class="grid p-fluid px-4">
                      <div class="col-12 md:col-6">
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
                      <div class="col-12 md:col-6">
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
                  <div class="my-5 px-4">
                    <my-button
                      class="mt-2 flex justify-content-center"
                      label="Xác Nhận"
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </my-TabPanel>
          </my-TabView>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";

export default defineComponent({
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    DataTable,
    Column,
    TheLoadingCpn,
  },
  props: {
    account: { type: Object },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      user_name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    });
    const showLoading = ref(false);

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
          ward_id: wards[0].code,
        };
        showLoading.value = true;
        await store.dispatch("auth/createAddress", customer_address);
        showLoading.value = false;
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Thêm địa chỉ thành công",
        });
        store.dispatch("auth/getListAddress", props.account.token);
      }
    };

    const handleUpdate = async (isFormValid) => {
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
          address_id: selectedAddress.value,
          receiver_name: state.user_name,
          receiver_phone: state.phone,
          receiver_address: address,
          token: props.account.token,
          ward_id: wards[0].code,
        };
        showLoading.value = true;
        const check = await store.dispatch(
          "auth/updateAddress",
          customer_address
        );
        showLoading.value = false;

        if (check) {
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Cập nhật địa chỉ thành công",
          });
          store.dispatch("auth/getListAddress", props.account.token);
          selectedAddress.value = null;
        }
      }
    };

    const handleDeleteAddress = async (address) => {
      window.Swal.fire({
        title: "Chắc chắn xóa?",
        text: "Địa chỉ này sẽ được xóa khỏi tài khoản của bạn.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.Swal.fire(
            "Xóa thành công!",
            "Đã xóa địa chỉ giao hàng.",
            "success"
          );
          const customer_address = {
            token: props.account.token,
            address_id: address.id,
          };
          showLoading.value = true;
          await store.dispatch("auth/deleteAddress", customer_address);
          showLoading.value = false;
          store.dispatch("auth/getListAddress", props.account.token);
        }
      });
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
      handleDeleteAddress,
      handleUpdate,
      showLoading,
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
