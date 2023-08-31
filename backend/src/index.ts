import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import axios from 'axios'
import express from 'express'
import qs from 'qs'

const app = express()

app.use(express.json())

const PORT = 4800

app.get('/', (req, res) => {
  res.send('Buenas noches, Funciona!')
})

const typeDefs = `#graphql
  type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
  }

  type Character {
    id: Int
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Location
    location: Location
    image: String
    episode: [Episode]!
    created: String
  }

  type Characters {
    info: Info
    results: [Character]
  }

  input FiltersCharacter {
    name: String
    status: String
    species: String
    type: String
    gender: String
  }

  type Location {
    id: Int
    name: String
    type: String
    dimension: String
    residents: [Character]!
    created: String
  }

  type Locations {
    info: Info
    results: [Location]
  }

  input FiltersLocation {
    name: String
    type: String
    dimension: String
  }

  type Episode {
    id: ID
    name: String
    air_date: String
    episode: String
    characters: [Character]!
    created: String
  }

  type Episodes {
    info: Info
    results: [Episode]
  }

  input FiltersEpisode {
    name: String
    episode: String
  }

  type Query {
    character(id: ID!): Character
    characters(page: Int, filters: FiltersCharacter): Characters
  }
`

const resolvers = {
  Query: {
    character: async (_: any, args: any) => {
      const { data: characters } = await axios(`https://rickandmortyapi.com/api/character/${args.id}`)
      return characters
    },
    characters: async (_: any, args: any) => {
      const queryParams = qs.stringify({ ...args.filters, page: args.page })
      const { data: characters } = await axios(`https://rickandmortyapi.com/api/character/?${queryParams}`)
      return characters
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

await server.start()

app.use('/graphql', expressMiddleware(server))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
