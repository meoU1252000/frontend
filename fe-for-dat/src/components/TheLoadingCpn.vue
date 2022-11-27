<template>
  <div
    class="fixed surface-100 opacity-80 top-0 bottom-0 right-0 left-0 flex align-items-center loader"
    v-if="isLoading"
  >
    <ProgressSpinner strokeWidth="1" animationDuration=".5s" />
  </div>
   
</template>

<script>
import { defineComponent } from "vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  components: { ProgressSpinner },
  props: {
    isLoading: {
      required: true,
      type: Boolean,
      default: false,
    },

  },
  setup(){
    return {
    }
  }
});
</script>

<style scoped>
.loader {
  z-index: 99;
  position: fixed !important;
}
</style>
