import { useEffect, useState, ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { ITutorial } from "../TutorialsList/TutorialsList"


export default function Tutorial() {
  const {id} = useParams()
  const [tutorial, setTutorial] = useState<null | ITutorial>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get( `http://localhost:3000/tutorials/tutorial/${id}`).then((res)=>{
      // console.log(res.data);
      setTutorial(res.data)
    }).catch((err)=>console.log(err))
  },[id])

  function handleTitleChange(e:ChangeEvent<HTMLInputElement>) {
    if(tutorial !== null){
      setTutorial({
        ...tutorial,
        title:e.target.value
    })
    }
  }
  function handleDescChange(e:ChangeEvent<HTMLInputElement>) {
    if(tutorial !== null){
      setTutorial({
        ...tutorial,
        description:e.target.value
    })
    }
  }

  function handleSubmit(e:React.SyntheticEvent){
    e.preventDefault()
    axios.put(`http://localhost:3000/tutorials/update/${id}`,{
     ...tutorial
    }).then(res=>{
      console.log(res)
      navigate(-1)
    }).catch(err=>{console.log(err);
    })
  }
  return (   
  <div className="login-box">
  <h2>Edit Tutorial</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
    <input type='text' name="title" value={tutorial?.title} onChange={handleTitleChange} ></input>
      <label>Title</label>
    </div>
    <div className="user-box">
    <input type='text' name='description' value={tutorial?.description} onChange={handleDescChange}></input>
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
