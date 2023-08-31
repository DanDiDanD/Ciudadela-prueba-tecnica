'use client'

import { type Data } from '@/types.m'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Avatar } from '@mui/material'
import Image from 'next/image'
export const dynamic = 'force-dynamic'

const query = gql`
query {
  characters (filters: { species: "HUMAN" }){
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
  const { data: { characters } } = useSuspenseQuery<Data>(query)

  return (

    <div>
      <TableContainer
        component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Especie</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Origen</TableCell>
              <TableCell>Localización</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.results.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Avatar >
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image src={row.image} alt={row.name} layout="fill" />
                    </div>
                  </Avatar>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.species}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.type || '--'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.gender}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.origin.name + ' ' + `${row.origin.dimension ? `| ${row.origin.dimension}` : ''}`}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.location.name + ' ' + `${row.location.dimension ? `| ${row.location.dimension}` : ''}`}
                </TableCell>

              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}
