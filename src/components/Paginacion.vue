<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md">
      <q-pagination
        v-model="current"
        :max="5"
        direction-links
        unelevated
        color="black"
        active-color="purple"
      />
      <h1>Holaaaaaa</h1>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      current: ref(3),
    };
  },
};
</script>
