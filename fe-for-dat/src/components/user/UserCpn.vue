<template>
  <div class="user-modal" @mouseleave="handleUserInfoLeave">
    <h3>
      Hello
      <p>Customer1</p>
    </h3>
    <ul class="user_wrap--list">
      <li>
        <i class="pi pi-user"></i>
        <a href="index.php?page_layout=accountPage">Tài Khoản</a>
      </li>
      <li>
        <i class="pi pi-bookmark"></i>
        <a href="index.php?page_layout=customeraddress">Địa Chỉ</a>
      </li>
      <li>
        <i class="pi pi-truck"></i>
        <a href="index.php?page_layout=orderCustomer">Đơn Hàng</a>
      </li>
      <li>
        <i class="pi pi-sign-out"></i>
        <a href="./logout.php" class="logout">Đăng Xuất</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    showUserInfoModal: { type: Boolean },
  },
  setup(props, { emit }) {
    const handleUserInfoLeave = () => {
      emit("handle-user-info-leave");
    };
    return { handleUserInfoLeave };
  },
});
</script>
<style lang="scss" scoped>
.user-modal {
  top: 6rem;
  transform: translateX(-5rem);
  width: 200px;
  background-color: white;
  position: absolute;
  z-index: 999999;
  box-shadow: 10px 10px 20px 20px rgb(0 0 0 / 10%);
  border-radius: 12px;
  cursor: pointer;
  &:after {
    cursor: pointer;
    content: "";
    position: absolute;
    right: 30px;
    width: 20px;
    height: 20px;
    top: -5px;
    background: #fff;
    transform: rotate(45deg);
  }
  h3 {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    font-weight: 500;
    font-size: 18px;
    p {
      margin-top: 10px;
      font-size: 16px;
      opacity: 0.8;
    }
  }
  ul {
    list-style: none;
    padding-left: 0px;
    line-height: 32px;
    margin-top: 1rem;
    li {
      margin-bottom: 0;
      line-height: 48px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      display: flex;
      cursor: pointer;
      &:hover {
        background-color: #fafafa;
        color: rgb(207, 15, 15, 1) !important;
      }
      a {
        color: black;
        text-decoration: none;
        padding-left: 12px;
        width: 82%;
        height: 100%;
        &:hover {
          color: rgb(207, 15, 15, 1) !important;
        }
      }
      i {
        font-size: 24px;
        margin-left: 14px;
        padding-top: 14px;
        width: 18%;
      }
    }
  }
}
</style>
