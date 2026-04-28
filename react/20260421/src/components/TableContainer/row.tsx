import {memo} from 'react'
import {TableRow, TableCell} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import type {Column, Row} from "../../utils"

interface Props {
  columns: Column[]
  row: Row
  onClickEdit?: (id: number | string) => void
  onClickDelete?: (id: number | string) => void
}

const Row = ({row, columns, onClickEdit, onClickDelete}: Props) => {

  const onEdit = (id: number | string) => {
    onClickEdit && onClickEdit(id)
  }

  const onDelete = (id: number | string) => {
    onClickDelete && onClickDelete(id)
  }

  return (
    <TableRow key={row.id}>
      {
        columns.map(column => {
          if (column.value === 'action') {
            return (
              <TableCell>
                <EditOutlinedIcon sx={{padding: '4px'}} color={'success'} onClick={() => onEdit(row.id)}/>
                <DeleteIcon sx={{padding: '4px'}} color={'error'} onClick={() => onDelete(row.id)}/>
              </TableCell>
            )
          }
          return <TableCell style={column.style} key={column.value}>{row[column.value]}</TableCell>
        })
      }
    </TableRow>
  )
}

export default memo(Row)