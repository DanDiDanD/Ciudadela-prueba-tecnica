import axios from 'axios'
import express from 'express'

const app = express()

app.use(express.json())

const PORT = 4800

app.get('/', (req, res) => {
  res.send('Buenas noches, Funciona!')
})

const typeDeft = `#graphql
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
    origin: Origin
    location: Location
    image: String
    episode: [Episode]!
    created: String
  }
  
  type Characters: {
    info: Info
    results: [Character]
  }

  type FiltersCharacter {
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

  type FiltersLocation {
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

  type FiltersEpisode {
    name: String
    episode: String
  }

  type Query {
    character(id: ID!): Character
  }
`

const resolvers = {
  Query: {
    character: async (_: any, args: any) => {
      const { data: characters } = await axios(`https://rickandmortyapi.com/api/character/${args.id}`)
      return characters
    }
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
