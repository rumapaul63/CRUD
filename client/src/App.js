import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios  from 'axios';
import { set } from 'mongoose';
import FormTable from './components/FormTable';

axios.defaults.baseURL="http://localhost:8080/"


function App() {

  const [addsection, secAddsection]=useState(false)
  const [editSection, secEditSection]=useState(false)
  const [formData, setFormData]=useState({
    name:"",
    user_profession:"",
    user_bio:"",
    

  })

  const [formDataEdit,setFormDataEdit]=useState({
    name:"",
    user_profession:"",
    user_bio:"",
    _id:""

  })

  const [datalist, setdataList]=useState([])
  const handleOnChange=(e)=>{
    const {value, name}=e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name]:value
      }

    })


  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data=await axios.post("/create",formData)
    console.log(data)
    if (data.data.success){
      secAddsection(false)
      alert(data.data.message)
      getfetchData()
    }
  }

  const getfetchData=async()=>{
    const data=await axios.get("/")
    console.log(data)
    if (data.data.success){
      setdataList(data.data.data)
   
      

  }
}

useEffect(()=>{
  getfetchData()

},[])

const handleDelete=async(id)=>{
  const data=await axios.delete("/delete/"+id)
  if(data.data.success){
    getfetchData()
    alert(data.data.message)
  }
}

const handleUpdate=async(e)=>{
  e.preventDefault()
  const data=await axios.put("/update/",formDataEdit)
  if(data.data.success){
    getfetchData()
    alert(data.data.message)
    secEditSection(false)
  }
}



const handleEditOnChange=async(e)=>{

  const {value, name}=e.target
  setFormDataEdit((preve)=>{
    return{
      ...preve,
      [name]:value
    }

  })

}

const handleEdit=(el)=>{
  setFormDataEdit(el)
  secEditSection(true)
}


return(
<>
   <div className="container">
    <button className="btn btn-add" onClick={()=>secAddsection(true)}>Add</button>

    {
      addsection &&(
       <FormTable

       handleSubmit={handleSubmit}
       handleOnChange={handleOnChange}
       handleclose={()=>secAddsection(false)}
       rest={formData}

       />

        
        
      )

    }


    {
      editSection &&(
        <FormTable

       handleSubmit={handleUpdate}
       handleOnChange={handleEditOnChange}
       handleclose={()=>secEditSection(false)}
       rest={formDataEdit}

       />

      )
    }

    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>User Profession</th>
            <th>User Bio</th>
            <th>
             
            </th>
          </tr>
        </thead>
        <tbody>
          { datalist[0]?(
          datalist.map((el)=>{
            console.log(el)
            return(
              <tr>
                <td>{el.name}</td>
                <td>{el.user_profession}</td>
                <td>{el.user_bio}</td>
                <td>
                  <button className="btn btn-edit" onClick={()=>handleEdit(el)}>Edit</button>
                  <button className="btn btn-delete" onClick={()=> handleDelete(el._id)}>Delete</button>
                </td>
              </tr>
            )
           

          }))
          :(
            <p style= {{textAlign:"center"}}>No Data</p>
          )
        }
        </tbody>
        

      </table>
      
    </div>
    

   </div>
   </>
  );
      }


export default App;
