<template>
  <div class="main-layout">
    <HeaderCpn />
    <router-view />
    <div class="footer"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderCpn from "@/components/HeaderCpn.vue";

export default defineComponent({
  components: { HeaderCpn },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}
</style>
