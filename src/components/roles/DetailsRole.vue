<template>
    <div>
      <h1>Détails du rôle: {{ role.nom }}</h1>
      
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import useRole from '../../services/serviceRole';
  
  const role = ref({});
  const route = useRoute();
  const { id } = route.params;
  const { getRoleById } = useRole();
  
  onBeforeMount(() => {
    if (id)
      getRoleById(id)
        .then((data) => {
          role.value = data;
        })
        .catch((err) => console.log(err));
  });
  </script>
  
  <style lang="scss" scoped></style>
  