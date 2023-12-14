<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Naissance</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <Utilisateur v-for="user in Utilisateurs" :key="user.id" :utilisateur="user"
                @supprimer="recupererSuppression" />
        </tbody>
    </table>
    <button class="btn btn-primary" @click="router.push('/ajouter')">Ajouter un utilisateur</button>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import Utilisateur from './Utilisateur.vue';
//Importer le composable qui a les fonctions du CRUD
import useUtilisateur from '../../services/serviceUtilisateur'
const Utilisateurs = ref([])
import {useRouter} from 'vue-router'
const router = useRouter()
const { getListUtilisateur, supprimerUtilisateur } = useUtilisateur()

onBeforeMount(() => {
    getListUtilisateur().then(data => {
        Utilisateurs.value = data
        console.log('donnee', data)

    })
})

const recupererSuppression = (id) => {
    supprimerUtilisateur(id).then(data => {

        getListUtilisateur().then(data => {
            Utilisateurs.value = data
            console.log('donnee', data)

        }).catch(err => console.log(err.message))

    })

}


</script>

<style lang="scss" scoped></style>