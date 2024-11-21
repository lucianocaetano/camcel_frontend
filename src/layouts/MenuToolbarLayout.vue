<template>
  <div class="q-pa-md">

    <q-header
      elevated
      :style="{padding: '0 20px', backgroundColor: '#085d71'}"
      class="row justify-between items-center"
    >
      <div>
        <q-toolbar class="row items-center">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </div>

      <div
        class="q-mx-auto"
        style="display: flex; justify-content: center"
      >
        <img
          src="src/assets/LogoCamcel.jpg"
          alt="Logo Camcel"
          width="287"
          height="65"
        />
      </div>

     
      <div class="row">
        <Notificaciones2/>
        <chat/>
        <q-btn flat icon="person">
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup to="/Configuracion">
                <q-item-section>Configuracion</q-item-section>
              </q-item>
              <q-item clickable @click="handleLogout" v-close-popup>
                <q-item-section >Cerrar Sesion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-header>
    
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              v-ripple
              class="text-black"
              :to="{ name: menuItem.href }"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page class="q-mx-auto" style="max-width: 2000px;">
        <slot/>
      </q-page>
    </q-page-container>
  </div>
</template>

<script>
import { ref } from "vue";
import Chat from 'src/components/Chat.vue'
import notificaciones from 'src/components/Notificaciones.vue' 
import Notificaciones2 from 'src/components/Notificaciones2.vue';

export default {
  components: {
    Chat,
    notificaciones,
    Notificaciones2
  },
  setup() {
    const search = ref("");

    const menuList = [
      {
        icon: "business_center",
        label: "Empresas",
        href: "enterprises",
        separator: false,
      },
      {
        icon: "mdi-account",
        label: "Usuarios",
        href: "users",
        separator: false,
      },
      {
        label: "His. trabajo",
        icon: "mdi-folder-multiple",
        href: "his.trabajo",
      },
     { label: "Trabajos", icon: "mdi-account-hard-hat", href: "trabajos" },
      {
        label: "Soporte",
        icon: "mdi-cog-outline",
        href: "soporte",
        separator: false,
      },
    ];

    return {
      drawer: ref(false),
      search,
      menuList,
    };
  }
}
</script>
