<template>
    <div :if="!isLoading && !empresaNoExiste">
        {{empresa}}
    </div>
    <div v-if="empresaNoExiste">
        no existe esta empresa
    </div>
    <div v-if="isLoading" class="text-center">
        loading... 
    </div>
</template>

<script>
import { useRoute } from "vue-router"
import { api } from "src/boot/axios";
import { ref } from "vue"

export default {
    setup () {
        const route = useRoute()
        const {params} = route;

        const isLoading = ref(true)
        const empresa = ref(null)
        const empresaNoExiste = ref(false)

        api.get(`enterprises/${params.slug}`).then((response) => {
            isLoading.value = false
            empresa.value = response.data
        }).catch((err) => {
            isLoading.value = false
            if(err?.response?.status){
                empresaNoExiste.value = true
            }
        })

        return {isLoading, empresa, empresaNoExiste}
    }
}
</script>

<style scoped>
</style>

