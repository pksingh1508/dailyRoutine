// import {useEffect} from 'react'
// import { useAuth } from "../store/auth";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const UpdateTodo = () => {

  const [day, setDay] = useState("");
  const [work, setWork] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const getOneTodoData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}todo/getOneTodo/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    // console.log(response);
    setDay(response.data.message.day);
    setWork(response.data.message.todo);
  }

  useEffect(() => {
    getOneTodoData();
  }, [])

  const SubmitHandler = async () => {
    try {
      const toastId = toast.loading("Submitting Work...");
      await axios.put(`${import.meta.env.VITE_BASE_URL}todo/updateTodo/${id}`, {
        day: day,
        todo: work,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      toast.dismiss(toastId);
      // console.log("todo created", response);
      toast.success("Work Updated");
      navigate("/todo");
    } catch (err) {
      console.log("Something error", err);
    }
  }

  return (
    <div className="w-[300px] mx-auto h-[92vh]  lg:h-screen flex flex-col gap-4 items-center bg-bodyColor">
      {/* <p className="mt-[10rem]"></p> */}
      <h1 className="text-white lg:text-3xl lg:font-bold">Update Routine</h1>
      <TextField id="filled-basic" label="Day" variant="filled" value={day} fullWidth
        inputProps={{
          style: { color: "white" }
        }}
        onChange={(e) => setDay(e.target.value)}
      />

      <div className="w-[300px]">
        <textarea onChange={(e) => setWork(e.target.value)} rows={6} name="textarea" value={work} id="work" className="w-full bg-bodyColor border-black border-[2px] text-white font-semibold p-2" />

      </div>

      <Button variant="outlined" onClick={SubmitHandler}>Update</Button>

    </div>
  )
}

export default UpdateTodo;