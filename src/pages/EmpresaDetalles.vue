<template>
    <div v-if="!isLoading && !empresaNoExiste" class="q-mx-auto" style="max-width: 1000px;">
        <q-img :src="api_base_backend+empresa.image" alt="esta empresa no pose imagen"  style=" height: 350px;" :fit="mode">
            <template v-slot:error>
                <div class="absolute-full text-subtitle2 flex flex-center">
                    <h4 class="text-h4">
                        {{empresa.nombre}}
                    </h4>
                </div>
            </template>
            <div class="absolute-full text-subtitle2 flex flex-center">
                <h4 class="text-h4">
                    {{empresa.nombre}}
                </h4>
            </div>
        </q-img>
        <div class="row justify-between">
            <div class="text-caption">
                <div class="text-grey row items-center">
                    {{ empresa.is_valid === 1? "Verificado" : "No verificado" }} 
                    <q-icon
                        :name="empresa.is_valid === 1 ? 'check_circle' : 'cancel'"
                        :color="empresa.is_valid === 1? 'green' : 'red'"
                        size="30px"
                    />
                    <q-card-section class="q-pt-none">
                        <q-form class="flex justify-left">
                            <q-btn label="Editar" class="q-mt-md q-mr-sm" type="submit" color="primary"/>
                            <q-btn label="Borrar" class="q-mt-md" type="button" color="negative" @click="handleRemoveEnterprise"/>
                        </q-form>
                    </q-card-section>
                </div>
                <div>
                    <menu-operario :operator="operator" :show="menuOperator" @handleCloseMenuOperator="handleCloseMenuOperator"/>
                    <q-table
                        class="my-sticky-column-table"
                        style="height: 400px; max-width: 500px;"
                        flat bordered
                        title="Operadores"
                        :rows="operators"
                        :columns="columnOperators"
                        row-key="index"
                        virtual-scroll
                        @row-click="onRowClick"
                    />
                </div>
            </div>
            <div style="width: 400px;">
                <h5 class="text-h5 q-my-none">Encargado de la empresa</h5>
                <q-card>
                    <q-card-section>
                        Nombre: {{empresa.user.name}}
                    </q-card-section>
                    <q-card-section>
                    Email: {{empresa.user.email}}
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
    <div v-if="isLoading" class="text-center">
        loading... 
    </div>

    <div v-if="empresaNoExiste" class="row justify-center">
        <h4 class="text-h4 column">
            no existe esta empresa
           <q-icon name="warning" size="50px" color="warning"/>
        </h4>
    </div> 
    </template>

<script>
import MenuOperario from "src/components/MenuOperator.vue"
import { useRoute, useRouter } from "vue-router"
import { api } from "src/boot/axios";
import { ref } from "vue"
import { api_base_backend } from "../helpers.js"
import { useEnterpriseStore } from "src/store/enterprise.store.js";

export default {
    components: {
        MenuOperario
    },
    setup () {
        const route = useRoute()
        const router = useRouter()
        const enterpriseStore = useEnterpriseStore()
        const {params} = route;

        const isLoading = ref(true)
        const empresa = ref(null)
        const empresaNoExiste = ref(false)
        const operators = ref([])
        
        const menuOperator = ref(false)
        const operator = ref(null)

        const onRowClick = (evt, row) => {
            menuOperator.value = true
            operator.value = row
        };


        const handleRemoveEnterprise = () => {
            api.delete(`admin/enterprises/${params.slug}`).then((response) => {
                if(response.status === 200) {
                    enterpriseStore.removeEnterprise(params.slug)
                    router.push("/empresas")
                }
            })
        }

        const handleCloseMenuOperator = () => {
            menuOperator.value = false
        }

        const columnOperators = [
            { name: 'cedula', label: 'Cédula', field: 'cedula', align: 'left' },
            { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left' },
            { name: 'autorizado', label: 'Autorizado', field: 'autorizado', align: 'left' },
            { name: 'cargo', label: 'Cargo', field: 'cargo', align: 'left' }
        ];
        
        api.get(`admin/enterprises/${params.slug}`).then((response) => {
            empresa.value = response.data.enterprise
            operators.value = response.data.operators
            isLoading.value = false
        }).catch((err) => {
            isLoading.value = false
            if(err?.response?.status === 404){
                empresaNoExiste.value = true
            }
        })


        return {isLoading, empresa, empresaNoExiste, api_base_backend,
            columnOperators,
            operators,
            onRowClick,
            handleCloseMenuOperator,
            handleRemoveEnterprise,
            menuOperator,
            operator,
            pagination: ref({
                rowsPerPage: 0
            })
        }
    }
}
</script>

<style scoped>
</style>

