import React, { use } from 'react'
import '../shares/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'



const Loging = () => {
  
  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function hundleSubmit(e) {
    e.preventDefault()
    await handleLogin({username,email,password})
    navigate('/')
   
  }
  if(loading){
    return <p>Loading...</p>
  }

  return (
    <main>
      <div className="form-contener">
        <h1>Login</h1>
        <form onSubmit={hundleSubmit}>
          <input type="text"
            placeholder='username'
            name='username'
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <input type="email"
            placeholder='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password"
            placeholder='password'
            name='password' value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='submit-btn  whole-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Loging
