<template>
  <div class="q-pa-md" v-if="!isLoading">
    <div class="flex justify-between q-mb-md">
      <q-btn color="primary" flat @click="handleOutClick">salir</q-btn>
      <div class="flex justify-between">
        <q-btn color="primary q-mr-md" @click="handleEditClick">Editar</q-btn>
        <q-btn color="negative" @click="handleDeleteClick">Borrar</q-btn>
      </div>
    </div>
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h6">Datos del operario</div>
      </q-card-section>

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Cedula</th>
            <th class="text-right">Nombre</th>
            <th class="text-right">Autorizado</th>
            <th class="text-right">Cargo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">{{ operator.ci }}</td>
            <td class="text-right">{{ operator.name }}</td>
            <td class="text-right">{{ operator.is_valid }}</td>
            <td class="text-right">{{ operator.cargo }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>
<script>
import { api } from "src/boot/axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const operator = ref(null);
    const isLoading = ref(true);

    const handleOutClick = () => {
      router.push("/empresas/" + params.enterprise);
    };

    const handleDeleteClick = () => {
      api
        .delete(`enterprises/${params.enterprise}/operators/${params.pk}`)
        .then((response) => {
          if (response.status == 200) {
            handleOutClick();
          }
        });
    };

    const handleEditClick = () => {
        console.log("hola")
    }

    api
      .get(`enterprises/${params.enterprise}/operators/${params.pk}`)
      .then((response) => {
        operator.value = response.data.operator;
        isLoading.value = false;
      })
      .catch((err) => {
        console.error(err);
      });

    return { operator, isLoading, handleOutClick, handleDeleteClick, handleEditClick };
  },
};
</script>
