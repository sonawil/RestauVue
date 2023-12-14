import axios from "axios";

const useAuth = () => {
    const login = async (email, mot_de_passe) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { email, mot_de_passe })
        return result.data
    }

    return { login }
}

export default useAuth