<template>
    <div>
        <form @submit.prevent="connecter">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="loginInfo.email" type="email" class="form-control" id="email">
            </div>
            <div class="mb-3">
                <label for="mdp" class="form-label">Mot de passe</label>
                <input v-model="loginInfo.mot_de_passe" type="password" class="form-control" id="mdp">
            </div>

            <button type="submit" class="btn btn-primary">Se connecter </button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../../services/serviceAuth';
const router = useRouter()
const { login } = useAuth()
const loginInfo = ref({
    email: '',
    mot_de_passe: ''
})

const connecter = () => {
    login(loginInfo.value.email, loginInfo.value.mot_de_passe).then(data => {
        console.log('Connecte!', data)
        router.push('/')
    }).catch(err => console.log(err))
}

</script>

<style lang="scss" scoped></style>