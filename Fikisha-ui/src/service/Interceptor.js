import axios from "axios";
import {apiBaseUrl} from "@/environment";
const config = {
    baseURL: apiBaseUrl,
};
const jwtInterceptor = axios.create(config);
let token=localStorage.getItem('Fikisha_token');
const authInterceptor = (config) => {
    if (token) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('Fikisha_token')}`;
    }
    config.headers.common.Accept = "Application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
};
jwtInterceptor.interceptors.request.use(authInterceptor);

jwtInterceptor.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        // Logout if unauthenticated
        if (error.response.status === 401) return;

        const errorMessage = error.response.data.message;
        error.response.data.message =
            errorMessage.length > 160
                ? JSON.parse(errorMessage.split("code :").pop())
                    .error.message.split(":")[0]
                    .split("CorrelationId")[0]
                : errorMessage;
        throw error;
    }
);

export default jwtInterceptor
