<template>
  <div v-for="(category, i) in listChildrenItem" :key="i">
    <a
      @click="goToCategoryPage(category.category_name)"
      v-if="(category.children !== null || category.children.length > 0) && (category.products !== null  || category.products.length > 0)"
      class="router-link-category"
      >{{ category.category_name }}</a
    >
    <div v-else>
      <NavbarChildrenCpn :listChildrenItem="category.children" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavbarChildrenCpn from "@/components/NavbarChildrenCpn.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { NavbarChildrenCpn },
  props: {
    listChildrenItem: { type: Object },
    listBrand: { type: Object },
    showCategoryModal: { type: Boolean },
  },
  setup(props, { emit }) {
    const route = useRouter();
    const store = useStore();

    const goToCategoryPage = async (name) => {
      route.push(`/danh-muc/${name}`);
      emit("close-modal-category");
      await store.dispatch("category/getCategory", name);
      window.scrollTo(0, 0);
    };
    return { goToCategoryPage };
  },
});
</script>

<style lang="scss">
.router-link-category {
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: rgb(243, 245, 252);
    color: rgb(207, 15, 15);
  }
}
</style>
