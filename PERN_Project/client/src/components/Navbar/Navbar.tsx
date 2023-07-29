import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='navbar'>
    <div className='links'>
    <Link to="/users/addUser">AddUser</Link>

    {/* <Link to="/tutorials/add">Add</Link> */}
    <Link to="/users">UsersList</Link>
    </div>

    </div>
  )
}
