<template>
    <div v-if="!isLoading && !empresaNoExiste" class="q-mx-auto" style="max-width: 1000px;">
        <q-img :src="api_base_backend+empresa.image" style=" height: 350px;" :fit="mode">
            <div class="absolute-full text-subtitle2 flex flex-center">
                <h4 class="text-h4">
                    {{empresa.nombre}}
                </h4>
            </div>
        </q-img>
        <div class="row justify-between" style="margin-top: 20px;">
            <div class="text-caption">
                <p class="text-grey">
                    {{ empresa.is_valid === 1? "Verificado" : "No verificado" }} 
                    <q-icon
                        :name="empresa.is_valid === 1 ? 'check_circle' : 'cancel'"
                        :color="empresa.is_valid === 1? 'green' : 'red'"
                        size="30px"
                    />
                </p>
                <div>
                    <div class="q-pa-md">
                        <q-table
                          style="height: 400px; max-width: 500px;"
                          flat bordered
                          title="Operadores"
                          :rows="operators"
                          :columns="columnOperators"
                          row-key="index"
                          virtual-scroll
                        />
                    </div>
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
import { useRoute } from "vue-router"
import { api } from "src/boot/axios";
import { ref } from "vue"
import { api_base_backend } from "../helpers.js"

export default {
    setup () {
        const route = useRoute()
        const {params} = route;

        const isLoading = ref(true)
        const empresa = ref(null)
        const empresaNoExiste = ref(false)
        const operators = ref([])

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
            pagination: ref({
                rowsPerPage: 0
            })
        }
    }
}
</script>

<style scoped>
</style>

