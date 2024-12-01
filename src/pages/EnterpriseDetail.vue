<template>
  <div>
    <valid-delete-enterprise-menu
      v-if="showDeleteMenu"
      :show="showDeleteMenu"
      @handleDeleteMenuClose="handleDeleteMenuClose"
      @handleDeleteMenuAccept="handleDeleteMenuAccept"
    />

    <div v-if="!isLoading" class="q-mx-auto" style="max-width: 1000px">
      <q-img
        :src="`${api_base_backend}/${enterprise.image}`"
        alt="esta enterprise no pose imagen"
        style="height: 350px"
        :fit="cover"
      >
        <template v-slot:error>
          <div class="absolute-full text-subtitle2 flex flex-center">
            <h4 class="text-h4">
              {{ enterprise.name }}
            </h4>
          </div>
        </template>
        <div class="absolute-full text-subtitle2 flex flex-center">
          <h4 class="text-h4">
            {{ enterprise.name }}
          </h4>
        </div>
      </q-img>
      <div class="row justify-between">
        <div class="text-caption">
          <div class="text-grey row items-center">
            {{ enterprise.is_valid ? "Verificado" : "No verificado" }}
            <q-icon
              :name="enterprise.is_valid ? 'check_circle' : 'cancel'"
              :color="enterprise.is_valid ? 'green' : 'red'"
              size="30px"
            />
            <q-card-section class="q-pt-none q-px-none q-ml-sm">
              <div class="flex justify-left items-center q-mt-md w-full">
                <q-btn
                  label="Editar"
                  type="button"
                  class="q-mr-sm"
                  color="primary"
                  @click="enterpriseEditMenu = true"
                />
                <edit-enterprise
                  v-if="enterpriseEditMenu"
                  :enterprise="enterprise"
                  :show="enterpriseEditMenu"
                  @handleCloseMenuEditEnterprise="handleCloseMenuEditEnterprise"
                />

                <q-btn
                  v-if="enterprise.is_valid"
                  label="Desvalidar"
                  type="button"
                  color="negative"
                  @click="handleNotValidEnterprise"
                />

                <q-btn
                  v-else
                  label="Validar"
                  type="button"
                  color="secondary"
                  @click="handleValidEnterprise"
                />

                <q-btn
                  type="button"
                  class="text-lg text-negative q-ml-md"
                  @click="()=>{showDeleteMenu=true}"
                >
                  Eliminar <span class="mdi mdi-trash-can"></span>
                </q-btn>
              </div>
            </q-card-section>
          </div>
        </div>
        <div style="width: 400px" v-if="enterprise.user">
          <h5 class="text-h5 q-my-none">Encargado de la enterprise</h5>
          <q-card>
            <q-card-section>
              Nombre: {{ enterprise.user.name }}
            </q-card-section>
            <q-card-section>
              Email: {{ enterprise.user.email }}
            </q-card-section>
          </q-card>
        </div>
      </div>
      <operators-list :enterprise="enterprise.slug" />
      <table-documents :documents="documents"/>
    </div>

    <div v-if="isLoading" class="text-center">Cargando...</div>
    <div v-if="enterpriseNoExiste" class="row justify-center">
      <h4 class="text-h4 column">
        no existe esta enterprise
        <q-icon name="warning" size="50px" color="warning" />
      </h4>
    </div>
  </div>
</template>

<script>
import EditEnterprise from "src/components/enterprises/EditEnterprise.vue";
import OperatorsList from "src/components/operators/OperatorsList.vue";
import MenuCreateOperator from "src/components/MenuCreateOperator.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { api_base_backend } from "../helpers.js";
import TableDocuments from "../components/documents/TableDocuments.vue";
import {
  useEnterprise,
  useValidEnterprise,
  useNotValidEnterprise,
  useDeleteEnterprise,
} from "src/hooks/api/enterprises.hooks";
import { useDocuments } from "src/hooks/api/documents.hooks";
import ValidDeleteEnterpriseMenu from "src/components/ValidDeleteMenu.vue";

export default {
  components: {
    EditEnterprise,
    MenuCreateOperator,
    TableDocuments,
    OperatorsList,
    ValidDeleteEnterpriseMenu,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { params } = route;
    const { enterprise, isLoading, refetch } = useEnterprise(params.slug);
    const { documents, isLoading: isLoadingDocuments, refetch: refetchDocuments } = useDocuments(params.slug);

    const enterpriseNoExiste = ref(false);
    const enterpriseEditMenu = ref(false);

    const showDeleteMenu = ref(false);

    const handleDeleteMenuClose = () => showDeleteMenu.value = false;

    const handleDeleteMenuAccept = async () => {
      showDeleteMenu.value = false;
      await useDeleteEnterprise(params.slug);
      router.push({ name: "enterprises" });
    };

    const handleCloseMenuEditEnterprise = () => {
      enterpriseEditMenu.value = false;
      refetch();
    };

    const handleNotValidEnterprise = async () => {
      await useNotValidEnterprise(params.slug);
      refetch();
    };

    const handleValidEnterprise = async () => {
      await useValidEnterprise(params.slug);
      refetch();
    };

    return {
      isLoading: isLoading  && isLoadingDocuments,
      enterprise,
      documents,
      isLoadingDocuments,
      refetchDocuments,
      showDeleteMenu,
      enterpriseNoExiste,
      handleDeleteMenuClose,
      handleDeleteMenuAccept,
      api_base_backend,
      enterpriseEditMenu,
      handleCloseMenuEditEnterprise,
      handleNotValidEnterprise,
      handleValidEnterprise,
    };
  },
};
</script>
