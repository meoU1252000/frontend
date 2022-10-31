<template>
  <div class="p-7 mx-auto w-11 flex justify-content-between">
    <div class="user-content flex w-9 flex mx-auto">
      <div class="content-header p-2 w-full">
        <div class="pt-5 w-full text-center">
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
            label="Xác Nhận"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    account: { type: Object },
  },
  setup(props) {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("auth/getListAddress", props.account.token);
    });

    const listAddress = computed(() => {
      return store.getters["auth/getUserAddress"] || [];
    });
    return { listAddress };
  },
});
</script>
<style lang="scss" scoped>
.user-content {
  min-height: 20rem;
  background-color: white;
}
</style>
