import axios from 'axios'
import { useState } from 'react'
import './AddTutorial.css'
import { useParams } from 'react-router-dom'

export default function AddTutorial() {
  const [name, setName]=useState('')
  const [description, setDescription]=useState('')
  const {id} = useParams()

  const handleSubmit = (e:React.SyntheticEvent) =>{    
        e.preventDefault()
        axios.post(`http://localhost:3000/tutorials/add/${id}`, {
          title: name,
          description: description
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
    <h2>Add Tutorial</h2>
    <form onSubmit={handleSubmit}>
      <div className="user-box">
      <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
        <label>Title</label>
      </div>
      <div className="user-box">
      <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
        <label>Description</label>
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
