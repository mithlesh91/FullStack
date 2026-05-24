import React from 'react'
import FaceExpression from '../../Expression/Component/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/use.song'

const Home = () => {
  const {fetchsong} = useSong()
  return (
   <>
   <FaceExpression
    onClick={(expression)=>{fetchsong({mood: expression})}}
    />

    <Player/>
   </>
  )
}

export default Home
