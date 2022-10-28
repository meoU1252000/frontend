<template>
  <div class="header">
    <router-link :to="{ name: 'home' }" class="logo" v-if="propertyY < 100">
      <img class="logo-link" src="@/assets/images/logo-sm.png" alt="" />
      <span>ĐẠT LÊ</span>
    </router-link>
    <div class="logo" v-else>
      <router-link :to="{ name: 'home' }">
        <img class="logo-link" src="@/assets/images/logo-sm.png" alt="" />
      </router-link>
      <my-button
        label="Danh Mục Sản Phẩm"
        icon="pi pi-list"
        @click="openModalCategory()"
        class="p-button-outlined p-button-secondary p-button-sm"
      />
      <my-dialog
        :visible="showCategoryModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '30vw' }"
        :modal="true"
        @update:visible="closeModalCategory"
        position="topleft"
        :dismissableMask="true"
        :showHeader="false"
        contentClass="p-dialog-content-hide"
        class="modal"
      >
        <NavbarCpn
          :listRootItem="listModalRootItem"
          :listBrand="listModalBrand"
        />
      </my-dialog>
    </div>
    <div class="search">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <my-inputText
          type="text"
          v-model="search"
          placeholder="Nhập từ khóa cần tìm"
        />
      </span>
    </div>

    <div class="user-info" @mouseover="handleUserInfoHover" v-if="login.userName != null">
      <i class="pi pi-user" style="font-size: 1.6rem"></i>
      <div class="text">
        <span>Hello, </span>
        <span>{{ login.userName.split(' ').slice(-1).join(' ')}}</span>
      </div>
      <UserCpn
        v-if="displayUserInfo"
        @handle-user-info-leave="handleUserInfoLeave"
        :login="login"
      />
    </div>
    <div class="login" @click="openModalLogin" v-else>
      <i class="pi pi-user" style="font-size: 1.6rem"></i>
      <div class="text">
        <span>Đăng Nhập</span>
        <span>Đăng Ký</span>
      </div>
    </div>

    <div class="notification">
      <i
        class="pi pi-bell mr-4 p-text-secondary"
        style="font-size: 1.6rem"
        v-badge="2"
      ></i>
    </div>
    <div class="cart" @mouseover="handleCartHover">
      <i class="pi pi-shopping-cart" style="font-size: 1.8rem"></i>
      <span>Giỏ hàng của bạn có ({{ cartList.length }}) sản phẩm</span>
      <CartModalCpn
        v-if="displayCart"
        @handle-cart-leave="handleCartLeave"
        :cartList="cartList"
      />
    </div>
  </div>
  <LoginCpn
    :display-modal="showLoginModal"
    @close-modal-login="closeModalLogin"
    @open-modal-register="openRegisterModal"
  />
  <RegisterCpn
    :display-modal="showRegisterModal"
    @open-modal-login="openLoginModal"
    @close-modal-register="closeModalRegister"
  />
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import LoginCpn from "@/components/LoginCpn.vue";
import RegisterCpn from "@/components/RegisterCpn.vue";
import UserCpn from "@/components/user/UserCpn.vue";
import NavbarCpn from "./NavbarCpn.vue";
import CartModalCpn from "./CartModalCpn.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { LoginCpn, RegisterCpn, NavbarCpn, CartModalCpn, UserCpn },
  props: {
    propertyY: { type: Number },
    listModalRootItem: { type: Object },
    listModalBrand: { type: Object },
    cartList: { type: Object },
  },
  setup() {
    const search = ref();
    const store = useStore();
    const showLoginModal = ref(false);
    const showRegisterModal = ref(false);
    const showCategoryModal = ref(false);
    const displayUserInfo = ref(false);
    const displayCart = ref(false);
    const openModalLogin = () => {
      showLoginModal.value = true;
    };
    const closeModalLogin = () => {
      showLoginModal.value = false;
    };
    const handleCartHover = () => {
      displayCart.value = true;
    };
    const openRegisterModal = () => {
      showRegisterModal.value = true;
      showLoginModal.value = false;
    };
    const openLoginModal = () => {
      showRegisterModal.value = false;
      showLoginModal.value = true;
    };

    const closeModalRegister = () => {
      showRegisterModal.value = false;
    };

    const openModalCategory = () => {
      showCategoryModal.value = true;
    };

    const closeModalCategory = () => {
      showCategoryModal.value = false;
    };

    const handleCartLeave = () => {
      displayCart.value = false;
    };

    const handleUserInfoHover = () => {
      displayUserInfo.value = true;
    };

    const handleUserInfoLeave = () => {
      displayUserInfo.value = false;
    };
    const login = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });

    return {
      search,
      showLoginModal,
      openModalLogin,
      closeModalLogin,
      openRegisterModal,
      showRegisterModal,
      openLoginModal,
      closeModalRegister,
      openModalCategory,
      closeModalCategory,
      showCategoryModal,
      handleCartHover,
      handleCartLeave,
      displayCart,
      login,
      displayUserInfo,
      handleUserInfoLeave,
      handleUserInfoHover,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  height: var(--height-header);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10rem;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  z-index: 9;

  .logo {
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    img {
      margin-right: 1rem;
    }
    span {
      font-size: 2rem;
      font-family: serif;
    }
  }

  .logo-link {
    height: 2rem;
  }

  .search {
    margin: 0 1.5rem;
  }

  :deep(.p-inputtext) {
    width: 28rem;
    height: 2.5rem;
    background-color: rgb(248, 248, 252);
  }
  .login {
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    cursor: pointer;
    width: 150px;

    .text {
      span {
        display: block;
        margin-left: 1rem;
        font-size: 15px;
      }
    }

    &:hover {
      color: rgb(207, 15, 15, 1) !important;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    cursor: pointer;
    width: 150px;

    .text {
      span {
        display: block;
        margin-left: 1rem;
        font-size: 15px;
      }
    }
  }

  .notification {
    margin-left: 1rem;
    cursor: pointer;
    &:hover {
      color: rgb(207, 15, 15, 1) !important;
    }
    :deep(.p-badge) {
      background-color: rgb(207, 15, 15, 1);
    }
  }

  .cart {
    margin-left: 3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 11rem;
    span {
      display: block;
      margin-left: 1rem;
    }
    &:hover {
      color: rgb(207, 15, 15, 1) !important;
    }
  }
}
@media only screen and (max-width: 1366px) {
  .header {
    padding: 0 7rem;
    a {
      width: 10rem;
      span {
        font-size: 1rem !important;
      }
    }
    .logo {
      button {
        width: 8rem;
        height: 3rem;
      }
    }
    .login {
      .text {
        span {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
