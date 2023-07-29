import axios from 'axios'
import { useState } from 'react'
import './AddUser.css'

export default function AddUser() {
  const [name, setName]=useState('')
  const [surname, setSurname]=useState('')


  const handleSubmit = (e:React.SyntheticEvent) =>{    
        e.preventDefault()
        axios.post('http://localhost:3000/users/addUser/', {
          name: name,
          surname: surname
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  return (
    <div className="login-box">
    <h2>Add User</h2>
    <form onSubmit={handleSubmit}>
      <div className="user-box">
      <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
        <label>Name</label>
      </div>
      <div className="user-box">
      <input type='text' value={surname} onChange={(e)=>setSurname(e.target.value)}></input>
        <label>Surname</label>
      </div>
      <button>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </button>
    </form>
  </div>
  )
 
}
