import axios from 'axios';

const useProduit = () => {
  const creerProduit = async (produit) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/produits`, produit);
      return result.data.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : error.message);
    }
  };

  const lireProduit = async (id) => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/produits/${id}`);
      return result.data.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : error.message);
    }
  };

  const mettreAJourProduit = async (id, produit) => {
    try {
      const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/produits/${id}`, produit);
      return result.data.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : error.message);
    }
  };

  const supprimerProduit = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/produits/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : error.message);
    }
  };

  const listeProduits = async (page = 1, limit = 10) => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/produits`, {
        params: { page, limit },
      });
      return result.data.produits;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : error.message);
    }
  };

  return { creerProduit, lireProduit, mettreAJourProduit, supprimerProduit, listeProduits };
};

export default useProduit;
