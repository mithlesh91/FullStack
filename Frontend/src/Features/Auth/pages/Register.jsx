import React, { useEffect, useState } from 'react'
import '../shares/form.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'



const Register = () => {
    const {loading,handleRegister} = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate('/login')
    }
    if(loading){
            return <p>Loading...</p>
        }

    return (
        <main>
            <div className="form-contener">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder='username'
                        name='username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <input type="email"
                        placeholder='email'
                        name='email' 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    <input type="password"
                        placeholder='password'
                        name='password' 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    <button className='submit-btn  whole-button'>Register</button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </main>
    )
}

export default Register
