<template>
    <q-btn flat  icon="mdi-chat" @click="dialog = true">
        
         <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down">    
          <q-card class="bg-teal-10 text-white">
          <ChatCompleto/>
      </q-card>
    </q-dialog>
 </q-btn>
</template>
<style scoped>

.q-dialog__inner--maximized > div {
    width: 80%;
    height: 80%;
    overflow-y:hidden

}
</style>
<script setup>
import { provide, ref } from 'vue'
import ChatCompleto from 'src/components/ChatCompleto.vue '
const text = ref('')
const dialog = ref(false)
const maximizedToggle = ref(true)

</script>