import express from 'express'
import db from './utils/database.js'
import Note from './models/noteModel.js'

Note

// authenticate and sincronization
const PORT = 8000
db.authenticate()
  .then(() => {
    console.log('Conexion correcta')
  })
  .catch(err => console.log(err))

db.sync()
  .then(() => console.log('base de datos sincronizada'))
  .catch(err => console.log(err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('OK')
})

// Note management

// POST => notes

app.post('/notes', async (req, res) => {
  try {
    const { body } = req
    const note = await Note.create(body)
    res.status(201).json(note)
  } catch (err) {
    res.status(400).json(err)
  }
})

//GET => all Notes

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll()
    res.json(notes)
  } catch (err) {
    res.status(400).json(err)
  }
})

//GET => Notes by id

app.get('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const note = await Note.findByPk(id)
    res.json(note)
  } catch (err) {
    res.status(400).json(err)
  }
})

//PUT => Notes
app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const note = await Note.update(body, {
      where: { id },
    })
    res.json(note)
  } catch (err) {
    res.status(400).json(err)
  }
})

//DEL => Notes
app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Note.destroy({
      where: { id },
    })
    res.status(204).end()
  } catch (err) {
    res.status(400).json(err)
  }
})

// server execution
app.listen(PORT, () => {
  console.log(`Se esta ejecutando el servidor ${PORT}`)
})
