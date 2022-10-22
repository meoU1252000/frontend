<template>
  <div class="slider">
    <swiper
      :slidesPerView="1"
      :effect="'fade'"
      :spaceBetween="30"
      :centeredSlides="true"
      :pagination="{
        clickable: true,
      }"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="image in listSlider" :key="image.key">
        <img :src="image.link" />
      </swiper-slide>
    </swiper>
    <NavbarCpn :listRootItem="listRootItem" :listBrand="listBrand"/>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper";
import NavbarCpn from "./NavbarCpn.vue";

export default defineComponent({
  props: {
    listRootItem: {type: Object},
    listBrand:  {type: Object}
  },
  components: {
    Swiper,
    SwiperSlide,
    NavbarCpn,
  },
  setup() {
    const listSlider = ref([
      {
        link: "https://lh3.googleusercontent.com/Z9EKSE-M6wIGl2iCCx9iPjmD3BI8zYRY_braf8j3SVn22HwVzNSWyCPGtKgmjW3S64iZf9fkkBfI92BKvGKTcwqe0Vpnl97C=rw-w1920",
        key: 1,
      },
      {
        link: "https://lh3.googleusercontent.com/4l3CMJLcn5fke5-of95C06OBrNRYGPWih3wqeDCYfyXJN3EndmMkO1yRbI5ohylxaJhQ35j5fSTPNfZGQQGd1SwRbYJYp4Q=rw-w1920",
        key: 2,
      },
      {
        link: "https://lh3.googleusercontent.com/T4faNR7WOsWykeMJ9HLvjQqJ6NOCmedAY895DIhr9AphLCEuYzNNhoj8SfUgHtDSIUMD5K39aQFS_AJIEI5OQw-ldZiNu-k=rw-w1920",
        key: 3,
      },
      {
        link: "https://lh3.googleusercontent.com/llRGlCgB6jJs9wq4fU4Rroz_rxn2xgfRjyXhLeeWnd7Fbpow0oo2Y2fE6YKPWjM9uDtXNtn5pDXOhXwzB79AaLBnCKfxeTOF=rw-w1920",
        key: 4,
      },
    ]);
    return {
      listSlider,
      modules: [Autoplay, EffectFade, Pagination],
    };
  },
});
</script>

<style lang="scss" scoped>
.slider {
  margin-top: var(--height-header);
  // height: calc(100vh - var(--height-header));
  position: relative;
  z-index: 1;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
