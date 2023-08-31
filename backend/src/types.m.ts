export type Info = {
  count: number
  pages: number
  next: string
  prev: number
}

export type Character = {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: Episode[]
  created: string
}

export type Characters = {
  info: Info
  results: Character[]
}

export type CharacterLocation = {
  id: string
  name: string
  type: string
  dimension: string
  residents: Character[]
  created: string
}

export type Episode = {
  id: string
  name: string
  air_date: string
  episode: string
  characters: Character[]
  created: string
}

export type CharactersParams = {
  page: number | string
  filters: {
    name: string
    status: string
    species: string
    type: string
    gender: string
  }
}
