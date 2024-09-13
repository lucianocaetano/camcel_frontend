<template>
  <!-- Header -->
  <div class="header">
    <q-toolbar class="bg-grey-3 text-black">
      <q-btn round flat>
        <q-avatar>
          <img :src="currentConversation.avatar">
        </q-avatar>
      </q-btn>

      <span class="q-subtitle-1 q-pl-md">
        {{ currentConversation.person }}
      </span>

      <q-space />

     
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-toolbar>
  </div>

  <!-- Sidebar / Drawer -->
  <div class="Drawer">
    <q-toolbar class="bg-grey-3">
      <q-avatar class="cursor-pointer">
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
      </q-avatar>
      <q-space />
    </q-toolbar>

    <q-toolbar class="bg-grey-2">
      <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="Search or start a new conversation">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <q-scroll-area style="height: calc(100% - 100px)">
      <q-list>
        <q-item
          v-for="(conversation, index) in conversations"
          :key="conversation.id"
          clickable
          v-ripple
          @click="setCurrentConversation(index)"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="conversation.avatar">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ conversation.person }}
            </q-item-label>
            <q-item-label class="conversation__summary" caption>
              <q-icon name="check" v-if="conversation.sent" />
              <q-icon name="not_interested" v-if="conversation.deleted" />
              {{ conversation.caption }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>
              {{ conversation.time }}
            </q-item-label>
            <q-icon name="keyboard_arrow_down" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>

  <!-- Chat Messages Area -->
  <q-page-container class="bg-grey-5 chat-area">
    <q-scroll-area class="messages-area">
      <q-list>
        <q-item v-for="(msg, index) in currentConversation.messages" :key="index" class="message-item" :class="{ 'sent-message': msg.isSender, 'received-message': !msg.isSender }">
          <q-item-section>
            <q-item-label>{{ msg.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page-container>

  <!-- Message Input Bar -->
  <q-toolbar class="BarraTexto bg-grey-3 text-black row">
    <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
    <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
    <q-btn round flat icon="send" @click="sendMessage" />
  </q-toolbar>
</template>

<script setup>
import { ref, computed } from 'vue'

const conversations = ref([
  {
    id: 1,
    person: 'Razvan Stoenescu',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    caption: "I'm working on Quasar!",
    time: '15:00',
    sent: true,
    messages: []
  },
  {
    id: 2,
    person: 'Dan Popescu',
    avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
    caption: "I'm working on Quasar!",
    time: '16:00',
    sent: true,
    messages: []
  },
  {
    id: 3,
    person: 'Jeff Galbraith',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    caption: "I'm working on Quasar!",
    time: '18:00',
    sent: true,
    messages: []
  },
  {
    id: 4,
    person: 'Allan Gaunt',
    avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
    caption: "I'm working on Quasar!",
    time: '17:00',
    sent: true,
    messages: []
  }
])

const currentConversationIndex = ref(0)
const currentConversation = computed(() => {
  return conversations.value[currentConversationIndex.value]
})

const message = ref('')

function sendMessage() {
  if (message.value.trim() !== '') {
    currentConversation.value.messages.push({
      text: message.value,
      isSender: true // Marca este mensaje como enviado por el usuario
    })
    message.value = ''
  }
}

function setCurrentConversation(index) {
  currentConversationIndex.value = index
}
</script>

<style scoped>
.Drawer {
  width: 25%;
  height: 100%;
  background-color: white;
  color: #000;
  top: 0%;
  position: absolute;
  z-index: 8;
}

.header {
  right: 0%;
  top: 0;
  width: 75%;
  height: 8%;
  position: absolute;
  z-index: 10;
}

.BarraTexto {
  right: 0%;
  bottom: 0%;
  position: absolute;
  width: 75%;
  height: 9%;
  background-color: black;
  z-index: 9;
}

.chat-area {
  width: 88%;
  height: calc(100% - 9%);
  position: absolute;
  top: 0;
  right: 0;
  color: #000;

}

.messages-area {
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

}

.message-item {
  max-width: 30%; /* Limita el ancho máximo de los mensajes */
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word; /* Permite que el texto largo se divida */
  white-space: pre-wrap; /* Permite saltos de línea dentro del mensaje */
}

.sent-message {
  background-color: #DCF8C6; /* Color estilo WhatsApp para mensajes enviados */
  margin-left: auto; /* Alinea los mensajes enviados a la derecha */
}

.received-message {
  background-color: #FFF;
  margin-right: auto; /* Alinea los mensajes recibidos a la izquierda */
}
</style>
