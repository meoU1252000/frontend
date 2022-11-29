<template>
    <TheLoadingCpn :isLoading="showLoading" />

  <div class="comment-content w-9">
    <div class="content-header p-2 w-full">
      <div class="w-full px-3 py-2">
        <h2>Bình Luận</h2>
      </div>
      <div class="flex w-full justify-content-center">
        <div class="flex col-12 align-items-center">
          <div class="col-1">
            <img src="@/img/user11.png" alt="" class="w-11 h-11" />
          </div>
          <div class="col-13 w-full">
            <my-Textarea
              v-model="content"
              :autoResize="true"
              rows="2"
              cols="30"
              class="w-full"
              placeholder="Tối đa 255 ký tự ...."
            />
          </div>
        </div>
      </div>
      <div class="flex w-full justify-content-end p-2">
        <my-button
          label="Đăng Bình Luận"
          class="button-primary"
          @click="handleComment(content)"
        ></my-button>
      </div>
      <div
        class="flex w-full justify-content-center"
        v-for="(comment, i) in product.product_comment"
        :key="i"
      >
        <div class="flex col-12">
          <div class="col-1">
            <img src="@/img/user11.png" alt="" class="w-11 h-11" />
          </div>
          <div class="col-13 w-full pt-1">
            <h4>{{ comment.customer.customer_name }}</h4>
            <span>{{ comment.comment_content }}</span>
            <div class="block pt-1">
              <div class="flex align-items-center comment-bottom">
                <a @click="comment.is_active = !comment.is_active">Xem Bình Luận</a>
                <a @click="showReply" class="ml-2">Trả Lời</a>
                <span class="ml-2 text-sm">{{
                  format_date(comment.created_at)
                }}</span>
              </div>
            </div>
            <div v-if="comment.is_active">
              <div v-if="comment.children.length > 0">
                <div v-for="(reply, j) in comment.children" :key="j">
                  <div class="w-full mt-2 flex" v-if="reply.customer != null">
                    <div class="col-1">
                      <img src="@/img/user11.png" alt="" class="w-11 h-11" />
                    </div>
                    <div class="col-13 pt-1 w-11">
        
                      <h4>{{ reply.customer.customer_name }}</h4>
                      <span>{{ reply.comment_content }}</span>
                      <div class="flex align-items-center comment-bottom pt-2">
                        <a @click="showReply">Reply</a>
                        <span class="ml-2 text-sm">{{
                          format_date(reply.created_at)
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-full mt-2 flex" v-else>
                    <div class="col-1">
                      <img src="@/img/logo-sm.png" alt="" class="w-11 h-11" />
                    </div>
                    <div class="col-13 pt-1 w-11">
        
                      <h4>{{ reply.staff.name }}</h4>
                      <span>{{ reply.comment_content }}</span>
                      <div class="flex align-items-center comment-bottom pt-2">
                        <a @click="showReply">Reply</a>
                        <span class="ml-2 text-sm">{{
                          format_date(reply.created_at)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <my-dialog
              header="Trả lời bình luận"
              v-model:visible="displayReply"
              :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
              :style="{ width: '50vw' }"
              :modal="true"
            >
              <div class="w-full mt-2 flex">
                <div class="col-1">
                  <img src="@/img/user11.png" alt="" class="w-11 h-11" />
                </div>
                <div class="col-13 pt-1 w-11">
                  <!-- <h4>Lê Thành Đạt</h4> -->
                  <my-Textarea
                    v-model="replyContent"
                    :autoResize="true"
                    rows="2"
                    cols="30"
                    class="w-full"
                    placeholder="Tối đa 255 ký tự ...."
                  />
                </div>
              </div>
              <template #footer>
                <my-button
                  label="Đóng"
                  icon="pi pi-times"
                  @click="closeReply"
                  class="p-button-text"
                />
                <my-button
                  label="Đăng Bình Luận"
                  class="button-primary p-button-sm"
                  @click="handleCommentReply(replyContent, comment)"
                ></my-button>
              </template>
            </my-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { format_date } from "@/function/common";
import TheLoadingCpn from "@/components/TheLoadingCpn.vue";

export default defineComponent({
  components: { TheLoadingCpn },

  props: {
    product: { type: Object },
  },

  setup(props) {
    const store = useStore();
    const displayReply = ref(false);
    const account = computed(() => {
      return store.getters["auth/getUserInfo"] || [];
    });
    const showLoading = ref(false);
   
    const showReply = () => {
      displayReply.value = true;
    };
    const closeReply = () => {
      displayReply.value = false;
    };
    const handleComment = async (content) => {
      const data = {
        product_id: props.product.id,
        comment_parent: 0,
        token: account.value.token,
        comment_content: content,
      };
      showLoading.value = true;
      const check = await store.dispatch("auth/comment", data);
      if (check) {
        await store.dispatch("product/getListProducts");
        showLoading.value = false;
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Bình luận thành công",
        });
      }
      showLoading.value = false;
    };
    const handleCommentReply = async (content, parent) => {
      const data = {
        product_id: props.product.id,
        comment_parent: parent.id,
        token: account.value.token,
        comment_content: content,
      };
      showLoading.value = true;
      const check = await store.dispatch("auth/comment", data);
      if (check) {
        await store.dispatch("product/getListProducts");
        closeReply();
        showLoading.value = false;
        window.Swal.fire({
          icon: "success",
          title: "Thành Công",
          text: "Bình luận thành công",
        });
      }
      showLoading.value = false;

    };
    return {
      handleComment,
      handleCommentReply,
      format_date,
      showReply,
      closeReply,
      displayReply,
      showLoading
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-content {
  min-height: 20rem;
  background-color: white;
  .button-primary {
    background-color: rgb(207, 15, 15, 1) !important;
    border-color: rgb(207, 15, 15, 1) !important;

    &:enabled:hover {
      background-color: rgb(145, 10, 10) !important;
      border-color: rgb(207, 15, 15, 1) !important;
    }
    &:focus {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #fb9db4, 0 1px 2px 0 black;
    }
  }

  .comment-bottom {
    a {
      text-decoration: none;
      color: rgb(207, 15, 15, 1) !important;
      cursor: pointer;
    }
    .text-sm {
      color: #90949c;
    }
  }
}
</style>
