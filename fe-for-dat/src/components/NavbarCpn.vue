<template>
  <div class="navbar">
    <div class="category" @mouseleave="handleLeave">
      <!-- {{listItem}} -->
      <div
        class="item"
        v-for="(category, i) in listRootItem"
        :key="i"
        @mouseover="handleHover(category.children)"
      >
        <img class="item-img" src="@/assets/images/icons-nav/unnamed.webp" />
        <span>{{ category.category_name }}</span>
      </div>
      <div class="modal" :style="{ display: display }">
        <div
          class="flex flex-wrap card-container blue-container column-gap-4 row-gap-6 category-modal"
        >
          <div class="category_item">
            <h4>Thương Hiệu</h4>
            <div v-for="(brand, k) in listBrand" :key="k" class="brand">
              <router-link
                v-if="brand.products.length > 0 && brand.brand_status === 1"
                to="/"
                class="brand_link"
                >{{ brand.brand_name }}</router-link
              >
            </div>
          </div>
          <div v-for="(item, j) in items" :key="j">
            <div v-if="item.children !== null" class="category_item">
              <!-- {{item.products.length > 0}} -->
              <router-link
                v-if="item.products.length > 0"
                to="/"
                class="category_link"
                >{{ item.category_name }}</router-link
              >
              <h4 v-else>{{ item.category_name }}</h4>
              <div>
                <NavbarChildrenCpn
                  :listChildrenItem="item.children"
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
import { defineComponent, ref } from "vue";
import NavbarChildrenCpn from "@/components/NavbarChildrenCpn.vue";

export default defineComponent({
  components: { NavbarChildrenCpn },
  props: {
    listRootItem: { type: Object },
    listBrand: { type: Object },
  },
  setup() {
    const display = ref("none");
    const items = ref(0);

    const handleHover = (key) => {
      display.value = "block";
      items.value = key;
    };
    const handleLeave = () => {
      items.value = 0;
      display.value = "none";
    };
    return {
      display,
      items,
      handleHover,
      handleLeave,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  width: 200px;
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
      width: calc(100vw - 33rem);
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

  .brand{
    .brand_link{
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
</style>
