<template>
  <div class="q-pa-md">
<<<<<<< HEAD
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

<template>
  <div class="q-pa-md">
    <q-header elevated style="padding: 0 20px;  " class="row justify-between"
    :style="{ backgroundColor: '#085d71' }">
      <div>
        <q-toolbar class="row items-center">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title  class="q-mx-auto"
          style="display: flex; justify-content: center">
            <img
          src="src/assets/LogoCamcel.jpg"
          alt="Logo Camcel"
          width="287"
          height="65"
        />
          </q-toolbar-title>
        </q-toolbar>
      </div>
     <div>
      
     </div>
      <div class="row">
        <Notificaciones2/>
        <chat/>
        <q-btn flat icon="person">
          <q-menu>
            <q-list>

              <q-separator />
              <q-item clickable v-close-popup to="/Configuracion">
                <q-item-section>Configuracion</q-item-section>
              </q-item>

              <q-separator />
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
    <q-scroll-area
        
        style="
          height: calc(100% - 150px);
          
          
        "
      >
        <q-list padding>
          <q-item clickable v-ripple v-for="(boton , index) in botones"
          :key="index"  @click="pagina(boton.pagina)">
            <q-item-section  avatar>
              <q-icon  :name="boton.icono" />
            </q-item-section>

            <q-item-section > {{ boton.nombre }} </q-item-section>
          </q-item>
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

<script setup>
import { ref } from 'vue';
import Chat from 'src/components/Chat.vue'
import notificaciones from 'src/components/Notificaciones.vue' 
import { useRouter } from "vue-router"
import { useUserStore } from 'src/store/user.store.js'
import Notificaciones2 from 'src/components/Notificaciones2.vue';

const router = useRouter()
const userStore = useUserStore()
const handleLogout = () => {
  userStore.logout() // Llama al método logout del store para limpiar el estado y el localStorage
  
  // Redirige al usuario a la página de inicio de sesión
  router.push('/login')
}
// Definición de estados reactivos
const text = ref('');
const dialog = ref(false);
const maximizedToggle = ref(true);

const search = ref('');
const botones = ref([
    {nombre:"Empresas",icono:"mdi-office-building-cog-outline",pagina:"/" },
    {nombre:"Usuarios",icono:"mdi-account-multiple-outline",pagina:"/usuarios" },
    {nombre:"His. trabajo",icono:"mdi-folder-multiple",pagina:"/his.trabajo" },
    {nombre:"Trabajos",icono:"mdi-account-hard-hat",pagina:"/trabajos" },
    {nombre:"Soporte",icono:"mdi-cog-outline",pagina:"/soporte" },
    
    
  ])
  const pagina =(e)=>{
    router.push(e)
  }
const menuList = [
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'logout',
    iconColor: 'primary',
    label: 'Logout',
    separator: false
  }
];

// Definición de `drawer`
const drawer = ref(false);
</script>