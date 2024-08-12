<template>
  <q-dialog v-model="show" >
    <q-card style="width: 900px;">
      <q-card-section>
        <div class="text-h6">Menu Operario</div>
      </q-card-section>
      <q-card-section>
        <!-- TODO: menu update operators -->
      </q-card-section>
      <q-card-section class="q-pt-none">
         <q-form class="flex justify-left">
           <q-btn label="Editar" class="q-mt-md q-mr-sm" type="submit" color="primary"/>
           <q-btn label="Borrar" class="q-mt-md" type="button" color="negative"/>
         </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="handleClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
 </template>

<script>
import { toRef } from "vue"

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    operator: {
      required: true
    }
  },
  setup(props, {emit}) {
    const show = toRef(props, "show")
    const operator = toRef(props, "operator")

    const handleClose = () => {
      emit("handleCloseMenuOperator")
    }

    return {show, handleClose, operator}
  }
}
</script>

<style scoped>
.my-card {
  width: 380px; /* ajusta el ancho de la tarjeta */
  height: auto; /* ajusta el alto de la tarjeta */
  margin-bottom: 20px; /* agrega un margen inferior a cada tarjeta */
  border-radius: 10px; /* agrega un borde redondeado a la tarjeta */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.scrollable-section {
   /* Altura máxima deseada para la sección */
  overflow-y: auto; /* Habilitar barra de desplazamiento vertical cuando sea necesario */
  /* Otros estilos opcionales */
}
</style>



