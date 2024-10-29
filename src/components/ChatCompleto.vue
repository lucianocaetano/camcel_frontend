<template>
  <!-- Header -->
  <div class="header">
    <q-toolbar class="bg-grey-3 text-black">
      <q-btn round flat @click="isMobile && (menu = !menu)">
        <q-avatar>
          <img :src="currentConversation.avatar">
        </q-avatar>
      </q-btn>

      <span class="q-subtitle-1 q-pl-md" @click="isMobile && (menu = !menu)">
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

    <!-- Menú desplegable para móviles -->
    <q-menu v-if="isMobile" v-model="menu" auto-close>
      <q-list>
        <q-item
          v-for="(conversation, index) in conversations"
          :key="conversation.id"
          clickable
          @click="setCurrentConversation(index); menu = false"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="conversation.avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ conversation.person }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>

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
  <div @keydown="sendMessage2">
    <q-toolbar class="BarraTexto bg-grey-3 text-black row">
      <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
      <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
      <q-btn round flat icon="send" @click="sendMessage" />
    </q-toolbar>
  </div>
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
const menu = ref(false)
const isMobile = ref(window.innerWidth < 768) // Detecta si es móvil

function sendMessage() {
  if (message.value.trim() !== '') {
    currentConversation.value.messages.push({
      text: message.value,
      isSender: true
    })
    message.value = ''
  }
}

function sendMessage2(event) {
  if (event.key === 'Enter') {
    sendMessage()
  }
}

function setCurrentConversation(index) {
  currentConversationIndex.value = index
}

// Listener para cambios de tamaño de la ventana
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768
});
</script>

<style scoped>
.Drawer {
  width: 25%;
  height: 100%;
  background-color: white;
  color: #000;
  top: 0;
  position: absolute;
  z-index: 8;
}

.header {
  right: 0;
  top: 0;
  width: 75%;
  height: 8%;
  position: absolute;
  z-index: 10;
}

.BarraTexto {
  right: 0;
  bottom: 0;
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
  max-width: 30%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.sent-message {
  background-color: #DCF8C6;
  margin-left: auto;
}

.received-message {
  background-color: #FFF;
  margin-right: auto;
}

@media (max-width: 768px) {
  .Drawer {
    width: 100%;
    height: auto;
    position: relative;
  }

  .header, .BarraTexto, .chat-area {
    width: 100%;
  }

  .messages-area {
    padding: 5px;
  }

  .message-item {
    max-width: 80%;
  }

  .BarraTexto {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  q-btn {
    min-width: 40px;
  }

  q-input {
    min-height: 40px;
  }
}
</style>