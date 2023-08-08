import { Button, TextField } from "@mui/material";
import { useState } from 'react';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const [showOtpDiv, setShowOtpDiv] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (name === "" || email === "" || password === "") {
                toast.error("Please fill all the fields");
                return;
            }
            const toastId = toast.loading("Sending Otp...");
            await axios.post(`${import.meta.env.VITE_BASE_URL}auth/sendOtp`, { email: email });
            // console.log("Otp response: " + response);
            toast.dismiss(toastId);
            setShowOtpDiv(true);
        } catch (e) {
            console.log("Error while sending OTP", e);
            toast.error("signup failed");
            return;
        }
    }

    const handleVerify = async () => {
        try {
            const toastId = toast.loading("Loading...");
            // console.log("Data", name, email, password, otp);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/signup`, {
                name: name,
                email: email,
                password: password,
                otp: otp
            });
            // console.log("Response of singup", response);
            toast.dismiss(toastId);
            if (response.status === 200) {
                toast.success("Successfully signed up");
                navigate('/login');
            }
        } catch (e) {
            console.log("something went wrong", e);
            toast.error("signup failed");
            return;
        }
    }

    return (
        <div className="w-full h-[90vh]">
            {
                showOtpDiv === false ?
                    (
                        <div className="w-[300px] mx-auto mt-7 flex flex-col gap-4">
                            <TextField
                                id="outlined-password-input"
                                label="Name"
                                type="text"
                                fullWidth
                                inputProps={{
                                    style: { color: "white" }
                                }}
                                InputLabelProps={{
                                    style: { color: "white" }
                                }}
                                onChange={(e) => setName(e.target.value)}
                            />
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
                            <Button variant="contained" onClick={handleRegister}>Register</Button>
                            <div className="flex gap-3 items-center">
                                <p className="text-white text-[14px]">If already Signup</p>
                                <Link to={'/login'}>
                                    <span className="text-indigo-600 underline">Login</span>
                                </Link>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="w-[300px] mx-auto mt-7 flex flex-col gap-4">
                            <TextField
                                id="filled-password-input"
                                label="Enter OTP"
                                type="number"
                                variant="filled"
                                fullWidth
                                inputProps={{
                                    style: { color: "white" }
                                }}
                                InputLabelProps={{
                                    style: { color: "white" }
                                }}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <Button variant="contained" onClick={handleVerify}>Verify</Button>
                        </div>
                    )
            }


        </div>
    )
}

export default Signup;