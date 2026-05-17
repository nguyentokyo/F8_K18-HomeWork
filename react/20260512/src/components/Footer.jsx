
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: theme === "light" ? "#dddddd" : "#111111",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "20px",
        textAlign: "center",
    };

    return (
        <footer style={styles}>
            <p>Bản quyền © 2026</p>
        </footer>
    );
};

export default Footer;