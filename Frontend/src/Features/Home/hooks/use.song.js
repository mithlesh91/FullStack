import { getSongs } from "../service/song.api";
import { useContext,useState } from "react";
import { songcontex } from "../Song.contex";

export const useSong = () => {
    const { song, loading, setsong, setloading } = useContext(songcontex)

    const fetchsong = async ({mood})=>{
        setloading(true)
        const data = await getSongs({mood})
        console.log(data)
        setsong(data.allsongs)
        setloading(false)
    }
    return { song, loading, fetchsong }
}