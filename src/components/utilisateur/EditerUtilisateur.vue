<template>
  <div class="wrapper">
    <form @submit.prevent="mettreAJour">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom</label>
        <input :style="{ border: errors.nom ? '2px solid red' : '' }" v-model="utilisateur.nom" type="text"
          class="form-control" id="nom">
        <div class="text-danger pb-2" v-if="errors.nom">{{ errors.nom }}</div>
      </div>
      <div class="mb-3">
        <label for="prenom" class="form-label">Prenom</label>
        <input v-model="utilisateur.prenom" type="text" class="form-control" id="prenom">
        <div class="text-danger pb-2" v-if="errors.prenom">{{ errors.prenom }}</div>
      </div>
      <div class="mb-3">
        <label for="naissance" class="form-label">Naissance</label>
        <input v-model="utilisateur.naissance" type="date" class="form-control" id="naissance">
        <div class="text-danger pb-2" v-if="errors.naissance">{{ errors.naissance }}</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="utilisateur.email" type="email" class="form-control" id="email">
        <div class="text-danger pb-2" v-if="errors.email">{{ errors.email }}</div>
      </div>
      <div class="mb-3">
        <label for="mdp" class="form-label">Mot de passe</label>
        <input v-model="utilisateur.mot_de_passe" type="password" class="form-control" id="mdp">
        <div class="text-danger pb-2" v-if="errors.mot_de_passe">{{ errors.mot_de_passe }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Mettre à jour</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const { id } = route.params;
const router = useRouter();
const utilisateur = ref({});

const errors = ref({
  nom: '',
  prenom: '',
  naissance: '',
  email: '',
  mot_de_passe: '',
});

import useUtilisateur from '../../services/serviceUtilisateur';
const { editerUtilisateur, getUtilisateurParId } = useUtilisateur();

onBeforeMount(() => {
  if (id)
    getUtilisateurParId(id)
      .then((data) => {
        utilisateur.value = data;
      })
      .catch((err) => console.log(err));
});

const mettreAJour = () => {
  // Ne pas soumettre le formulaire si tous les champs ne sont pas valides
  if (!valider(utilisateur.value)) return;

  editerUtilisateur(id, utilisateur.value)
    .then(() => {
      router.push('/');
    })
    .catch((err) => {
      console.log(err);
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

// Voir les erreurs de validation en temps réel
watchEffect(() => {
  errors.value.nom = '';
  if (utilisateur.value.nom != '' && !nomRegex.test(utilisateur.value.nom)) {
    errors.value.nom = 'Nom incorrect';
    return;
  }
  errors.value.prenom = '';
  if (
    utilisateur.value.prenom != '' &&
    !nomRegex.test(utilisateur.value.prenom)
  ) {
    errors.value.prenom = 'Prenom incorrect';
    return;
  }
  errors.value.mot_de_passe = '';
  if (
    utilisateur.value.mot_de_passe != '' &&
    !mdpRegex.test(utilisateur.value.mot_de_passe)
  ) {
    errors.value.mot_de_passe = 'Mot de passe ne suit pas les regles';
    return;
  }
  errors.value.email = '';
  if (
    utilisateur.value.email !== '' &&
    !emailRegex.test(utilisateur.value.email)
  ) {
    errors.value.email = "Email ne suit pas les regles";
    return;
  }
});
</script>

<style lang="scss" scoped></style>
