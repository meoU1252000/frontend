<template>
  <div class="main-layout">
    <HeaderCpn />
    <router-view />
    <!-- <div class="footer"></div> -->
    <FooterCpn />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderCpn from "@/components/HeaderCpn.vue";
import FooterCpn from "@/components/FooterCpn.vue";
// import { useStore } from "vuex";

export default defineComponent({
  components: { HeaderCpn, FooterCpn },
  setup() {
    return {
      
    };
  },
});
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
}
</style>
