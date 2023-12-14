//importer axios
import axios from 'axios'
//Creation du composable

const useUtilisateur = () => {

    //Lire les donnees du serveur
    const getListUtilisateur = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/utilisateurs`)
        return result.data.data

    }

    const getUtilisateurParId = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/utilisateurs/${id}`)
        return result.data.data

    }

    const ajouterUtilisateur = async (utilisateur) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/utilisateurs`,utilisateur)
        return result.data.data

    }
    const supprimerUtilisateur = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/utilisateurs/${id}`)
        return result.data.data

    }
    const editerUtilisateur = async (id, utilisateur) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/utilisateurs/${id}`, utilisateur)
        return result.data.data

    }

    return { getListUtilisateur, getUtilisateurParId,ajouterUtilisateur,supprimerUtilisateur, editerUtilisateur }
}

export default useUtilisateur