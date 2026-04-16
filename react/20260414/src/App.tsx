import { useState , useEffect } from 'react'
import './App.css'
import {login, getData, updateData, createData, deleteData} from "../plugins/axios.jsx";
import { TableContainer, CustomerDialog  } from './components'
import CreateIcon from '@mui/icons-material/Create'
import {Button, Box, Typography } from "@mui/material";
import type { Column, DialogField , Customer } from "./utils";
import { ToastContainer, toast } from 'react-toastify';

function App() {

    const notify = () => toast("Open Dialog!");

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const email = "nguyencaocuong@test.com";
            const password = "12345678";

            const loginRes = await login({ email, password });

            if (loginRes.error) {
                console.error("Login failed:", loginRes.error);
                return;
            }

            const res = await getData<Customer[]>("customers");
            if (res.data) {
                setCustomers(res.data);
            } else {
                setCustomers([]);
            }
        };

        fetchData();
    }, []);

    const columns: Column[] = [
        {
            value: "name",
            text: "Khách hàng",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "email",
            text: "Liên hệ",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "phone",
            text: "Số điện thoại",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "address",
            text: "Địa chỉ",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "rank",
            text: "Hạng",
            styles: {
                textAlign: "Left",
            }
        }
        ,
        {
            value: "action",
            text: "",
            styles: {
                textAlign: "Left"
            }
        }
    ]

    const DialogFields: DialogField[] = [
        {
            id: 1,
            label: "Khách hàng",
            name: "name"
        },
        {
            id: 2,
            label: "Liên hệ",
            name: "email"
        },
        {
            id: 3,
            label: "Số điện thoại",
            name: "phone"
        },
        {
            id: 4,
            label: "Địa chỉ",
            name: "address"
        },
        {
            id: 5,
            label: "Hạng",
            name: "rank"
        }
    ]

    const FormCustomer: Customer = {
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        rank: 'BRONZE'
    };

    const [isOpenCustomerDialog, setIsOpenDialog] = useState(false)
    const [selectingCustomer, setSelectingCustomer] = useState<Customer | undefined>(undefined)

    const onClickEdit = (customerId: number) => {

        const curS: Customer | undefined = customers.find(s => s.id === customerId)
        setSelectingCustomer(curS)
        setIsOpenDialog(true)
    }

    const onClickDelete = async (customerId: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn xóa khách hàng này không?");

        let customerName: string;
        const curS: Customer | undefined = customers.find(s => s.id === customerId)
        if (curS !== undefined && curS !== null) {
            customerName = curS.name;
        } else {
            customerName = "không có tên";
        }

        if (!isConfirmed) {
            return;
        }

        const { error } = await deleteData("customers", customerId);
        if (error) {
            alert(error);
            return;
        }

        setCustomers(prev =>
            prev.filter(c => c.id !== customerId)
        );

        toast.success(`Đã xóa thành công khách hàng ${customerName}`)
    }


    const openCreate = () => {
        setSelectingCustomer({ ...FormCustomer, id: undefined as any });
        setIsOpenDialog(true);
    };

    const handleChange = (name: string, value: string) => {
        setSelectingCustomer(prev => {
            if (!prev) return prev;
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (formData: Customer) => {
        let res: any;
        if (selectingCustomer && selectingCustomer.id) {
            res = await updateData("customers", selectingCustomer.id, formData);

            if (!res.error && res.data) {
                setCustomers(prev =>
                    prev.map(c => c.id === selectingCustomer.id ? res.data : c)
                );

                toast.success("Cập nhật thành công !!!")
            }
        }
        else {
            // create not id
            const { id, ...dataToCreate } = formData;

            res = await createData("customers", dataToCreate);

            if (!res.error && res.data) {
                setCustomers(prev => [...prev, res.data]);
                toast.success("Đã thêm thành công !!!")
            }
        }

        if (res?.error) {
            alert("Lỗi: " + JSON.stringify(res.error));
        } else {
            setIsOpenDialog(false);
        }
    };

    const JapanClock = () => {
        const [now, setNow] = useState(new Date());

        useEffect(() => {
            const timer = setInterval(() => setNow(new Date()), 1000);
            return () => clearInterval(timer);
        }, []);

        const dateStr = now.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });
        const timeStr = now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo' });

        return (
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#d32f2f'}}>
                <span>日本</span>
                <span>{dateStr}</span>
                <span>{timeStr}</span>
            </h1>
        );
    };

    return (
    <>
        <Box sx={{
            width: '70%',
            marginX: 'auto',
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
        }}>
            <Box><JapanClock /></Box>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                顧客一覧画面
            </Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '70%',
            marginX: 'auto',
            mb: 2
        }}>
            <Button
                variant="contained"
                startIcon={<CreateIcon />}
                color="success"
                onClick={() => {
                    openCreate();
                    notify();
                }}
                sx={{ borderRadius: 2, textTransform: 'none' }}
            >
                Thêm khách hàng
            </Button>
        </Box>

        <TableContainer
            columns={columns}
            rows={customers}
            maxWidth={'70%'}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
        />

        <CustomerDialog
            title={'Dialog Khách Hàng'}
            fields={DialogFields}
            isOpen={isOpenCustomerDialog}
            onClose={() => setIsOpenDialog(false)}
            customer={selectingCustomer}
            form={FormCustomer}
            onChange={handleChange}
            onSave={handleSubmit}
        />
        <ToastContainer />
    </>
  )
}

export default App
