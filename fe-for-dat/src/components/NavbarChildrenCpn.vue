<template>
    <div  v-for="(category, i) in listChildrenItem" :key="i">
      <router-link :to="{ name: 'showCategoryView', params: { category_name: category.category_name} }" v-if="category.children !== null && category.products.length >0" class="router-link-category">{{ category.category_name }}</router-link>
      <div v-else>
          <NavbarChildrenCpn :listChildrenItem="category.children" />
      </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import NavbarChildrenCpn from "@/components/NavbarChildrenCpn.vue";

export default defineComponent({
  components: { NavbarChildrenCpn },
  props: {
    listChildrenItem: { type: Object },
    listBrand:  {type: Object}
  },
  setup() {
    const display = ref("none");
    const item = ref(0);
  
    return {
      display,
      item,
    };
  },
});
</script>

<style lang="scss">
.router-link-category{
  text-decoration: none;
  color:black;
  &:hover{
    background-color: rgb(243, 245, 252);
    color: rgb(207, 15, 15);
  }
}
</style>
