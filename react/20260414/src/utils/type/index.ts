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

interface DialogField {
    id: number
    name: string
    label: string
}

interface Row {
    [key: string]: string | number | null
    id: number
}

interface Customer extends Row {
    id: number
    name: string
    email: string | null
    phone: string | null
    address: string
    rank: string
}

export type {
    LoginResponse,
    LoginAccount,
    ApiResponse,
    Column,
    Row,
    Customer,
    DialogField
}