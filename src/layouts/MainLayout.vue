<template>
  <q-layout view="hHh Lpr lff" style="padding: 10px 10px;">
    <menu-toolbar-layout>
      <router-view/>
    </menu-toolbar-layout>
  </q-layout>
</template>

<script setup>
import MenuToolbarLayout from './MenuToolbarLayout.vue';
import { useUserStore } from "../store/user.store"
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
import { watch } from 'vue';

watch(() => {
  if (!userStore.getAuth){
    router.push("/login")
  }
})

</script>
