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

export default typeDefs
