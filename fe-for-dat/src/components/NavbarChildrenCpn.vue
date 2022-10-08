<template>
    <div  v-for="(category, i) in listChildrenItem" :key="i">
      <span v-if="category.children !== null">{{ category.category_name }}</span>
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

<style></style>
