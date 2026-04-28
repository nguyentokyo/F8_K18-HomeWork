import {SidebarContainer} from "../../components";
import {useEffect} from "react";
import {checkAuth} from "../../../plugins/axios.ts";

function Report() {
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <SidebarContainer />
            <h2>Đây là trang Report</h2>
        </>
    )
}

export default Report;