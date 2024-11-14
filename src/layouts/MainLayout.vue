<template>
  <q-layout view="hHh Lpr lff" padding="10">
    <menu-toolbar-layout>
      <router-view />
    </menu-toolbar-layout>
  </q-layout>
</template>

<script setup>
import MenuToolbarLayout from "./MenuToolbarLayout.vue";
import { useUserStore } from "../store/user.store";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";

const userStore = useUserStore();
const router = useRouter();

watchEffect(() => {
  if (!userStore.getAuth) {
    router.push("/login");
  }
});
</script>
