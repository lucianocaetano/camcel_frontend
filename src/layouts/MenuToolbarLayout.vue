<template>
  <div class="q-pa-md">
    <q-header elevated style="padding: 0 20px;" class="row justify-between bg-teal-10">
      <div>
        <q-toolbar class="row items-center">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Camcel</q-toolbar-title>
        </q-toolbar>
      </div>
     
      <div class="row">
        <q-btn flat icon="mdi-chat" />
        <q-btn flat icon="person">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Perfil</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Empresa</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Documentos</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Descargas</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Configuracion</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>Cerrar Sesion</q-item-section>
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
            <q-item clickable v-ripple>
              <q-btn
                :to="{ name: menuItem.href }"
                flat
               >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{menuItem.label}}
                </q-item-section>
              </q-btn>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
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
import { ref } from 'vue'

const search = ref("")

const menuList = [
  {
    icon: 'business_center',
    label: 'Empresas',
    href: "enterprises", 
    separator: false 
  },
  {
    icon: 'description',
    label: 'Documentos',
    separator: true 
  },
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
]

export default {
  setup () {
    return {
      drawer: ref(false),
      search,
      menuList
    }
  }
}
</script>

