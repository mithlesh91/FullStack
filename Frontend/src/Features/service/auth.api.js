import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:3000/auth',
    withCredentials: true
})

export async function Login({ username, email, password }) {
    const response = await Api.post('/login', {username,email,password})
    return response.data
}

export async function Register({ username, email, password }) {
    const response = await Api.post('/register', {username,email,password})
    return response.data
}

export async function getuser() {
    const response = await Api.get('/getuser')
    return response.data
}

export async function logout() {
    const response = await Api.get('/logout')
    return response.data
}