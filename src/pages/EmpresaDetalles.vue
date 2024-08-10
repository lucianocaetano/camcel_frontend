<template>
  <div>
      {{empresa}}
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

        api.get(`enterprises/${params.slug}`).then((response) => {
            isLoading.value = false
            empresa.value = response.data
        })

        return {isLoading, empresa}

    }
}
</script>

<style scoped>
</style>

