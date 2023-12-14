
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router"

const useAuthStore = defineStore('auth', () => {

    //Les variables d'etat
    const utilisateur = ref({})
    const token = ref()
    const router = useRouter()

    //Les setters -- fonctions pour changer la valeur des variables d'etat

    const setUtilisateur = user => {
        utilisateur.value = user
    }

    const setToken = unToken => {
        token.value = unToken
    }

    const logout = () => {
        utilisateur.value = null
        token.value = null
        router.push('/login')

    }

    //Les getters -- fonctions qui retournent les valeurs des variables d'etat

    const utilisateurConnecte = computed(() => utilisateur.value)
    const tokenUtilise = computed(() => token.value)

    return {utilisateur,token,setToken, setUtilisateur,utilisateurConnecte,tokenUtilise, logout}
},
{
    persist:true
}
)

export default useAuthStore