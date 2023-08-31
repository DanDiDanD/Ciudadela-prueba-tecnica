import axios from 'axios'
import qs from 'qs'
import { type Characters, type Character, type CharactersParams } from './types.m'

const resolvers = {
  Query: {
    character: async (_: undefined, args: { id: string }): Promise<Character> => {
      const { data: character } = await axios<Character>(`https://rickandmortyapi.com/api/character/${args.id}`)
      return character
    },
    characters: async (_: undefined, args: CharactersParams) => {
      const queryParams = qs.stringify({ ...args.filters, page: args.page })
      const { data: characters } = await axios<Characters>(`https://rickandmortyapi.com/api/character/?${queryParams}`)
      return characters
    }
  }
}

export default resolvers
