<template>
    <div>
      <form @submit.prevent="soumettre">
        <div class="mb-3">
          <label for="nom" class="form-label">Nom du rôle</label>
          <input v-model="role.nom" type="text" class="form-control" id="nom">
        </div>
        
  
        <button type="submit" class="btn btn-primary">Mettre à jour Rôle</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  import useRole from '../../services/serviceRole';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const { id } = useRoute().params;
  const { getRoleById, mettreAJourRole } = useRole();
  
  const role = ref({});
  
  onBeforeMount(() => {
    if (id)
      getRoleById(id)
        .then((data) => {
          role.value = data;
        })
        .catch((err) => console.log(err));
  });
  
  const soumettre = () => {
    mettreAJourRole(id, role.value)
      .then(() => {
        router.push('/lister-roles');
      })
      .catch((err) => console.log("Problème lors de la mise à jour d'un rôle", err));
  };
  </script>
  
  <style lang="scss" scoped></style>
  