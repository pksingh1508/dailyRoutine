
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

interface Todo {
    _id: string,
    day: string,
    todo: string,
    userId: string,
    deleteTodo: (tast: string) => void
}

const Card = ({ day, todo, _id, deleteTodo }: Todo) => {
    const navigate = useNavigate();

    return (
        <div className='w-[280px] flex flex-col gap-2 p-1 text-white border-[2px] border-gray-400 my-2 rounded-md px-2 py-3'>
            <div className='flex justify-between'>
                <p className='font-bold text-[18px]'>{day}</p>
                <div className='flex gap-2 text-[17px]'>
                    <span onClick={() => deleteTodo(_id)}><RiDeleteBin6Line /></span>
                    <span onClick={() => navigate(`/update/${_id}`)}><BiEdit /></span>
                </div>
            </div>
            <div>
                <p>{todo}</p>
            </div>
        </div>
    )
}

export default Card;