<template>
  <div
    v-if="!isLoading && !empresaNoExiste"
    class="q-mx-auto"
    style="max-width: 1000px"
  >
    <q-img
      :src="api_base_backend + empresa.image"
      alt="esta empresa no pose imagen"
      style="height: 350px"
      :fit="mode"
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
      <q-table
        class="my-sticky-column-table"
        style="height: 400px; width: 100%"
        flat
        bordered
        title="Operadores"
        :rows="operators"
        :columns="columnOperators"
        row-key="id"
        @row-click="onRowClick"
        virtual-scroll
      />
    </div>
  </div>
  <div v-if="isLoading" class="text-center">loading...</div>

  <div v-if="empresaNoExiste" class="row justify-center">
    <h4 class="text-h4 column">
      no existe esta empresa
      <q-icon name="warning" size="50px" color="warning" />
    </h4>
  </div>
</template>

<script>
import MenuEditEmpresa from "src/components/MenuEditEmpresa.vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { api_base_backend } from "../helpers.js";
import { useEnterpriseStore } from "src/store/enterprise.store.js";

export default {
  components: {
    MenuEditEmpresa,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const enterpriseStore = useEnterpriseStore();
    const { params } = route;

    const isLoading = ref(true);
    const empresa = ref(null);
    const empresaNoExiste = ref(false);
    const operators = ref([]);

    const menuEmpresa = ref(false);

    const handleValidEnterprise = () => {
      api
        .patch(`admin/enterprises/${params.slug}`, {
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
      api.delete(`admin/enterprises/${params.slug}`).then((response) => {
        if (response.status === 200) {
          enterpriseStore.removeEnterprise(params.slug);
          router.push("/empresas");
        }
      });
    };

    const columnOperators = [
      { name: "cedula", label: "Cédula", field: "cedula", align: "left" },
      { name: "nombre", label: "Nombre", field: "nombre", align: "left" },
      {
        name: "autorizado",
        label: "Autorizado",
        field: "autorizado",
        align: "left",
      },
      {
        name: "cargo",
        label: "Cargo",
        field: "cargo",
        align: "left",
      },
    ];

    api
      .get(`admin/enterprises/${params.slug}`)
      .then((response) => {
        empresa.value = response.data.enterprise;

        if (response.status === 200) {
          api.get(`admin/${params.slug}/operators`).then((response) => {
            operators.value = response.data.operators;
          });
        }
      })
      .catch((err) => {
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

    const onRowClick = (e, item) => {
      router.push({
        name: "operators-detail",
        params: {
          pk: item.id,
          enterprise: params.slug,
        },
      });
    };

    return {
      isLoading,
      empresa,
      empresaNoExiste,
      api_base_backend,
      columnOperators,
      operators,
      handleValidEnterprise,
      onRowClick,
      handleCloseMenuEmpresa,
      handleOpenMenuEmpresa,
      handleDesvalidEnterprise,
      menuEmpresa,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
};
</script>

<style scoped></style>
