import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");

/* CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost',
    headers: {
        'Content-Type' : 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
});

/* LOGIN API */
export const login = async ({ username, password }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/api/v1/auth/login`, data);
    return response;
}

/* SIGNUP API */
export const signUp = async ({ username, password }) => {
    const data = { username, password };
    const response = await AuthApi.post(`/api/v1/auth/signup`, data);
    return response.data;
}