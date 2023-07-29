import axios from "axios"
import {useEffect, useState} from 'react'
import './UsersList.css'
import { useNavigate } from "react-router-dom"

export interface ITutorial {
  id:number
  name: string
  surname: string
  createdDate:string
  updatedDate:string
}
export default function UsersList() {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/users/").then(res=>{
      // console.table(res.data)      
      setData(res.data)
    }).catch(err=>console.log(err)
    )
  }, [])//infinite update
  
  // function handleDelete(id:number){
  //   axios.delete(`http://localhost:3000/tutorials/delete/${id}`).then(
  //     res=>console.log(res.data)
  //   ).catch(
  //     err=>console.log(err)
  //   )
  // }
  
  return (
    <div className="table-wrapper" >
      <h1 className="title">UsersList</h1>
        <table className="fl-table">
          <thead>
              <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Surname</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              {data?.map((row:ITutorial)=>(
              <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.surname}</td>
                      <td>{row.updatedDate}</td>
                      <td>{row.createdDate}</td>
                      <td>
                          <button className="edit" onClick={()=>navigate(`/tutorials/add/${row.id}`)}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                                Add Tutorial
                          </button>
                          <br />
                          <button className="edit delete" onClick={()=>navigate(`/tutorials/${row?.id}`)}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              tutorials
                          </button>
                      </td>
              </tr>
              )
              )}
          </tbody>
        </table>
    </div>
  )
}
