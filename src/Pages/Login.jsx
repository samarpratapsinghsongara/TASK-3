import { useState } from "react"
import "./Login.css"

export default function Login({onLogin}){
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("firstName:", name);
    console.log("lastName:", lastName);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPass)

    if(email !== "admin@gmail.com" || password !== confirmPass){
      alert("Invalid Email or Password")
      console.log("Invalid Email or Password")
    }else{
      console.log("login successfully");
      alert("login successfully");
      onLogin()
    }
  }

  return(
    <>
    <div className="login-wrapper">
      <div className="form-container">
        <h2>Signup Form</h2>
          <p>First Name: <input type="text" placeholder="Enter First Name" value={name} onChange={(e)=>setName(e.target.value)}/></p>
          <p>Last Name: <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></p>
          <p>Email: <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/></p>
          <p>Password: <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/></p>
          <p>Confirm Pass: <input type="password" placeholder="Enter Confirm Password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}/></p>
          <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      </div>
    </>
  )
} 
