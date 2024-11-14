<template>
  <div>
    <q-toolbar class="column">
      <q-input
        style="width: 100%"
        filled
        class="custom-input"
        v-model="search"
        label="Busqueda"
      >
        <template v-slot:prepend>
          <q-btn flat round dense class="icono_de_busqueda" icon="search" />
        </template>
      </q-input>

      <q-toolbar class="row justify-between">
        <div>
          <q-btn flat bordered @click="filter_is_valid = null"> Todos </q-btn>
          <q-btn flat bordered @click="filter_is_valid = true">
            <q-avatar icon="mdi-check" class="bg-green text-white" />Validados
          </q-btn>
          <q-btn flat bordered @click="filter_is_valid = false">
            <q-avatar icon="mdi-close" class="bg-red text-white" />No Validados
          </q-btn>
        </div>

        <div>
          <q-btn flat bordered @click="enterpriseCreate = true">
            <q-avatar icon="mdi-plus-circle-outline" />
          </q-btn>
          <create-empresa
            v-if="enterpriseCreate"
            :show="enterpriseCreate"
            @handleCloseCreateEnterprise="handleCloseCreateEnterprise"
          />
        </div>
      </q-toolbar>
    </q-toolbar>

    <div v-if="!isLoading" class="q-pa-md row justify-center">
      <div v-for="empresa in empresas" :key="empresa.id">
        <div v-if="empresa.nombre.toLowerCase().includes(search.toLowerCase())">
          <card-empresas
            v-if="
              filter_is_valid === null || empresa.is_valid === filter_is_valid
            "
            :empresa="empresa"
          />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="text-center">loading ...</div>
  </div>
</template>

<script>
import CardEmpresas from "src/components/CardEmpresas.vue";
import CreateEmpresa from "src/components/CreateEmpresa.vue";
import { useEnterpriseStore } from "src/store/enterprise.store";
import { api } from "src/boot/axios";
import { ref, computed } from "vue";

export default {
  components: {
    CardEmpresas,
    CreateEmpresa,
  },
  setup() {
    const enterpriseStore = useEnterpriseStore();
    const search = ref("");

    const filter_is_valid = ref(true);

    const enterpriseCreate = ref(false);
    const isLoading = ref(true);
    const empresas = computed(() => enterpriseStore.enterprises);

    const handleCloseCreateEnterprise = () => {
      enterpriseCreate.value = false;
    };

    api.get("enterprises").then((response) => {
      isLoading.value = false;
      enterpriseStore.setEnterprises(response.data);
    });

    return {
      isLoading,
      empresas,
      search,
      enterpriseCreate,
      filter_is_valid,
      handleCloseCreateEnterprise,
    };
  },
};
</script>
