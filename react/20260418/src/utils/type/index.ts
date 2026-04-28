interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface LoginAccount {
    email: string;
    password?: string; // Thêm password vào đây
}

interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

interface Style {
    [key: string]: string;
}

interface Column {
    value: string
    text: string
    styles?: Style
}

// interface DialogField {
//     id: number
//     name: string
//     label: string
// }
interface DialogField {
    id: number
    label: string
    name: string
    type?: 'text' | 'number' | 'select'
    options?: {
        value: number | string
        label: string
    }[]
}


interface Row {
    id: number
    [key: string]: string | number | null | any;
}

interface Customer extends Row {
    id: number
    name: string
    email: string | null
    phone: string | null
    address: string
    rank: string
}

interface Category {
    id: number
    name: string
}

interface Product extends Row {
    sku: string | null;
    name: string;
    price: number;
    remaining: number;
    categoryId: number | null;
    category?: {
        id: number;
        name: string;
    };
}

interface Option {
    value: number | string;
    label: string;
}

export type {
    LoginResponse,
    LoginAccount,
    ApiResponse,
    Column,
    Row,
    Customer,
    DialogField,
    Product,
    Category,
    Option
}