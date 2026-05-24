import { useState, createContext } from "react";

export const Authcontext = createContext()

export const AuthProvider =({children})=>{
    const [user, setUser] = useState(null)
   const [loading, setloading] = useState(false)

   return(
    <Authcontext.Provider value={{user,setUser,loading,setloading}}>
      {children}
    </Authcontext.Provider>
   )
   
}