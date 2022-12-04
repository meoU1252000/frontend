<template>
  <div v-if="(category != undefined)">
    <div v-if="category.category_name.includes('Bàn phím')">
      <div v-if="attribute.params.length > 1">
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
            <i
              class="p-treetable-toggler-icon pi pi-chevron-down"
              v-if="drop"
            ></i>
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
                :value="param.param_value"
                v-model="filter"
                @change="setActive(param.param_value)"
              />

              <label :for="param.param_value" class="text-xs">{{
                param.param_value
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="filter-content attribute border-top-1"
        :attribute="attribute.attribute_name"
        v-if="attribute.params.length > 1"
      >
        <div
          class="flex justify-content-between align-content-center attribute-name"
          @click.prevent.stop="handleDropdown"
        >
          <h5>{{ attribute.attribute_name }}</h5>
          <i
            class="p-treetable-toggler-icon pi pi-chevron-down"
            v-if="drop"
          ></i>
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
              :value="param.param_value"
              v-model="filter"
              @change="setActive(param.param_value)"
            />

            <label :for="param.param_value" class="text-xs">{{
              param.param_value
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="(brand != undefined)">
    <div
      class="filter-content attribute border-top-1"
      :attribute="attribute.attribute_name"
      v-if="attribute.params.length > 1"
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
            :value="param.param_value"
            v-model="filter"
            @change="setActive(param.param_value)"
          />

          <label :for="param.param_value" class="text-xs">{{
            param.param_value
          }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
// import { useStore } from "vuex";

export default defineComponent({
  props: {
    attribute: { type: Object },
    listItem: { type: Object },
    category: { type: Object },
    brand: { type: Object },
    propertyFilter: { type: Array },
  },
  setup(props, { emit }) {
    const drop = ref(false);
    // const store = useStore();
    const filter = ref([]);
    const handleDropdown = () => {
      drop.value = !drop.value;
    };

    const setActive = (param) => {
      if (filter.value.includes(param)) {
        emit("filter-item", param);
      } else {
        console.log(param);
        emit("remove-item", param);
      }
    };

    return {
      handleDropdown,
      setActive,
      drop,
      filter,
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
