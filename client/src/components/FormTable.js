import React from "react"
import "../App.css"
import { MdClose } from "react-icons/md"

const FormTable=({handleSubmit,handleOnChange,handleclose,rest})=>{

    return(
        <div className="addContainer">
          <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleclose}><MdClose/></div>
            <label htmlFor="name">Name :</label>
             <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}></input>

             <label htmlFor="user_profession">User Profession:</label>
             <input type="text" id="user_profession" name="user_profession" onChange={handleOnChange} value={rest.user_profession}></input>

             <label htmlFor="user_bio">User Bio :</label>
            
             <input type="text" id="user_bio" name="user_bio" onChange={handleOnChange} value={rest.user_bio}></input>

             <button className="btn">Submit</button>
          </form>

          </div>
    )
}

export default FormTable