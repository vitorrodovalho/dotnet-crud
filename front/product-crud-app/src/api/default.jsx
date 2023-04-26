import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (
            error.response &&
            error.response.data &&
            error.response.data.errors
        ) {
            const { errors } = error.response.data;
            const errosArray = [];

            for (let propriedade in errors) {
                errosArray.push(...errors[propriedade]);
            }

            const mensagemErro = errosArray.join('\n');
            throw new Error(mensagemErro);
        } else {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            )
                throw new Error(error.response.data.message);
        }

        throw error;
    }
);

export default api;
