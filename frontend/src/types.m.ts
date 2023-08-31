export interface Data {
  characters: Characters
}

export interface Characters {
  info: Info
  results: Result[]
}

export interface Info {
  count: number
}

export interface Result {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
}

export interface Origin {
  name: string
  dimension: any
}

export interface Location {
  name: string
  dimension: any
}
