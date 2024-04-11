<template>
  <div class="app-container">
  <button @click="consoleJson">点击console.out</button>
  </div>
</template>

<script>
import jsonStr from '@/api/jsonTest'

export default {
  methods:{
    consoleJson() {
      jsonStr.getJson()
        .then(response =>{
          console.log(response.data.str);
        })
    },
  }
}
</script>

<style scoped>

</style>
