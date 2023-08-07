import { Button, TextField } from "@mui/material";
import { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { handleSetToken } = useAuth();

    const handleRegister = async () => {
        try {
            const toastId = toast.loading("Loading...");
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/login`, {
                email: email,
                password: password
            });
            toast.dismiss(toastId);
            if (!response) {
                return;
            }
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.user.name);
            handleSetToken(response.data.token);
            // console.log("login response", response);
            toast.success("Login successful");
            navigate("/home");
        } catch (err) {
            console.log("something error in login", err);
        }
    }

    return (
        <div className="w-full h-[90vh]">
            <div className="w-[300px] mx-auto mt-7 flex flex-col gap-4">
                <TextField
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    fullWidth
                    inputProps={{
                        style: { color: "white" }
                    }}
                    InputLabelProps={{
                        style: { color: "white" }
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="text"
                    fullWidth
                    inputProps={{
                        style: { color: "white" }
                    }}
                    InputLabelProps={{
                        style: { color: "white" }
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handleRegister}>Login</Button>
            </div>
        </div>
    )
}

export default Login;