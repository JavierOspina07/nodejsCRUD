import express from 'express'
import db from './utils/database.js'
import Todo from './models/todoModel.js'

Todo

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

// Todo management

// POST => Todos

app.post('/todos', async (req, res) => {
  try {
    const { body } = req
    const todos = await Todo.create(body)
    res.status(201).json(todos)
  } catch (err) {
    res.status(400).json(err)
  }
})

//GET => all Todos

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll()
    res.json(todos)
  } catch (err) {
    res.status(400).json(err)
  }
})

//GET => Todos by id

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todos = await Todo.findByPk(id)
    res.json(todos)
  } catch (err) {
    res.status(400).json(err)
  }
})

//PUT => Todos
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const todos = await Todo.update(body, {
      where: { id },
    })
    res.json(todos)
  } catch (err) {
    res.status(400).json(err)
  }
})

//DEL => Todos
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Todo.destroy({
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


