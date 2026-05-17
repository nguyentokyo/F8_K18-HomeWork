
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Content = () => {
    const { theme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: theme === "light" ? "#f5f5f5" : "#222222",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "30px",
        minHeight: "300px",
    };

    return (
        <main style={styles}>
            <h2>Nội dung sách</h2>
            <p>
                Đây là một ứng dụng đọc sách đơn giản sử dụng React Context API.
            </p>
            <p>
                Người dùng có thể chuyển đổi giữa Light Mode và Dark Mode.
            </p>
            <p>
                useContext giúp chia sẻ dữ liệu giữa các component mà không cần truyền props.
            </p>
        </main>
    );
};

export default Content;