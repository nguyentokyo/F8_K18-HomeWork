
import { SidebarContainer } from '../../components'
import {useEffect} from "react";
import {checkAuth} from "../../../plugins/axios.ts";

function Home() {

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <SidebarContainer />
            <h1>Đây là trang homePage</h1>
        </>
    )
}

export default Home
