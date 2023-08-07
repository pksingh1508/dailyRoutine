
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo'
import UpdateTodo from './pages/UpdateTodo'
import './App.css'
import { PublicRoute } from './components/PublicRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import { PrivateRoute } from './components/PrivateRoute'

function App() {

  return (
    <div className='w-[100vw] lg:h-[100vh] bg-bodyColor'>
      <Navbar />

      <Routes>
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/' element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/todo' element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        } />
        <Route path='/update/:id' element={
          <PrivateRoute>
            <UpdateTodo />
          </PrivateRoute>
        } />
      </Routes>

    </div>
  )
}

export default App
