<template>
  <q-btn flat bordered @click="enterpriseCreate = true">
    <q-avatar icon="mdi-plus-circle-outline" />
  </q-btn>
  <q-dialog v-model="enterpriseCreate" >
    <q-card style="width: 900px;">
      <q-card-section>
        <div class="text-h6">Crear Empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
         <q-form @submit.prevent="handleCreateEnterprise">
           <q-input name="RUT" label="RUT" v-model="dataCreateEnterprise.RUT"/>
           <q-input name="nombre" label="nombre" v-model="dataCreateEnterprise.nombre"/>
           <q-checkbox label="Verificado" v-model="dataCreateEnterprise.is_valid" />
           <q-file color="teal" filled label="image" v-model="dataCreateEnterprise.image">
             <template v-slot:prepend>
               <q-icon name="cloud_upload" />
             </template>
           </q-file>

           <p v-if="isLoading">cargando empresarios</p>
           <q-select v-if="!isLoading" map-options emit-value v-model="dataCreateEnterprise.user_id" @change="handleChangeUser" :options="formattedUsers" label="Empresarios" />
           <q-btn label="Crear" class="q-mt-md" type="submit" color="primary"/>
         </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, ref, computed } from "vue"
import { api } from "src/boot/axios";
import { useEnterpriseStore } from "src/store/enterprise.store";

export default {
  setup() {
    const enterpriseStore = useEnterpriseStore()

    const enterpriseCreate = ref(false);
    const isLoading = ref(true)
    const users = ref([]);
    const formattedUsers = computed(() => {
      return users.value.map(user => ({
        label: user.name,
        value: user.id
      }));
    });

    const dataCreateEnterprise = reactive({
      nombre: "", RUT: "", is_valid: false, image: undefined, user_id: null
    })
    
    const handleCreateEnterprise = () => {
      api.post("admin/enterprises", dataCreateEnterprise).then((response) => {
        console.log(response.data.enterprise)
        enterpriseStore.addEnterprise(response.data.enterprise)
      })
    }

    api.get("admin/users_enterprise").then((response) => {
      isLoading.value = false
      users.value = response.data.users
    })

    return {enterpriseCreate, formattedUsers, isLoading, dataCreateEnterprise, handleCreateEnterprise}
  }
}
</script>
