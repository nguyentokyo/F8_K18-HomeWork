
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "20px",
        borderBottom: "1px solid #ccc",
    };

    return (
        <header style={styles}>
            <h1>Ứng dụng Đọc Sách</h1>

            <button onClick={toggleTheme}>
                Chuyển đổi giao diện
            </button>
        </header>
    );
};

export default Header;