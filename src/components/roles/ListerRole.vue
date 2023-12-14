<template>
  <div>
    <h1>Liste des Rôles</h1>
    <ul>
      <li v-for="role in roles" :key="role.id">
        <router-link :to="{ name: 'details-role', params: { id: role.id } }">{{ role.nom }}</router-link>
        <!-- Ajoutez d'autres informations du rôle au besoin -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import useRole from '../../services/serviceRole';

const roles = ref([]);
const { listerRoles } = useRole();

onBeforeMount(() => {
  listerRoles()
    .then((data) => {
      roles.value = data.roles;
    })
    .catch((err) => console.log(err));
});
</script>

<style lang="scss" scoped></style>
