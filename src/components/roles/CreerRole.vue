<template>
    <div>
      <form @submit.prevent="soumettre">
        <div class="mb-3">
          <label for="nom" class="form-label">Nom du rôle</label>
          <input v-model="role.nom" type="text" class="form-control" id="nom">
        </div>
        <!-- Ajoutez d'autres champs pour le modèle de rôle au besoin -->
  
        <button type="submit" class="btn btn-primary">Ajouter Rôle</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useRole from '../../services/serviceRole';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const { ajouterRole } = useRole();
  
  const role = ref({
    nom: '',
    
  });
  
  const soumettre = () => {
    ajouterRole(role.value)
      .then(() => {
        router.push('/lister-roles');
      })
      .catch((err) => console.log("Problème lors de l'ajout d'un rôle", err));
  };
  </script>
  
  <style lang="scss" scoped></style>
  