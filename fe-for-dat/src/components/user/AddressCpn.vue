<template>
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
                  <Column
                    field="receiver_address"
                    header="Địa Chỉ"
                    style="min-width: 200px"
                  ></Column>
                  <Column
                    field="receiver_name"
                    header="Tên Người Nhận"
                  ></Column>
                  <Column
                    field="receiver_phone"
                    header="Số Điện Thoại"
                  ></Column>
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
          </my-TabView>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default defineComponent({
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    DataTable,
    Column,
  },
  props: {
    account: { type: Object },
  },
  setup(props) {
    const store = useStore();
    const route = useRouter();
    const state = reactive({
      user_name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    });

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
    const goToAddAddressPage = () => {
      route.push(`/danh-muc/`);
    };

    onMounted(async () => {
      await store.dispatch("auth/getListCity");
    });

    const listCities = computed(() => {
      return store.getters["auth/getCities"] || [];
    });

    const listAddress = computed(() => {
      return store.getters["auth/getUserAddress"] || [];
    });

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

        await store.dispatch("auth/createAddress", customer_address);
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Thêm địa chỉ thành công",
        });
      }
    };

    return {
      listAddress,
      goToAddAddressPage,
      listDistricts,
      listWards,
      listCities,
      submitted,
      v$,
      rules,
      state,
      handleSubmit,
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
</style>
