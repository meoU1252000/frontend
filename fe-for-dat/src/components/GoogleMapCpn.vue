<template>
  <GMapMap
    :center="center"
    :zoom="16"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >

    <GMapCluster>
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        icon= "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        @click="center = m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const center = { lat: 10.84329, lng: 106.63953 };
    const markers = [
      {
        position: {
          lat: 10.84329,
          lng: 106.63953,
        },
      }, // Along list of clusters
    ];
    return {
      center,
      markers,
    };
  },
});
</script>
<style>
@media only screen and (max-width: 1366px) {
  .vue-map{
    width: 22rem !important;
    height: 15rem !important;
  }  
}
</style>