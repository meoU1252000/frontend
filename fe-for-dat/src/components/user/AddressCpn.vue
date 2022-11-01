<template>
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="user-content flex w-9 flex mx-auto">
      <div class="content-header p-2 w-full">
        <!-- <div class="pt-5 w-full text-center">
          <h2>Quản Lý Địa Chỉ</h2>
        </div>
        <div class="mt-6">
          <DataTable :value="listAddress" stripedRows responsiveLayout="scroll">
            <Column field="receiver_name" header="Tên người nhận"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
          </DataTable>
        </div>
        <div class="my-5 px-4">
          <my-button
            class="mt-2 w-1 flex justify-content-center"
            @click="goToAddAddressPage"
            label="Thêm địa chỉ"
          />
        </div> -->
        <div class="card">
          <my-TabView ref="tabview1">
            <my-TabPanel header="Quản Lý Địa Chỉ">
              <!-- <div class="pt-2 w-full text-center">
                <h2>Quản Lý Địa Chỉ</h2>
              </div> -->
              <div>
                <DataTable
                  :value="listAddress"
                  stripedRows
                  showGridlines 
                  responsiveLayout="scroll"
                >
                  <Column
                    field="receiver_address"
                    header="Địa Chỉ"
                    style="min-width:200px"
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
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </my-TabPanel>
          </my-TabView>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default defineComponent({
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
    const goToAddAddressPage = () => {
      route.push(`/danh-muc/`);
    };
    onMounted(async () => {
      await store.dispatch("auth/getListAddress", props.account.token);
    });

    const listAddress = computed(() => {
      return store.getters["auth/getUserAddress"] || [];
    });
    return { listAddress, goToAddAddressPage };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
}
</style>
