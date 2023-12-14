import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

//Utilisation du token
import useAuthStore from "../stores/auth";
http.interceptors.request.use(config => {
    const { tokenUtilise: token } = useAuthStore()
    config.headers = {
        'Authorization': token ? `Bearer ${token}` : ''
    }

    return config

})

export default http