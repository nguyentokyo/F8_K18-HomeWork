
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useState} from "react";
import { login } from "../../../plugins/axios.jsx";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

interface UserInfo {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        password: "",
    })


    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input", e.target.name, e.target.value);
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const onSignIn = async () => {
        try {
            const loginRes = await login(userInfo);

            if (loginRes.error) {
                console.error("Login failed:", loginRes.error);
                return;
            }

            navigate("/")
        }
        catch (e) {
            toast.error("user or pass is incorrect")
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, mt: 8, borderRadius: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <Box component="form" sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            value={userInfo.email}
                            name={'email'}
                            onChange={onInput}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            value={userInfo.password}
                            name={'password'}
                            type="password"
                            onChange={onInput}
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            onClick={onSignIn}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid size={12}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid size={12}>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;