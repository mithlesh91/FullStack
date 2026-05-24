import {createBrowserRouter} from 'react-router-dom'
import Loging from './Features/Auth/pages/Loging'
import Register from './Features/Auth/pages/Register'
import Home from './Features/Home/Pages/Home'
import Protected from './Features/Auth/components/Protected'
 
 export const Routers = createBrowserRouter([
    {
        path:'/login',
        element:<Loging />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/',
        element:<Protected><Home /></Protected>
    }
])