<template>
    {{operator}}
</template>
<script>
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
    setup() {
        const {params} = useRoute()

        const operator = ref(null);
        const isLoading = ref(true);

        api.get(`admin/${params.enterprise}/operators/${params.pk}`).then((response)=>{
            operator.value = response.data.operator;
            isLoading.value = false;
        }).catch(err=>{
            console.error(err)
        });

        return {operator, isLoading}
    },
}
</script>

