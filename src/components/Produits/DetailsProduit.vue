<template>
    <div class="container mt-4">
      <h2>Détails du Produit: {{ produit.nom_produit }}</h2>
      <div class="mb-3">
        <strong>Photo:</strong>
        <img :src="produit.photo" alt="Photo du produit" class="img-fluid">
      </div>
      <div class="mb-3">
        <strong>Prix:</strong> {{ produit.prix }} $
      </div>
      <!-- Ajoutez d'autres détails du produit au besoin -->
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import useProduit from '../../services/serviceProduit';
  
  const produit = ref({});
  const route = useRoute();
  const { id } = route.params;
  const { lireProduit } = useProduit();
  
  onBeforeMount(() => {
    if (id)
      lireProduit(id)
        .then((data) => {
          produit.value = data;
        })
        .catch((err) => console.error(err));
  });
  </script>
  
  <style lang="scss" scoped></style>
  