// import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeWrapper from './pages/HomeWrapper'
import TutorialsList from './components/TutorialsList/TutorialsList'
import AddTutorial from './components/AddTutorial/AddTutorial'
import Tutorial from './components/Tutorial/Tutorial'
import AddUser from './components/AddUsers/AddUser'
import UsersList from './components/UsersList/UsersList'

// import axios from 'axios'

function App() {
  // const [data, setData] = useState("")
  //     useEffect(()=>{
  //       axios.get("http://localhost:3000/").then(response => {
  //         console.log(response);
  //         setData(response.data.key)
  //       })
  //     }, [])
  return (
    <>
        <Routes>
        <Route path='/' element={<HomeWrapper />}>
            <Route index element={<Navigate to="/users" replace={true} />} />
            <Route path="/users" element={<UsersList/>} />
            <Route
              path="*"
              element={<Navigate to="/" replace={true} />}
            />
            <Route path="/tutorials/tutorial/:id" element={<Tutorial/>} />
            <Route path="/tutorials/add/:id" element={<AddTutorial/>} />
            <Route path="/users/addUser" element={<AddUser/>} />
            <Route path="/tutorials/:id" element={<TutorialsList/>} />


        </Route>
        </Routes>
    </>
  )
}

export default App
