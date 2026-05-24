import React from 'react'
import FaceExpression from './Features/Expression/Component/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './Auth.router'
import '../src/Features/shares/globels.scss'
import { useContext } from 'react'
import { AuthProvider } from './Features/auth.contex'
import { Songauthcontex } from './Features/Home/Song.contex'


const App = () => {
  return (
    <Songauthcontex>
      <AuthProvider>
        <RouterProvider router={Routers} />
      </AuthProvider>
    </Songauthcontex>

  )
}

export default App


