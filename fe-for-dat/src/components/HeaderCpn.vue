<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img class="logo-link" src="@/assets/images/logo-sm.png" alt="" />
      <span>ĐẠT LÊ</span>
    </router-link>
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
    <div class="login" @click="openModalLogin">
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
    <div class="cart">
      <i class="pi pi-shopping-cart" style="font-size: 1.8rem"></i>
      <span>Giỏ hàng của bạn (0) sản phẩm</span>
    </div>
  </div>
  <LoginView
    :display-modal="showLoginModal"
    @close-modal-login="closeModalLogin"
    @open-modal-register="openRegisterModal"
  />
  <RegisterView
    :display-modal="showRegisterModal"
    @open-modal-login="openLoginModal"
    @close-modal-register="closeModalRegister"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import LoginView from "@/components/LoginCpn.vue";
import RegisterView from "@/components/RegisterCpn.vue";

export default defineComponent({
  components: { LoginView, RegisterView },
  setup() {
    const search = ref();
    const showLoginModal = ref(false);
    const showRegisterModal = ref(false);

    const openModalLogin = () => {
      showLoginModal.value = true;
    };
    const closeModalLogin = () => {
      showLoginModal.value = false;
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
    return {
      search,
      showLoginModal,
      openModalLogin,
      closeModalLogin,
      openRegisterModal,
      showRegisterModal,
      openLoginModal,
      closeModalRegister,
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
    span {
      padding-left: 0.5rem;
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
      color: rgb(207, 15, 15,1) !important;
    }
  }

  .notification {
    margin-left: 1rem;
    cursor: pointer;
    &:hover {
      color: rgb(207, 15, 15,1) !important;
    }
    :deep(.p-badge){
      background-color: rgb(207, 15, 15,1);
    }
  }

  .cart {
    margin-left: 3rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      display: block;
      margin-left: 1rem;
    }
    &:hover {
      color: rgb(207, 15, 15,1) !important;
    }
  }
}
</style>
