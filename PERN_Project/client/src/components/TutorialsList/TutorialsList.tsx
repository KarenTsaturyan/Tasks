import axios from "axios"
import {useEffect, useState} from 'react'
import './TutorialsList.css'
import { useNavigate, useParams } from "react-router-dom"

export interface ITutorial {
  id:number
  title: string
  description: string
  createdDate:string
  updatedDate:string
}
export default function TutorialsList() {
  const {id} = useParams()
  
  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:3000/tutorials/${id}`).then(res=>{
      // console.table(res.data)      
      setData(res.data)
    }).catch(err=>console.log(err)
    )
  }, [])//infinite update
  
  function handleDelete(id:number){
    axios.delete(`http://localhost:3000/tutorials/delete/${id}`).then(
      res=>console.log(res.data)
    ).catch(
      err=>console.log(err)
    )
  }
  
  return (
    <div className="table-wrapper" >
      <h1 className="title">TutorialsList</h1>
        <table className="fl-table">
          <thead>
              <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Descriptions</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              {data?.map((row:ITutorial)=>(
              <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.title}</td>
                      <td>{row.description}</td>
                      <td>{row.updatedDate}</td>
                      <td>{row.createdDate}</td>
                      <td>
                          <button className="edit" onClick={()=>navigate(`/tutorials/tutorial/${row.id}`)}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                                Edit
                          </button>
                          <br />
                          <button className="edit delete" onClick={()=>handleDelete(row?.id)}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                                    🗑
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
