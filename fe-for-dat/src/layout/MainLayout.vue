<template>
  <div class="main-layout">
    <TheLoadingCpn :isLoading="showLoading" />

    <HeaderCpn
      :propertyY="propertyY"
      :listModalBrand="listModalBrand"
      :listModalRootItem="listModalRootItem"
      :cartList="cartList"
      :listModalItem="listModalItem"
    />
    <router-view />
    <!-- <div class="footer"></div> -->
    <FooterCpn />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import HeaderCpn from "@/components/HeaderCpn.vue";
import FooterCpn from "@/components/FooterCpn.vue";
import { setStateCart } from "@/function/handleLocalStorage";
import { getCartList } from "@/function/getCartList";
import { useStore } from "vuex";
import { setStateLogin, setupTimers } from "@/function/handleLogin";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";

export default defineComponent({
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  components: { HeaderCpn, FooterCpn, TheLoadingCpn },
  setup() {
    const store = useStore();
    const propertyY = ref(0);
    const showLoading = ref(false);
    const handleScroll = () => {
      propertyY.value = Math.round(window.pageYOffset);
    };

    onMounted(async () => {
      showLoading.value = true;
      await Promise.all([
        store.dispatch("category/getListCategories"),
        store.dispatch("product/getListProducts"),
        store.dispatch("brand/getListBrands"),
        store.dispatch("eventCode/getListEvents"),
      ]);
      showLoading.value = false;
      setStateCart(store);
      setStateLogin(store);
      setupTimers();
      window.scrollTo(0, 0);
    });

    const cartList = computed(() => {
      const listProduct = store.getters["product/getListProduct"] || [];
      const cartItem = store.getters["product/getCart"] || [];

      return getCartList(listProduct, cartItem);
    });

    const listModalItem = computed(() => {
      return store.getters["category/getListCategory"] || [];
    });
    
    const listModalRootItem = computed(() => {
      return listModalItem.value.filter(
        (item) => item.category_parent === 0 && item.category_status === 1
      );
    });

    const listModalBrand = computed(() => {
      return store.getters["brand/getListBrand"] || [];
    });

    return {
      handleScroll,
      propertyY,
      listModalItem,
      listModalRootItem,
      listModalBrand,
      cartList,
      showLoading,
    };
  },
});
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}
</style>
