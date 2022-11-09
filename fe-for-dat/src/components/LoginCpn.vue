<template>
  <my-dialog
    header="Đăng Nhập"
    :visible="displayModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '30vw' }"
    :modal="true"
    @update:visible="closeModal"
  >
    <!-- <hr class="hr"> -->
    <form @submit.prevent="handleLogin(!v$.$invalid)">
      <h5 :class="{ 'p-error': v$.email.$invalid && submitted }">
        Tên Đăng Nhập
      </h5>
      <div class="col-12">
        <my-inputText
          id="email"
          type="email"
          v-model="v$.email.$model"
          aria-describedby="username1-help"
          class="w-full"
          :class="{ 'p-invalid': v$.email.$invalid && submitted }"
        />
      </div>
      <h5 :class="{ 'p-error': v$.password.$invalid && submitted }">
        Mật Khẩu
      </h5>
      <div class="col-12">
        <my-password
          :feedback="false"
          id="password"
          v-model="v$.password.$model"
          :class="{ 'p-invalid': v$.password.$invalid && submitted }"
          toggleMask
          class="w-full"
          inputClass="w-full"
        />
      </div>
      <div class="col-12">
        <div class="login-form__forget">
          <span
            class="forget_link"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#exampleModalM"
            @click="closeModal"
            @close-modal-login="closeModalLogin"
          >
            Quên Mật Khẩu ?
          </span>
          <span class="login-form__forget-separate"></span>
          <span class="forward_link" @click="openRegister"> Đăng Ký</span>
        </div>
      </div>
      <div class="login-choice"><span>Hoặc Đăng Nhập Với</span></div>
      <div class="signup-buttons">
        <div id="fb-root"></div>
        <a href="#" class="google-signup"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <title>Google</title>
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#4285F4"
                d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
              ></path>
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
              ></path>
              <path
                fill="#FBBC05"
                d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
              ></path>
              <path
                fill="#EA4335"
                d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
              ></path>
            </g>
          </svg>
          Google </a
        ><a href="#" class="facebook-signup"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#3578E5"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            ></path>
          </svg>
          Facebook
        </a>
      </div>
      <div class="dialog_footer_form">
        <my-button
          label="Trở Lại"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeModal"
        />
        <my-button
          label="Đăng Nhập"
          icon="pi pi-check"
          type="submit"
          autofocus
        />
      </div>
    </form>
  </my-dialog>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useStore } from "vuex";

// import RegisterView from "@/components/RegisterCpn.vue";
export default defineComponent({
  components: {},
  props: {
    displayModal: { type: Boolean },
  },
  setup(_props, { emit }) {
    const store = useStore();
    const state = reactive({
      email: "",
      password: "",
    });

    const closeModal = () => {
      emit("close-modal-login");
    };

    const openRegister = () => {
      emit("open-modal-register");
    };

    const rules = {
      email: {
        required: helpers.withMessage("Email không đúng", required),
      },
      password: {
        required: helpers.withMessage("Vui lòng nhập password", required),
      },
    };

    const submitted = ref(false);

    const v$ = useVuelidate(rules, state);

    const handleLogin = async (isFormValid) => {
      submitted.value = true;
      const user = {
        email: state.email,
        password: state.password,
      };
      if (isFormValid) {
        const check = await store.dispatch("auth/login", user);
        console.log(check);
        if (check) {
          window.Swal.fire({
            icon: "success",
            title: "Thành Công",
            text: "Đăng nhập thành công",
          });
          closeModal();
          await store.dispatch("auth/getListAddress", check.access_token);
          await store.dispatch("auth/getListOrder", check.access_token);
        } else {
          window.Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Tài khoản không tồn tại. Vui lòng thử lại",
          });
          closeModal();
        }
      }
    };

    return {
      closeModal,
      openRegister,
      handleLogin,
      submitted,
      state,
      v$,
    };
  },
});
</script>

<style scoped>
h5 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 8px;
}
.hr {
  margin: 0 -4%;
  opacity: 0.3;
}

.login-form__forget {
  text-align: right;
  margin-right: 6%;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.login-form__forget .forget_link {
  cursor: pointer;
  color: #063547;
}
.login-form__forget-separate {
  display: inline-block;
  height: 18px;
  border-left: 1px solid black;
  margin: 0 12px;
  transform: translateY(4px);
}
.forward_link {
  cursor: pointer;
  color: black;
  opacity: 0.8;
}

.confirm_signup {
  font-size: 14px;
  line-height: 1.6rem;
  text-align: center;
}
.confirm_signup span {
  color: #063547;
  font-weight: bold;
}
.confirm_signup a {
  text-decoration: none;
  color: #063547;
  font-weight: bold;
}

.login-choice span {
  color: #5b6987;
  display: -ms-grid;
  display: grid;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -ms-grid-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
  grid-gap: 19px;
}
.login-choice span:after,
.login-choice span:before {
  content: "";
  border-top: 1px solid #e5e8ed;
}

.signup-buttons {
  margin-top: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
}
.signup-buttons a {
  vertical-align: middle;
  text-decoration: none;
}
.facebook-signup,
.google-signup {
  color: #031b4e;
  background: white;
  border: 1px solid rgba(0, 105, 255, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  display: inline-block;
  margin-top: 0;
  width: 47.5%;
  padding: 15px;
  text-align: center;
  position: inherit;
}
.dialog_footer_form {
  border-top: 0 none;
  background: #ffffff;
  color: #495057;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  text-align: right;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  padding-right: 0;
  padding-bottom: 0;
}

.dialog_footer_form button {
  margin: 0 0.5rem 0 0;
  width: auto;
}
</style>
