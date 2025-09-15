
import './App.css'
import Signup from './Signup/Signup'
import Login from './Login/Login'
import { Routes,Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Start from './Start'
import Home from './Home'
import TodoApp from './Todopage/Todo'

function App() {


  return (
    <>
   
    <Routes> 

      <Route path="/" element={<Signup/>}></Route> 
      <Route path ='/login' element={<Login/>}></Route>
      {/* <Route path ='/' element={<Start/>}></Route> */}
      <Route path ='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path ='/todo' element={<ProtectedRoute><TodoApp/></ProtectedRoute>}></Route>

     </Routes>
      
    </>
  )
}

export default App
