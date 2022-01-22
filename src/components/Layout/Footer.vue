<template>
  <v-footer app>
    <span>&copy; {{ ano }} - Starsat</span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    ano: new Date().getFullYear(),
  }),
};
</script>