// import React from 'react'
import { useAuth } from "../store/auth";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Home = () => {

    const [day, setDay] = useState("");
    const [work, setWork] = useState("");
    const { handleSetToken } = useAuth();
    const navigate = useNavigate();

    const SubmitHandler = async () => {
        try {
            const toastId = toast.loading("Submitting Work...");
            await axios.post(`${import.meta.env.VITE_BASE_URL}todo/createTodo`, {
                day: day,
                todo: work,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            toast.dismiss(toastId);
            // console.log("todo created", response);
            toast.success("Work Submitted");
            navigate("/todo");
        } catch (err) {
            console.log("Something error", err);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem("name");
        handleSetToken("");
        toast.success("Logout Success");
        navigate('/login');
    }


    return (
        <div className="w-[300px] h-screen mx-auto flex flex-col gap-4 items-center">
            {/* <p className="mt-[8rem]"></p> */}
            <p className="text-white my-3 text-xl lg:text-3xl">{`Welcome ${localStorage.getItem("name")} 👋`}</p>
            <Button variant="contained" onClick={handleLogout}>LogOut</Button>
            <h1 className="text-white lg:text-2xl lg:font-bold">Daily Routine</h1>
            <TextField id="filled-basic" label="Day" variant="filled" fullWidth
                inputProps={{
                    style: { color: "white" }
                }}
                onChange={(e) => setDay(e.target.value)}
            />

            <div className="w-[300px]">
                <textarea onChange={(e) => setWork(e.target.value)} rows={6} name="textarea" id="work" className="w-full bg-bodyColor border-black border-[2px] text-white font-semibold p-2" />

            </div>

            <Button variant="outlined" onClick={SubmitHandler}>Submit</Button>

        </div>
    )
}

export default Home;