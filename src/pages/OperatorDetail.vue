<template>
  <div>
    <div class="q-pa-md" v-if="!isLoading">
      <div class="flex justify-between q-mb-md">
        <q-btn color="primary" flat @click="handleOutClick">salir</q-btn>
        <div class="flex justify-between">
          <q-btn color="primary q-mr-md" @click="handleOpenUpdateOperator"
            >Editar</q-btn
          >
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
      <MenuEditOperator
        v-if="updateOperator"
        @handleCloseUpdateOperator="handleCloseUpdateOperator"
        :operator="operator"
        :show="updateOperator"
      />

      <view-document
        v-if="showDocumentMenu"
        :show="showDocumentMenu"
        :document="doc"
        :operator="true"
        @handleCloseDocumentMenu="handleCloseDocumentMenu"
      />

      <div style="width: 100%; height: 100vh" class="q-mt-lg">
        <h4 class="text-h4 q-my-none">Documentaciones:</h4>
        <q-markup-table flat bordered>
          <thead class="bg-teal text-white">
            <tr>
              <th class="text-left">title</th>
              <th class="text-left">expira</th>
              <th class="text-left">autorizacion</th>
              <th class="text-left">empresa</th>
            </tr>
          </thead>
          <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <tr
              v-for="(document, index) in documents"
              :key="index"
              class="cursor-pointer"
              @click="() => handleOpenDocumentMenu(document.id)"
            >
              <td class="text-left">
                {{ document.title }}
              </td>
              <td class="text-left">
                {{ document.expire }}
              </td>
              <td class="text-left">
                <p :class="document.is_valid ? 'text-green' : 'text-red'">
                  {{ document.is_valid ? "Autorizado" : "No Autorizado" }}
                </p>
              </td>
              <td class="text-left">
                {{ document.operator }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <div class="text-center" v-if="isLoading">loading...</div>
  </div>
</template>
<script>
import { api } from "src/boot/axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import ViewDocument from "../components/ViewDocument.vue";
import MenuEditOperator from "src/components/MenuEditOperator.vue";

export default {
  components: { ViewDocument, MenuEditOperator },
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const operator = ref(null);
    const documents = ref(null);
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

    const fetchOperator = () => {
      api
        .get(`enterprises/${params.enterprise}/operators/${params.pk}`)
        .then((response) => {
          operator.value = {
            ...response.data.operator,
            is_valid: response.data.operator.is_valid
              ? "Autorizado"
              : "No Autorizado",
          };
          if (response.status === 200) {
            api
              .get(
                `enterprises/${params.enterprise}/operators/${params.pk}/documents`
              )
              .then((response) => {
                documents.value = response.data.documents;
              });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    fetchOperator();
    const doc = ref(null);
    const showDocumentMenu = ref(false);

    const handleOpenDocumentMenu = (pk) => {
      doc.value = pk;
      showDocumentMenu.value = true;
    };
    const handleCloseDocumentMenu = () => {
      showDocumentMenu.value = false;
    };

    const updateOperator = ref(false);
    const handleOpenUpdateOperator = () => {
      updateOperator.value = true;
    };
    const handleCloseUpdateOperator = () => {
      updateOperator.value = false;
      fetchOperator();
    };

    return {
      updateOperator,
      handleCloseUpdateOperator,
      handleOpenUpdateOperator,
      doc,
      handleOpenDocumentMenu,
      handleCloseDocumentMenu,
      showDocumentMenu,
      operator,
      documents,
      isLoading,
      handleOutClick,
      handleDeleteClick,
    };
  },
};
</script>
