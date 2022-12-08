<template>
  <div class="navbar navbar_modal">
    <div class="category" @mouseleave="handleLeave">
      <!-- {{listItem}} -->
      <div
        class="item"
        v-for="(category, i) in listRootItem"
        :key="i"
        @mouseover="handleHover(category.children)"
      >
        <span class="text-sm p-2">{{ category.category_name }}</span>
      </div>
      <div class="modal" :style="{ display: display }">
        <div
          class="flex flex-wrap card-container column-gap-4 row-gap-6 category-modal"
        >
          <div v-for="(item, j) in items" :key="j">
            <div v-if="item.children !== null" class="category_item">
              <!-- {{item.products.length > 0}} -->
              <router-link
                v-if="(item.products.length > 0 || item.products !== null)"
                to="/"
                class="category_link"
                >{{ item.category_name }}</router-link
              >
              <h4 v-else>{{ item.category_name }}</h4>
              <div>
                <NavbarChildrenCpn
                  :listChildrenItem="item.children"
                  :showCategoryModal="showCategoryModal"
                  @close-modal-category="closeModal"
                />
              </div>
            </div>
            <div v-else class="category_item">
              <span>{{ item.category_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import NavbarChildrenCpn from "@/components/NavbarChildrenCpn.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { NavbarChildrenCpn },
  props: {
    listRootItem: { type: Object },
    listBrand: { type: Object },
    showCategoryModal: { type: Boolean },
  },
  setup(props, { emit }) {
    const display = ref("none");
    const items = ref(0);
    const store = useStore();
    const handleHover = (key) => {
      display.value = "block";
      items.value = key;
    };
    const handleLeave = () => {
      items.value = 0;
      display.value = "none";
    };

    const closeModal = () => {
      emit("close-modal-category");
    };

    const listItem = computed(() => {
      return store.getters["category/getListCategory"] || [];
    });

    return {
      display,
      items,
      handleHover,
      handleLeave,
      listItem,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  width: 180px;
  height: 450px;
  background-color: #fff;
  top: 0;
  z-index: 2;
  margin: 3rem 0 0 10rem;
  border-radius: 10px;

  .category {
    position: relative;
    .modal {
      position: absolute;
      width: calc(100vw - 72rem);
      height: 28rem;
      background-color: #fff;
      left: 96%;
      top: 0;
    }
    .category-modal {
      padding-top: 1rem;
    }
    .category_item {
      margin-right: 2rem;
      display: block;
    }
    .category_link {
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
  }
  .brand {
    .brand_link {
      text-decoration: none;
      color: black;
    }
  }

  .item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: rgb(243, 245, 252);
      color: rgb(207, 15, 15, 1);
      border-radius: 10px;
    }

    .item-img {
      width: 1.6rem;
    }

    span {
      margin-left: 0.5rem;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
@media only screen and (max-width: 1920px) {
  .navbar {
    height: 20rem;

    .modal {
      width: calc(100vw - 45rem) !important;
      height: 20rem !important;
    }
  }
  .navbar_modal {
    left: 0 !important;
  }
}
</style>
