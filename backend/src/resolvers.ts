import axios from 'axios'
import qs from 'qs'

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

export default resolvers
