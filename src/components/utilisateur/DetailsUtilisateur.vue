<template>
    <div>
      <h1>Profile de {{ utilisateur.nom }} {{ utilisateur.prenom }}</h1>
      <p>Email: {{ utilisateur.email }}</p>
      <p>Date de naissance: {{ utilisateur.naissance }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import useUtilisateur from '../../services/serviceUtilisateur';
  
  const utilisateur = ref({});
  const route = useRoute();
  const { id } = route.params;
  const { getUtilisateurParId } = useUtilisateur();
  
  onBeforeMount(() => {
    if (id)
      getUtilisateurParId(id)
        .then((data) => {
          utilisateur.value = data;
        })
        .catch((err) => console.log(err));
  });
  </script>
  
  <style lang="scss" scoped></style>
  