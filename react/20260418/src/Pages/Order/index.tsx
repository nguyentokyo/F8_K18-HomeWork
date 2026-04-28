import {SidebarContainer} from "../../components";
import {useEffect} from "react";
import {checkAuth} from "../../../plugins/axios.ts";

function Order() {

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
        <SidebarContainer />
            <h2>Đây là trang order</h2>
        </>
    )
}

export default Order;