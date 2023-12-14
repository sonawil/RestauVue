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

      <button type="submit" class="btn btn-primary">Mettre à jour </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watchEffect } from 'vue';
import useUtilisateur from '../../services/serviceUtilisateur';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const { id } = useRoute().params;
const { getUtilisateurParId, mettreAJourUtilisateur } = useUtilisateur();

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

onBeforeMount(() => {
  if (id)
    getUtilisateurParId(id)
      .then((data) => {
        utilisateur.value = data;
      })
      .catch((err) => console.log(err));
});

const soumettre = () => {
  // Ne pas soumettre le formulaire si tous les champs ne sont pas valides
  if (!valider(utilisateur.value)) return;

  mettreAJourUtilisateur(id, utilisateur.value)
    .then(() => {
      router.push('/');
    })
    .catch((err) => console.log("Problème lors de la mise à jour de l'utilisateur", err));
};

// ... fonctions de validation ...

</script>

<style lang="scss" scoped></style>
