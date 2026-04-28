import { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Divider} from '@mui/material';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";


const SidebarContainer = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const categories = [
        { id:1, path: '/', icon: <HomeIcon/>, text: 'Tổng quan', name: 'home' },
        { id:2, path: '../product', icon: <InventoryIcon/>, text: 'Sản phẩm', name: 'product' },
        { id:3, path: '../order', icon: <ShoppingCartIcon/>, text: 'Đơn hàng', name: 'order' },
        { id:4, path: '../customer', icon: <AccountBoxIcon/>, text: 'Khách hàng', name: 'customer' },
        { id:5, path: '../report', icon: <InsertChartIcon/>, text: 'Báo cáo', name: 'report' }
    ];

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {
                    categories.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton component={RouterLink} to={item.path}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
            <List sx={{ marginTop: 'auto' }}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            console.log("đăng xuất...");
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("refreshToken");
                            navigate("/login")
                        }}
                        sx={{
                            color: 'error.main',
                            '& .MuiListItemIcon-root': {
                                color: 'error.main'
                            }
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Đăng Xuất'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default SidebarContainer;