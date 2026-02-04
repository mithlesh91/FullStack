import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [note, setnote] = useState([])

  console.log("hello intergrasation")

  function fatchnotes() {
    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setnote(res.data.newNotes)
      })
  }

  useEffect(() => {
    fatchnotes();
  }, [])

  function formhandler(e) {
    e.preventDefault()
    const { title, discription } = e.target.elements;
    console.log(title.value, discription.value)

    axios.post('http://localhost:3000/notes', {
      title: title.value,
      discription: discription.value
    })
      .then(res => {
        console.log(res.data)
        fatchnotes()
      })
  };

  function handledelete(noteId) {
    axios.delete("http://localhost:3000/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fatchnotes()
    })
  }



  return (
    <>
      <form className="notes-form" onSubmit={formhandler}>
        <input type="text" name='title' placeholder='etnter title' />
        <input type="text" name="discription" placeholder='enter discription' />
        <button>create notes</button>
      </form>

      <div className="notes">
        {
          note.map((notes) => {
            return <div className="note">
              <h1>{notes.title}</h1>
              <p>{notes.discription}</p>
              <button onClick={() => { handledelete(notes._id) }}>Delete</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App
