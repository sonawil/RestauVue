<template>
    <tr>
        <td>
            {{ utilisateur.nom }}
        </td>
        <td>
            {{ utilisateur.prenom }}
        </td>
        <td>
            {{ utilisateur.email }}
        </td>
        <td>
            {{ utilisateur.naissance }}
        </td>
        <td>
            <button @click="allerADetail" class="btn btn-primary">Details</button>
            <button @click="allerAEditer" class="btn btn-success">Editer</button>
            <button @click="gererSuppression" class="btn btn-danger">Supprimer</button>
        </td>
    </tr>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    utilisateur: {
        type: Object,
        default: () => ({
            id: '',
            nom: 'test',
            prenom: 'test',
            email: 'email@gmail.com',
            naissance: ''
        })
    }
})

const emit = defineEmits(['supprimer', 'update'])

const gererSuppression = () => {
    emit('supprimer', props.utilisateur.id)
}

const allerADetail = () => {
    router.push(`/detail/${props.utilisateur.id}`)
}

const allerAEditer = () => {
    router.push(`/modifier/${props.utilisateur.id}`)
}
</script>

<style scoped></style>