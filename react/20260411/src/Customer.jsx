import { useState , useEffect } from 'react'
import { login, getData , getDataId , createData, updateData, deleteData} from "../plugins/axios.jsx";
import './Customer.css'

function Customer() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const email = "nguyencaocuong@test.com";
            const password = "12345678";

            // create Token
            const loginRes = await login(email, password);
            console.log("Login status:", loginRes);

            // getDate
            const res = await getData("customers");

            if (res.error) {
                console.error("API ERROR:", res.error);
                return;
            }

            // render
            setCustomers(res.data || []);
        };

        fetchData();
    }, []);

    const headers = [
        {
            value: "name",
            text: "Khách hàng",
            style: {
                textAlign: "Center",
            }
        },
        {
            value: "email",
            text: "Liên hệ",
            style: {
                textAlign: "Center",
            }
        },
        {
            value: "phone",
            text: "Số điện thoại",
            style: {
                textAlign: "Center",
            }
        },
        {
            value: "address",
            text: "Địa chỉ",
            style: {
                textAlign: "Center",
            }
        },
        {
            value: "rank",
            text: "Hạng",
            style: {
                textAlign: "Center",
            }
        }
        ,
        {
            value: "action",
            text: "action",
            style: {
                textAlign: "center"
            }
        }

    ]

    const renderHeaders = () => {
        return headers.map((header, index) => (
            <th key={index} style={{ backgroundColor: "#d35400" }}>{header.text} </th>
            )
        )
    }

    const renderBody = () => {
        return customers.map((customer, index) => (
            <tr key={index}>
                {
                    headers.map((header, i) => {
                        if (header.value === "action") {
                            return (
                                <td key={i} style={header.style}>
                                    <button onClick={() => openEditForm(customer)}>Edit</button>
                                    <button onClick={() => onDelete(customer.id)}>Delete</button>
                                </td>
                            )
                        }

                        return (
                            <td key={i} style={header.style}>
                                {customer[header.value]}
                            </td>
                            )
                    }
                    )
                }
            </tr>
        ));
    }

    // Detele Button
    const onDelete = async (id) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn xóa khách hàng này không?");

        if (!isConfirmed) {
            return;
        }

        console.log('delete', id);
        const { error } = await deleteData("customers", id);
        if (error) {
            alert(error);
            return;
        }

        setCustomers(prev =>
            prev.filter(c => c.id !== id)
        );
    };

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        rank: "BRONZE"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,[name]: value
        }));
    };

    const openCreateForm = () => {
        setForm({
            name: "",
            email: "",
            phone: "",
            address: "",
            rank: "BRONZE"
        });
        setEditingId(null);
        setShowModal(true);
    };

    const openEditForm = (customer) => {
        setForm({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            address: customer.address || "",
            rank: customer.rank || "BRONZE"
        });

        setEditingId(customer.id);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        let res;

        if (editingId) {
            res = await updateData("customers", editingId, form);

            console.log('update',res);

            const updatedCustomer = res.data;

            setCustomers(currentList => {
                const newList = [...currentList];

                const index = newList.findIndex(item => item.id === editingId);

                if (index !== -1) {
                    newList[index] = updatedCustomer;
                }

                return newList;
            });

        } else {
            res = await createData("customers", form);

            setCustomers(prev => [...prev, res.data]);
        }

        if (res.error) {
            alert(res.error);
            return;
        }

        // const data = await getData("customers");
        // setCustomers(data.data || []);

        setShowModal(false);
    };

    return (
        <>
            <div>
                <div id="customer-modal-overlay" className="modal" style={{ display: showModal ? "block" : "none" }}>
                    <div className="modal-content">
                        <h3 id="dialog-title">Thêm khách hàng</h3>
                        <div id="customerForm">
                            <input type="text" id="inp-name" placeholder="Tên khách hàng" name="name" value={form.name} onChange={handleChange} />
                            <input type="email" id="inp-email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                            <input type="text" id="inp-phone" placeholder="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} />
                            <input type="text" id="inp-address" placeholder="Địa chỉ" name="address" value={form.address} onChange={handleChange} />
                            <select id="inp-rank" name="rank" value={form.rank} onChange={handleChange}>
                                <option value="BRONZE">-- Chọn hạng --</option>
                                <option value="BRONZE">BRONZE</option>
                                <option value="SILVER">SILVER</option>
                                <option value="GOLD">GOLD</option>
                            </select>
                            <div className="modal-buttons">
                                <button type="button" id="btn-cancel" className="btn-cancel" onClick={() => setShowModal(false)}>Hủy</button>
                                <button type="button" id="btn-submit" className="btn-add" onClick={handleSubmit}> Lưu khách hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br/>
            <h1>CustomerList</h1>
            <br/>
            {
                <button className="btn-add" onClick={() => openCreateForm()}>
                    Thêm khách hàng
                </button>
            }
            <br/>
            <table width='100%' cellPadding={0} cellSpacing={0} border={1}>
                <thead>
                <tr>
                    {renderHeaders()}
                </tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
        </>
    )
}

export default Customer