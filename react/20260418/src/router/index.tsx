import { createBrowserRouter } from "react-router";
import LoginPage from '../Pages/Login'
import HomePage from '../Pages/Home'
import {Customer as CustomerPage} from '../Pages/Customer'
import ProductPage from '../Pages/Product'
import OrderPage from '../Pages/Order'
import ReportPage from '../Pages/Report'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/customer",
        element: <CustomerPage />
    },
    {
        path: "/product",
        element: <ProductPage />
    },
    {
        path: "/order",
        element: <OrderPage />
    },
    {
        path: "/report",
        element: <ReportPage />
    }
]);

export default router;

