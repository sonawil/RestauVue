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
  
        <button type="submit" class="btn btn-primary">Mettre à jour </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import useUtilisateur from '../../services/serviceUtilisateur';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const { id } = useRoute().params;
  const { getUtilisateurParId, mettreAJourUtilisateur } = useUtilisateur();
  
  const utilisateur = ref({});
  
  onBeforeMount(() => {
    if (id)
      getUtilisateurParId(id)
        .then((data) => {
          utilisateur.value = data;
        })
        .catch((err) => console.log(err));
  });
  
  const soumettre = () => {
    mettreAJourUtilisateur(id, utilisateur.value)
      .then(() => {
        router.push('/');
      })
      .catch((err) => console.log("Problème lors de la mise à jour de l'utilisateur", err));
  };
  </script>
  
  <style lang="scss" scoped></style>
  