<template>
  <div v-if="this.active">
    <h1></h1>
  </div>
</template>   
<script>
export default {
  mounted() {
    if (localStorage.getItem("active_queue")) {
      this.active = true;
    }
  },
  data() {
    return {
      active: false,
    };
  },
};
</script>
<style>
</style>
    
 