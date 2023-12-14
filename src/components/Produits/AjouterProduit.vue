<template>
    <div class="container mt-4">
      <h2>Ajouter un Produit</h2>
      <form @submit.prevent="soumettre" class="mt-3">
        <div class="mb-3">
          <label for="nomProduit" class="form-label">Nom du Produit</label>
          <input v-model="produit.nom_produit" type="text" class="form-control" id="nomProduit">
        </div>
        <div class="mb-3">
          <label for="photoProduit" class="form-label">URL de la Photo</label>
          <input v-model="produit.photo" type="text" class="form-control" id="photoProduit">
        </div>
        <div class="mb-3">
          <label for="prixProduit" class="form-label">Prix</label>
          <input v-model="produit.prix" type="number" class="form-control" id="prixProduit">
        </div>
        <button type="submit" class="btn btn-primary">Ajouter Produit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useProduit from '../../services/serviceProduit';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const { creerProduit } = useProduit();
  
  const produit = ref({
    nom_produit: '',
    photo: '',
    prix: 0,
  });
  
  const soumettre = () => {
    creerProduit(produit.value)
      .then(() => {
        router.push('/liste-produits');
      })
      .catch((err) => console.error("Erreur lors de l'ajout du produit", err));
  };
  </script>
  
  <style lang="scss" scoped></style>
  