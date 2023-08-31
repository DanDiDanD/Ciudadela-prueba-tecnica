'use client'

import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

export const dynamic = 'force-dynamic'

const query = gql`
query {
  characters (page: 1, filters: { species: "HUMAN" }){
    info {
      count
    }
    results {
      id
      name
      status
      species
      type
      gender
      origin {
        name dimension
      }
      location {
        name dimension
      }
      image
    } 
  }
}
`

export default function Home(): JSX.Element {
  const { data: characters } = useSuspenseQuery(query)

  return (

    <div>
      {JSON.stringify(characters)}

    </div>
  )
}
