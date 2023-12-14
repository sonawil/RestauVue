<template>
  <div>
    <form @submit.prevent="soumettre">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input :style="{ border: errors.nom ? '2px solid red' : '' }" v-model="utilisateur.nom" type="text" class="form-control" id="nom">
        <div class="text-danger pb-2" v-if="errors.nom">{{ errors.nom }}</div>
      </div>
      <div class="mb-3">
        <label for="prenom" class="form-label">Prenom</label>
        <input :style="{ border: errors.prenom ? '2px solid red' : '' }" v-model="utilisateur.prenom" type="text" class="form-control" id="prenom">
        <div class="text-danger pb-2" v-if="errors.prenom">{{ errors.prenom }}</div>
      </div>
      <div class="mb-3">
        <label for="naissance" class="form-label">Naissance</label>
        <input :style="{ border: errors.naissance ? '2px solid red' : '' }" v-model="utilisateur.naissance" type="date" class="form-control" id="naissance">
        <div class="text-danger pb-2" v-if="errors.naissance">{{ errors.naissance }}</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input :style="{ border: errors.email ? '2px solid red' : '' }" v-model="utilisateur.email" type="email" class="form-control" id="email">
        <div class="text-danger pb-2" v-if="errors.email">{{ errors.email }}</div>
      </div>
      <div class="mb-3">
        <label for="mdp" class="form-label">Mot de passe</label>
        <input :style="{ border: errors.mot_de_passe ? '2px solid red' : '' }" v-model="utilisateur.mot_de_passe" type="password" class="form-control" id="mdp">
        <div class="text-danger pb-2" v-if="errors.mot_de_passe">{{ errors.mot_de_passe }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Ajouter </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
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

const errors = ref({
  nom: '',
  prenom: '',
  naissance: '',
  email: '',
  mot_de_passe: '',
});

const soumettre = () => {
  console.log("utilisateur",utilisateur.value)
  // Ne pas soumettre le formulaire si tous les champs ne sont pas valides
  //if (!valider(utilisateur.value)) return;

  ajouterUtilisateur(utilisateur.value)
    .then(() => {
      router.push('/');
    })
    .catch((err) => {
      console.log("Probleme lors de l'ajout d'un utilisateur", err);

      // En cas d'erreurs au backend, récupérer les erreurs provenant du backend et les afficher sur le formulaire
      const backendErrors = err.response.data.errors;
      // Créer un objet pour mettre les erreurs du backend dans le même format que la variable errors (déclarée plus haut)
      const backendError = {};

      for (let error of backendErrors) {
        backendError[error.path] = error.msg;
      }

      // Copier les erreurs du backend mises en forme dans la variable errors
      errors.value = { ...errors.value, ...backendError };
    });
};

// Regex utilisées dans la validation -- on peut aussi utiliser des simples if else
const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nomRegex = /^[a-zA-Z]{4,}$/;

// Fonction pour vérifier que tout le formulaire est valide
const valider = (utilisateur) => {
  // Validation de chaque champ pour afficher le bon message en cas d'erreur
  for (let champ in utilisateur) {
    validerChamp(champ, utilisateur);
  }

  if (
    !mdpRegex.test(utilisateur.mot_de_passe) ||
    !emailRegex.test(utilisateur.email) ||
    !nomRegex.test(utilisateur.nom) ||
    !nomRegex.test(utilisateur.prenom) ||
    !isNaN(new Date(utilisateur.naissance))
  )
    return false;
  return true;
};

// Fonction utiliser pour valider un champ donné
const validerChamp = (champ, utilisateur) => {
  switch (champ) {
    case 'nom':
    case 'prenom':
      if (!nomRegex.test(utilisateur[champ])) {
        errors.value[champ] = `${champ} est invalide!`;
      }
      break;
    case 'mot_de_passe':
      if (!mdpRegex.test(utilisateur[champ])) {
        errors.value[champ] = `Le mot de passe est invalide!`;
      }
      break;
    case 'email':
      if (!emailRegex.test(utilisateur[champ])) {
        errors.value[champ] = `L'email est invalide!`;
      }
      break;
  }
};


</script>

<style lang="scss" scoped></style>
