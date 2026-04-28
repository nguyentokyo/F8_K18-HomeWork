import {
  Table, TableHead, TableCell, TableRow, TableBody
} from '@mui/material'
import type {Column, Row} from "../../utils"
import {memo} from 'react'
import FRow from './row.tsx'

interface Props {
  columns: Column[]
  rows: Row[]
  maxWidth?: number | string
  onClickEdit?: (id: number) => void
  onClickDelete?: (id: number) => void
}

const TableContainer = ({columns, rows, maxWidth, onClickEdit, onClickDelete}: Props) => {

  return (
    <>
      <Table sx={{ maxWidth: maxWidth, margin: 'auto' }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((column) => {
                return <TableCell style={column.style} key={column.value}>{column.text}</TableCell>
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(row => {
              return (
                <FRow
                  row={row}
                  columns={columns}
                  onClickEdit={onClickEdit}
                  onClickDelete={onClickDelete}
                />
              )
            })
          }
        </TableBody>
      </Table>
    </>
  )
}

export default memo(TableContainer)