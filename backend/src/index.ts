import express from 'express'

const app = express()

app.use(express.json())

const PORT = 4800

app.get('/', (req, res) => {
  res.send('Buenas noches, Funciona!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
