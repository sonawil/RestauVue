<template>
    <div class="container mt-4">
      <h2>Liste des Produits</h2>
      <ul class="list-group mt-3">
        <li v-for="produit in produits" :key="produit.id" class="list-group-item">
          <router-link :to="{ name: 'details-produit', params: { id: produit.id } }">{{ produit.nom_produit }}</router-link>
          <button @click="supprimerProduit(produit.id)" class="btn btn-danger btn-sm float-end">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import useProduit from '../../services/serviceProduit';
  
  const produits = ref([]);
  const { listeProduits, supprimerProduit } = useProduit();
  
  onBeforeMount(() => {
    listeProduits()
      .then((data) => {
        produits.value = data;
      })
      .catch((err) => console.error(err));
  });
  </script>
  
  <style lang="scss" scoped></style>
  