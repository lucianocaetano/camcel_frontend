<template>
   <q-toolbar class="column">
      <q-input
        style="width: 100%;"
        filled
        class="custom-input"
        v-model="search"
        label="Búsqueda"
      >
         <template v-slot:prepend>
            <q-btn flat round dense class="icono_de_busqueda" icon="search"/>
         </template>
      </q-input>

   </q-toolbar>

   
</template>

<script>

</script>
