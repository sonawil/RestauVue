<template>
    <div>
      <form @submit.prevent="soumettre">
        <div class="mb-3">
          <label for="nom" class="form-label">Nom</label>
          <input v-model="utilisateur.nom" type="text" class="form-control" id="nom">
        </div>
        <div class="mb-3">
          <label for="prenom" class="form-label">Prenom</label>
          <input v-model="utilisateur.prenom" type="text" class="form-control" id="prenom">
        </div>
        <div class="mb-3">
          <label for="naissance" class="form-label">Naissance</label>
          <input v-model="utilisateur.naissance" type="date" class="form-control" id="naissance">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="utilisateur.email" type="email" class="form-control" id="email">
        </div>
        <div class="mb-3">
          <label for="mdp" class="form-label">Mot de passe</label>
          <input v-model="utilisateur.mot_de_passe" type="password" class="form-control" id="mdp">
        </div>
  
        <button type="submit" class="btn btn-primary">Ajouter </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useUtilisateur from '../../services/serviceUtilisateur';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const { ajouterUtilisateur } = useUtilisateur();
  
  const utilisateur = ref({
    nom: '',
    prenom: '',
    naissance: '',
    email: '',
    mot_de_passe: '',
  });
  
  const soumettre = () => {
    console.log("utilisateur", utilisateur.value);
    ajouterUtilisateur(utilisateur.value)
      .then(() => {
        router.push('/');
      })
      .catch((err) => console.log("Probleme lors de l'ajout d'un utilisateur", err));
  };
  </script>
  
  <style lang="scss" scoped></style>
  