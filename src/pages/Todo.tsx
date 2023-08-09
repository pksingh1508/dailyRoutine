import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '../components/Card';
import { toast } from 'react-hot-toast'

interface Todo {
  _id: string,
  day: string,
  todo: string,
  userId: string,
  deleteTodo: (task: string) => void
}

const Todo = () => {

  const [todos, setTodos] = useState<Todo[]>([]);

  const getallTodos = async () => {
    try {
      const toastId = toast.loading("Loading Work..")
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}todo/getTodo`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      // console.log("All todos", response);
      setTodos(response.data.message);
      toast.dismiss(toastId);
    } catch (err) {
      console.log("some error in getting todos", err);
    }
  }

  useEffect(() => {
    getallTodos();
  }, [])

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}todo/deleteTodo/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // console.log(response);
      toast.success("Work deleted successfully");
      getallTodos();
    } catch (err) {
      console.log("error while deleting", err);
    }
  }

  return (
    <div className='w-[70vw] flex flex-wrap gap-4 mx-auto mt-[3rem] bg-bodyColor'>
      {
        todos.length === 0 ? (
          <div className='w-[300px] mx-auto flex items-center'>
            <p className='text-white font-bold text-2xl'>No Work</p>
          </div>
        )
          :
          (

            todos?.map((todo) => (
              <Card key={todo._id} {...todo} deleteTodo={deleteTodo} />
            ))

          )
      }

    </div>
  )
}

export default Todo;