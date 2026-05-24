import { Login, Register, getuser, logout } from '../../service/auth.api'
import { useContext } from "react";
import { Authcontext } from "../../auth.contex";

export const useAuth = () => {
    const contex = useContext(Authcontext)
    const { user, setUser, loading, setloading } = contex

    async function handleRegister({ username, password, email }) {
        setloading(true)
        const data = await Register({ username, password, email })
        setUser(data.user)
        setloading(false)
    }

    async function handleLogin({ username, password, email }) {
        setloading(true)
        const data = await Login({ username, password, email })
        setUser(data.user)
        setloading(false)
    }

    async function handlegetuser() {
        setloading(true)
        const data = await getuser()
        setUser(data.user)
        setloading(false)
    }

    async function handlelogout() {
        setloading(true)
        const data = await logout()
        setUser(null)
        setloading(false)
    }

    return ({user,loading,handleLogin,handleRegister,handlegetuser,handlelogout})
}