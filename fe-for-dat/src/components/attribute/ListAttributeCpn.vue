<template>
  <div v-if="category.category_name.includes('Bàn phím')">
    <div
      class="filter-content attribute border-top-1"
      :attribute="attribute.attribute_name"
      v-if="
        attribute.attribute_name.includes('Keycap') ||
        attribute.attribute_name.includes('Switch')
      "
    >
      <div
        class="flex justify-content-between align-content-center attribute-name"
        @click.prevent.stop="handleDropdown"
      >
        <h5>{{ attribute.attribute_name }}</h5>
        <i class="p-treetable-toggler-icon pi pi-chevron-down" v-if="drop"></i>
        <i class="p-treetable-toggler-icon pi pi-chevron-right" v-else></i>
      </div>
      <div
        class="filter-params flex align-content-center p-2 pt-4 pb-2 flex-wrap"
        v-if="drop"
      >
        <div
          class="field-checkbox pr-2"
          v-for="(param, j) in attribute.params"
          :key="j"
        >
          <my-checkbox
            :inputId="param.param_value"
            name="param"
            :value="param.param_value"
            v-model="filterParams[j]"
          />

          <label :for="param.param_value" class="text-xs">{{
            param.param_value
          }}</label>
        </div>
      </div>
    </div>
  </div>
  <div
    class="filter-content attribute border-top-1"
    :attribute="attribute.attribute_name"
    v-else
  >
    <div
      class="flex justify-content-between align-content-center attribute-name"
      @click.prevent.stop="handleDropdown"
    >
      <h5>{{ attribute.attribute_name }}</h5>
      <i class="p-treetable-toggler-icon pi pi-chevron-down" v-if="drop"></i>
      <i class="p-treetable-toggler-icon pi pi-chevron-right" v-else></i>
    </div>
    <div
      class="filter-params flex align-content-center p-2 pt-4 pb-2 flex-wrap"
      v-if="drop"
    >
      <div
        class="field-checkbox pr-2"
        v-for="(param, j) in attribute.params"
        :key="j"
      >
        <my-checkbox
          :inputId="param.param_value"
          name="param"
          :value="param.param_value"
          v-model="filterParams[j]"
        />

        <label :for="param.param_value" class="text-xs">{{
          param.param_value
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
// import { useStore } from "vuex";

export default defineComponent({
  props: {
    attribute: { type: Object },
    listItem: { type: Object },
    category: { type: Object },
  },
  setup(props) {
    const drop = ref(true);
    // const store = useStore();

    const handleDropdown = () => {
      drop.value = !drop.value;
      console.log(drop.value);
    };
    const filterParams = ref([]);
    // const listItem = computed(() => {
    //   return store.getters["category/getCategory"] || [];
    // });
    const setActive = (param) => {
      if (filterParams.value.indexOf(param) > -1) {
        filterParams.value.pop(param);
      } else {
        filterParams.value.push(param);
      }
      console.log(filterParams.value);
    };

    const removeActive = (param) => {
      return filterParams.value.indexOf(param) > -1;
      // console.log(filterParams.value)
    };

    const filteredItems = computed(() => {
      return props.listItem.filter((product) => {
        return product.product_attribute.forEach((params) => {
          console.log(params);
          if (params.params.includes(filterParams)) {
            return params.params.includes(filterParams);
          }
        });
      });
    });

    return {
      handleDropdown,
      setActive,
      filterParams,
      filteredItems,
      drop,
      removeActive,
    };
  },
});
</script>

<style lang="scss">
.attribute-name {
  cursor: pointer;
}
.attribute {
  padding: 1rem 0.5rem;
}
@media only screen and (max-width: 1920px) {

}
</style>
