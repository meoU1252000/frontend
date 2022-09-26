<template>
  <div class="main-layout">
    <div class="header">
      <HeaderCpn />
    </div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderCpn from "@/components/HeaderCpn.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: { HeaderCpn },
});
</script>

<style scoped></style>
