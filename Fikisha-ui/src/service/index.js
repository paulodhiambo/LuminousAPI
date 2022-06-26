import jwtInterceptor from "@/service/Interceptor";
const API_BASE_URL=process.env.VUE_APP_API;

export default async function instance(requestType, url, data = null) {
    return jwtInterceptor[requestType](API_BASE_URL+url, data);
}
