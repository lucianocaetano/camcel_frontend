<template>
  <div>
    <div v-if="!isLoading" class="q-mx-auto" style="max-width: 1000px">
      <q-img
        :src="api_base_backend + empresa.image"
        alt="esta empresa no pose imagen"
        style="height: 350px"
        :fit="cover"
      >
        <template v-slot:error>
          <div class="absolute-full text-subtitle2 flex flex-center">
            <h4 class="text-h4">
              {{ empresa.nombre }}
            </h4>
          </div>
        </template>
        <div class="absolute-full text-subtitle2 flex flex-center">
          <h4 class="text-h4">
            {{ empresa.nombre }}
          </h4>
        </div>
      </q-img>
      <div class="row justify-between">
        <div class="text-caption">
          <div class="text-grey row items-center">
            {{ empresa.is_valid ? "Verificado" : "No verificado" }}
            <q-icon
              :name="empresa.is_valid ? 'check_circle' : 'cancel'"
              :color="empresa.is_valid ? 'green' : 'red'"
              size="30px"
            />
            <q-card-section class="q-pt-none">
              <div class="flex justify-left">
                <q-btn
                  label="Editar"
                  class="q-mt-md q-mr-sm"
                  type="button"
                  color="primary"
                  @click="handleOpenMenuEmpresa"
                />
                <menu-edit-empresa
                  v-if="menuEmpresa"
                  :empresa="empresa"
                  :show="menuEmpresa"
                  @handleCloseMenuEmpresa="handleCloseMenuEmpresa"
                />

                <q-btn
                  v-if="empresa.is_valid"
                  label="Desvalidar"
                  class="q-mt-md"
                  type="button"
                  color="negative"
                  @click="handleDesvalidEnterprise"
                />

                <q-btn
                  v-else
                  label="Validar"
                  class="q-mt-md"
                  type="button"
                  color="secondary"
                  @click="handleValidEnterprise"
                />
              </div>
            </q-card-section>
          </div>
        </div>
        <div style="width: 400px" v-if="empresa.user">
          <h5 class="text-h5 q-my-none">Encargado de la empresa</h5>
          <q-card>
            <q-card-section> Nombre: {{ empresa.user.name }} </q-card-section>
            <q-card-section> Email: {{ empresa.user.email }} </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="q-mt-md">
        <MenuCreateOperator
          v-if="createOperator"
          :show="createOperator"
          @handleCloseCreateOperator="handleCloseCreateOperator"
        />
        <div class="flex justify-between items-center q-my-md">
          <h4 class="text-h4 q-my-none">Operarios:</h4>
          <q-btn
            label="Crear Operario"
            class="q-mt-md q-mr-sm"
            type="button"
            color="primary"
            @click="handleOpenCreateOperator"
          />
        </div>
        <q-markup-table flat bordered>
          <thead class="bg-dark text-white">
            <tr>
              <th class="text-left">C.I.</th>
              <th class="text-left">Nombre</th>
              <th class="text-left">Autorización</th>
              <th class="text-left">Cargo</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody :class="$q.dark.isActive ? 'bg-grey-91973-08-07 00:00:00' : 'bg-grey-3'">
            <tr
              v-for="(operator, index) in operators"
              :key="index"
              :class="`${operator.is_valid ? '' : 'bg-grey-4'} cursor-pointer`"
              @click="() => handleClickOperator(operator.id)"
            >
              <td class="text-left">
                {{ operator.ci }}
              </td>
              <td class="text-left">
                {{ operator.name }}
              </td>
              <td class="text-left">
                <p :class="operator.is_valid ? 'text-green' : 'text-red'">
                  {{ operator.is_valid ? "Autorizado" : "No Autorizado" }}
                </p>
              </td>
              <td class="text-left">
                {{ operator.cargo }}
              </td>
              <td class="text-center">
                <q-btn type="button" class="text-h5 text-negative">
                  <span class="mdi mdi-trash-can"></span>
                </q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <table-documents :documents="documents" />
    </div>

    <div v-if="isLoading" class="text-center">Cargando...</div>
    <div v-if="empresaNoExiste" class="row justify-center">
      <h4 class="text-h4 column">
        no existe esta empresa
        <q-icon name="warning" size="50px" color="warning" />
      </h4>
    </div>
  </div>
</template>

<script>
import MenuEditEmpresa from "src/components/MenuEditEmpresa.vue";
import MenuCreateOperator from "src/components/MenuCreateOperator.vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { api_base_backend } from "../helpers.js";
import { useEnterpriseStore } from "src/store/enterprise.store.js";
import TableDocuments from "../components/TableDocuments.vue";

export default {
  components: {
    MenuEditEmpresa,
    MenuCreateOperator,
    TableDocuments,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const enterpriseStore = useEnterpriseStore();

    console.log(enterpriseStore)

    const { params } = route;

    const isLoading = ref(true);
    const empresa = ref(null);
    const operators = ref(null);
    const documents = ref(null);

    const empresaNoExiste = ref(false);

    const menuEmpresa = ref(false);

    const handleValidEnterprise = () => {
      api
        .patch(`enterprises/${params.slug}`, {
          is_valid: true,
        })
        .then((response) => {
          if (response.status === 200) {
            enterpriseStore.removeEnterprise(params.slug);
            router.push("/empresas");
          }
        });
    };

    const handleDesvalidEnterprise = () => {
      api.delete(`enterprises/${params.slug}`).then((response) => {
        if (response.status === 200) {
          enterpriseStore.removeEnterprise(params.slug);
          router.push("/empresas");
        }
      });
    };

    const fetchOperators = async () => {
      await api.get(`enterprises/${params.slug}/operators`).then((response) => {
        operators.value = response.data.operators;
      });
    };

    api
      .get(`enterprises/${params.slug}`)
      .then(async (response) => {
        empresa.value = response.data.enterprise;
        if (response.status === 200) {
          fetchOperators();
          await api
            .get(`enterprises/${params.slug}/documents`)
            .then((response) => {
              documents.value = response.data.documents;
            });
        }
      })
      .catch((err) => {
        console.error(err);
        isLoading.value = false;
        if (err?.response?.status === 404) {
          empresaNoExiste.value = true;
        }
      })
      .finally(() => {
        isLoading.value = false;
      });

    const handleOpenMenuEmpresa = () => (menuEmpresa.value = true);
    const handleCloseMenuEmpresa = () => {
      menuEmpresa.value = false;
    };

    const handleClickOperator = (pk) => {
      router.push({
        name: "operators-detail",
        params: {
          pk,
          enterprise: params.slug,
        },
      });
    };

    const createOperator = ref(false);
    const handleOpenCreateOperator = () => {
      createOperator.value = true;
    };
    const handleCloseCreateOperator = () => {
      createOperator.value = false;
      fetchOperators();
    };
    return {
      createOperator,
      handleCloseCreateOperator,
      handleOpenCreateOperator,
      isLoading,
      empresa,
      empresaNoExiste,
      api_base_backend,
      operators,
      handleValidEnterprise,
      handleClickOperator,
      handleCloseMenuEmpresa,
      handleOpenMenuEmpresa,
      handleDesvalidEnterprise,
      menuEmpresa,
      documents,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
};
</script>
