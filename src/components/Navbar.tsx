import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth';


const Navbar = () => {

  const { token } = useAuth();

  return (
    <div className='w-full'>
      {
        token === "" ? (
          <div className='w-[300px] flex justify-between mx-auto py-3'>
            <Link to={"/login"}>
              <p className='text-xl text-white font-bold hover:text-indigo-500 transition-all duration-150 hover:scale-105'>Login</p>
            </Link>
            <Link to={"/todo"}>
              <p className='text-xl text-white font-bold hover:text-indigo-500 transition-all duration-150 hover:scale-105'>Signup</p>
            </Link>
          </div>

        )
          :
          (
            <div className='w-[300px] flex justify-between mx-auto py-3'>
              <Link to={"/"}>
                <p className='text-xl text-white font-bold hover:text-indigo-500 transition-all duration-150 hover:scale-105'>Home</p>
              </Link>
              <Link to={"/todo"}>
                <p className='text-xl text-white font-bold hover:text-indigo-500 transition-all duration-150 hover:scale-105'>Work</p>
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default Navbar;