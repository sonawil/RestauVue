// Importer axios ou utiliser un fichier personnalisé comme axiosAPI
// import axios from 'axios';
import http from "./axiosAPI";

// Création du composable pour les utilisateurs
const useUtilisateur = () => {
  // Fonctions pour lire, ajouter, supprimer et éditer des utilisateurs
  const getListUtilisateur = async () => {
    const result = await http.get(`/utilisateurs`);
    return result.data.utilisateurs;
  };

  const getUtilisateurParId = async (id) => {
    const result = await http.get(`/utilisateurs/${id}`);
    return result.data.data;
  };

  const ajouterUtilisateur = async (utilisateur) => {
    const result = await http.post(`/utilisateurs`, utilisateur);
    return result.data.data;
  };

  const supprimerUtilisateur = async (id) => {
    const result = await http.delete(`/utilisateurs/${id}`);
    return result.data.data;
  };

  const editerUtilisateur = async (id, utilisateur) => {
    const result = await http.put(`/utilisateurs/${id}`, utilisateur);
    return result.data.data;
  };

  return {
    getListUtilisateur,
    getUtilisateurParId,
    ajouterUtilisateur,
    supprimerUtilisateur,
    editerUtilisateur,
  };
};

export default useUtilisateur;
