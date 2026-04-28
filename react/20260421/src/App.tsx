import './App.css'
import { TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { TableContainer } from "./components";
import type {Column} from "./utils";
import {useState, useMemo} from "react";
import * as React from "react";
import {v7} from "uuid";

const productNames = ['Quần áo', 'Giày dép', 'Điện thoại', 'Laptop', 'Tai nghe', 'Balo']

const customerNames = [
  'Nguyễn Văn A',
  'Trần Thị B',
  'Lê Văn C',
  'Phạm Thị D',
  'Hoàng Văn E',
  'Vũ Thị F',
  'Đặng Văn G',
  'Bùi Thị H',
  'Đỗ Văn I',
  'Phan Thị K'
]

const columns: Column[] = [
  { text: 'Mã đơn', value: 'id' },
  { text: 'Tên khách hàng', value: 'customerName' },
  { text: 'Tên sản phẩm', value: 'productName' },
  { text: 'Giá', value: 'price' },
  { text: 'Ngày đặt hàng', value: 'orderDate' },
  { text: 'Số lượng', value: 'quantity' }
]

const getRandomOrder = () => {
  const randomDate = new Date(
    2026,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  )

  return {
    id: v7(),
    customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
    productName: productNames[Math.floor(Math.random() * productNames.length)],
    price: Math.floor(Math.random() * 5000000) + 100000, // 100k -> 5tr
    orderDate: randomDate.toISOString().split('T')[0],
    quantity: Math.floor(Math.random() * 10) + 1
  }
}

const tmpOrders = Array.from({ length: 20 }, (_) => {
  return getRandomOrder()
})

function App() {
  const [searchStr, setSearchStr] = useState<string>('')
  const [isOpen, setIsOpem] = useState(false)
  const [orders, setOrders] = useState([...tmpOrders])

  const handleClose = () => setIsOpem(!isOpen)

  const onAddOrder = () => {
    const newOrder = getRandomOrder()
    setOrders([...orders, newOrder])
  }

  // const totalAmount = () => {
  //   return orders.reduce((a, b) => {
  //     return a + b.price
  //   }, 0)
  // }

    const [dateFrom, setDateFrom] = useState<Dayjs | null>(null)

    const [dateTo, setDateTo] = useState<Dayjs | null>(null)

    const filteredOrders = useMemo(() => {

        return orders.filter(order => {

            const matchSearch =
                order.customerName
                    .toLowerCase()
                    .includes(searchStr.toLowerCase())

                ||

                order.productName
                    .toLowerCase()
                    .includes(searchStr.toLowerCase())

            const orderDate = dayjs(order.orderDate)

            const matchDateFrom =
                !dateFrom ||
                orderDate.isAfter(dateFrom.subtract(1, 'day'))

            const matchDateTo =
                !dateTo ||
                orderDate.isBefore(dateTo.add(1, 'day'))

            return (
                matchSearch &&
                matchDateFrom &&
                matchDateTo
            )

        })

    }, [orders, searchStr, dateFrom, dateTo])


  const totalAmount = useMemo(
    () => {
      console.log('redetf')
      return filteredOrders.reduce((a, b) => {
        return a + b.price
      }, 0)
    },
    [filteredOrders]
  )



  return (
    <>
      <Box sx={{maxWidth: 800, margin: 'auto'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                      label="From"
                      value={dateFrom}
                      format="YYYY-MM-DD"
                      onChange={(newValue) => setDateFrom(newValue)}
                  />

                  <DatePicker
                      label="To"
                      value={dateTo}
                      format="YYYY-MM-DD"
                      onChange={(newValue) => setDateTo(newValue)}
                  />
              </DemoContainer>
          </LocalizationProvider>

        <Button onClick={onAddOrder}>Add order</Button>
        <Button onClick={() => setIsOpem(true)}>Open POPUP</Button>
        <TextField
          value={searchStr}
          label="Outlined"
          variant="outlined"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchStr(e.target.value)}
        />
        <Box>
          <p>Tong Tien La: {totalAmount}</p>
        </Box>
        <TableContainer columns={columns} rows={filteredOrders} maxWidth={800}/>

        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          role="alertdialog"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Disagree
            </Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </Box>

    </>
  )
}

export default App
