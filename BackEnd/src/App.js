const express =require('express')
const madam = require('./modules/note.modules')
const cors = require('cors')
const path = require("path")


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))


app.post("/notes", async (req,res)=>{
    const {title,discription} = req.body

    const newNotes = await madam.create({
        title,discription
    })
    res.status(201).json({
        message:"notes is created",
        newNotes
    })
})

app.get('/notes',async (req,res)=>{

    const newNotes = await madam.find()
    res.status(200).json({
        message:"data is fatch",
        newNotes
    })
})


app.delete('/notes/:id',async (req,res)=>{
    const id = req.params.id
    const newNotes = await madam.findByIdAndDelete(id)
    res.status(200).json({
        message:'notes is deleted',
        newNotes
    })
})

app.patch("/notes/:id", async (req,res)=>{
    const id = req.params.id
    const newNotes = await madam.findByIdAndUpdate(id,{discription})

    res.status(200).json({
        message:"notes is update",
        newNotes
    })
})
 


app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
    // res.send("this is wild card")
})


module.exports=app