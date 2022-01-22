<template>
  <div>
    {{ coordenadas }}
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 700px"
    >
      <vl-view
        :zoom.sync="map.view.zoom"
        :center.sync="map.view.center"
        :rotation.sync="map.view.rotation"
      ></vl-view>
      <vl-feature v-for="(ponto, index) in coordenadas" :key="index">
        <vl-geom-point :coordinates="ponto"></vl-geom-point>
      </vl-feature>
      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>
<script>
export default {
  name: "Mapa",
  props: {
    coordenadas: {},
  },
  data: () => ({
    map: {
      view: {
        zoom: 2,
        center: [0, 0],
        rotation: 0,
      },
    },
  }),
  methods: {},
  mounted() {},
};
</script>
