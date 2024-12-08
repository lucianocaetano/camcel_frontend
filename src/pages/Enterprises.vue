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
          <q-btn flat bordered @click="filter = null"> Todos </q-btn>
          <q-btn flat bordered @click="filter = true">
            <q-avatar icon="mdi-check" class="bg-green text-white" />Validados
          </q-btn>
          <q-btn flat bordered @click="filter = false">
            <q-avatar icon="mdi-close" class="bg-red text-white" />No Validados
          </q-btn>
        </div>

        <div>
          <q-btn flat bordered @click="enterpriseCreateMenu = true">
            <q-avatar icon="mdi-plus-circle-outline" />
          </q-btn>
          <create-empresa
            v-if="enterpriseCreateMenu"
            :show="enterpriseCreateMenu"
            @handleCloseCreateEnterprise="handleCloseEnterpriseCreateMenu"
          />
        </div>
      </q-toolbar>
    </q-toolbar>

    <div v-if="!isLoading">
      <div class="q-pa-md row justify-center">
        <div
          v-for="enterprise in enterprises"
          :key="enterprise.id"
          class="q-mx-sm"
        >
          <card-enterprise :enterprise="enterprise" />
        </div>
      </div>
      <Pagination
        :currentPage="paginate.current_page"
        :maxPages="paginate.last_page"
        @handleRefetchPage="handleRefetchPage"
      />
    </div>
    <div v-if="isLoading" class="text-center">loading ...</div>
  </div>
</template>

<script>
import CardEnterprise from "src/components/enterprises/CardEnterprise.vue";
import CreateEmpresa from "src/components/enterprises/CreateEnterprise.vue";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";
import { ref, watch } from "vue";
import Pagination from "src/components/helpers/Pagination.vue";

export default {
  components: {
    CardEnterprise,
    CreateEmpresa,
    Pagination,
  },
  setup() {
    const { isLoading, enterprises, paginate, refetch } = useEnterprises();
    const search = ref("");

    const filter = ref(true);

    const handleRefetchPage = (page_tag) => {
      refetch({ filter: filter.value, page: page_tag, search: search.value });
    };

    watch([search, filter], () => {
      refetch({
        filter: filter.value,
        search: search.value,
      });
    });

    const enterpriseCreateMenu = ref(false);

    const handleCloseEnterpriseCreateMenu = () => {
      enterpriseCreateMenu.value = false;
      refetch({ filter: filter.value });
    };

    return {
      isLoading,
      enterprises,
      paginate,
      refetch,

      filter,

      search,
      handleRefetchPage,

      enterpriseCreateMenu,
      handleCloseEnterpriseCreateMenu,
    };
  },
};
</script>
