import { createContext } from "react";
import { useState } from "react";
export const songcontex = createContext()

export const Songauthcontex = ({ children }) => {
    const [song, setsong] = useState({
            "songurl": "https://ik.imagekit.io/5oqdhuc8r/songs/Ishq_Vishk_Pyaar_Vyaar__From__Ishq_Vishk_Rebound____DownloadMing.WS__1_BXdFIG1.mp3",
            "posterUrl": "https://ik.imagekit.io/5oqdhuc8r/posters/Ishq_Vishk_Pyaar_Vyaar__From__Ishq_Vishk_Rebound____DownloadMing.WS__Oq8nETHcP.jpg",
            "title": "Ishq Vishk Pyaar Vyaar (From \"Ishq Vishk Rebound\") [DownloadMing.WS]",
            "mood": "surprise",
            "__v": 0

        })
    const [loading, setloading] = useState(false)

    return (
        <songcontex.Provider value={{ song, loading, setsong, setloading }}>
            {children}
        </songcontex.Provider>

    )
}