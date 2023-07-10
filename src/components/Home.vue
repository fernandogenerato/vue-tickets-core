<template>
  <div v-if="env.IsActive">
    <h1>Olá,</h1>
    <h3 v-if="env.position == 1">É a sua vez !</h3>
    <h3 v-else>Você está em {{ env.position }}º na fila</h3>
    <h6>Horario que entrou na fila: {{ env.time }}</h6>
    <button @click="env.exitQueue" class="btn btn-lg btn-primary btn-block">
      Sair da fila.
    </button>
  </div>
  <div v-else><QueueTicket></QueueTicket></div>
</template>   
<script setup>
import QueueTicket from "./QueueTicket.vue";
import { useGlobalStore } from "../stores/global";
const env = useGlobalStore();
</script>
<style>
</style>
    
 