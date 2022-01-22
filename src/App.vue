<template>
  <v-app>
    <Header />
    <Menus />
    <Content />
    <Footer />
  </v-app>
</template>

<script>
import Content from "./components/Layout/Content.vue";
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";
import Menus from "./components/Layout/Menus.vue";

export default {
  name: "App",

  components: {
    Content,
    Header,
    Footer,
    Menus,
  },
};
</script>