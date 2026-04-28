import { useState , useEffect } from 'react'
import { checkAuth, getData, updateData, createData, deleteData} from "../../../plugins/axios.jsx";
import { TableContainer, CommonDialog, SidebarContainer  } from '../../components'
import CreateIcon from '@mui/icons-material/Create'
import {Button, Box, Typography } from "@mui/material";
import type { Column, DialogField , Product, Category } from "../../utils";
import { ToastContainer, toast } from 'react-toastify';



function Product() {

    const notify = () => toast("Open Dialog!");

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getData<Category[]>("categories");
            if (res.data) setCategories(res.data);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {

            const res = await getData<Product[]>("products");
            if (res.data) {
                const mapped = res.data.map(p => ({
                    ...p,
                    categoryId: p.category?.id ?? null,
                    categoryName: p.category?.name ?? ''
                }));

                setProducts(mapped);
            } else {
                setProducts([]);
            }
        };

        fetchData();
    }, []);

    const columns: Column[] = [
        {
            value: "categoryName",
            text: "Danh mục",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "sku",
            text: "Mã sản phẩm",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "name",
            text: "Tên sản phẩm",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "price",
            text: "Giá bán",
            styles: {
                textAlign: "Left",
            }
        },
        {
            value: "remaining",
            text: "Tồn kho",
            styles: {
                textAlign: "Left",
            }
        },
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
            label: "Danh mục",
            name: "categoryId",
            type: "select",
            options: categories.map(c => ({
                value: c.id,
                label: c.name
            }))
        },
        {
            id: 2,
            label: "Mã sản phẩm",
            name: "sku"
        },
        {
            id: 3,
            label: "Tên sản phẩm",
            name: "name"
        },
        {
            id: 4,
            label: "Giá bán",
            name: "price"
        },
        {
            id: 5,
            label: "Tồn kho",
            name: "remaining"
        }
    ]

    const FormProduct: Product = {
        id: 0,
        sku: '',
        name: '',
        price: 0,
        remaining: 0,
        categoryId: null
    };

    const [isOpenProductDialog, setIsOpenDialog] = useState(false)
    const [title, setTitle] = useState('Thêm Sản Phẩm')
    const [selectingProduct, setSelectingProduct] = useState<Product>(FormProduct)

    const onClickEdit = (productId: number) => {

        const curS: Product | undefined = products.find(s => s.id === productId)
        if (!curS) return;

        setSelectingProduct(curS)
        setTitle("Chỉnh sửa sản phẩm");
        setIsOpenDialog(true)
    }

    const onClickDelete = async (productId: number) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn xóa san phẩm này không?");

        let productName: string;
        const curS: Product | undefined = products.find(s => s.id === productId)
        if (curS !== undefined && curS !== null) {
            productName = curS.name;
        } else {
            productName = "không có tên";
        }

        if (!isConfirmed) {
            return;
        }

        const { error } = await deleteData("products", productId);
        if (error) {
            alert(error);
            return;
        }

        setProducts(prev =>
            prev.filter(c => c.id !== productId)
        );

        toast.success(`Đã xóa thành công sản phẩm ${productName}`)
    }


    const openCreate = () => {
        setSelectingProduct({ ...FormProduct, id: undefined as any });
        setTitle("Thêm sản phẩm");
        setIsOpenDialog(true);
    };

    const mapProduct = (p: any): Product => ({
        ...p,
        categoryId: p.category?.id ?? p.categoryId ?? null,
        categoryName:
            p.category?.name ??
            categories.find(c => c.id === p.categoryId)?.name ??
            ''
    });

    // const handleChange = (name: string, value: string) => {
    //     setSelectingProduct(prev => {
    //         if (!prev) return prev;
    //         return { ...prev, [name]: value };
    //     });
    // };
    const handleChange = (
        name: string,
        value: string | number | null
        ) => {
            setSelectingProduct(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    [name]: value
                };
            });
    };

    const handleSubmit = async (formData: Product) => {
        let res: any;

        console.log(formData);

        if (selectingProduct && selectingProduct.id) {
            res = await updateData("products", selectingProduct.id, formData);

            if (!res.error && res.data) {
                setProducts(prev =>
                    prev.map(c => c.id === selectingProduct.id ? mapProduct(res.data) : c)
                );

                toast.success("Cập nhật thành công !!!")
            }
        }
        else {
            // create not id
            const { id, ...dataToCreate } = formData;

            res = await createData("products", dataToCreate);

            if (!res.error && res.data) {
                setProducts(prev => [...prev, mapProduct(res.data)]);
                toast.success("Đã thêm thành công !!!")
            }
        }

        if (res?.error) {
            alert("Lỗi: " + JSON.stringify(res.error));
        } else {
            setIsOpenDialog(false);
        }
    };

    return (
        <>
            <SidebarContainer />
            <Box sx={{
                width: '70%',
                marginX: 'auto',
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    Product Page
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
                    {title}
                </Button>
            </Box>

            <TableContainer
                columns={columns}
                rows={products}
                maxWidth={'70%'}
                onClickEdit={onClickEdit}
                onClickDelete={onClickDelete}
            />
            {/*onChange: (name: string) => (value: (number | string)) => void*/}
            <CommonDialog
                title={title}
                fields={DialogFields}
                isOpen={isOpenProductDialog}
                onClose={() => setIsOpenDialog(false)}
                data={selectingProduct}
                onChange={handleChange}
                onSave={handleSubmit}
            />
            <ToastContainer />
        </>
    )
}

export default Product