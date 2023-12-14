import axios from 'axios';

const useRole = () => {
  const listerRoles = async () => {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/roles`);
    return result.data.roles; // Assurez-vous que le serveur renvoie les données correctement
  };

  const getRoleParId = async (id) => {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/roles/${id}`);
    return result.data.data;
  };

  const ajouterRole = async (role) => {
    const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/roles`, role);
    return result.data.data;
  };

  const supprimerRole = async (id) => {
    const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/roles/${id}`);
    return result.data.data;
  };

  const editerRole = async (id, role) => {
    const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/roles/${id}`, role);
    return result.data.data;
  };

  return { listerRoles, getRoleParId, ajouterRole, supprimerRole, editerRole };
};

export default useRole;
