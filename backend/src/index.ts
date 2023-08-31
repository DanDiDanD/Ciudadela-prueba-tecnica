import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
const app = express()

app.use(express.json())

const PORT = 4800

app.get('/', (req, res) => {
  res.send('Buenas noches, Funciona!')
})

const server = new ApolloServer({
  typeDefs,
  resolvers
})

await server.start()

app.use('/graphql', expressMiddleware(server))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
