import React, { useState } from 'react';
import './App.css';
import profile from "./image/a.png";
import email from "./image/email.jpg";
import pass from "./image/pass.png";
import axios from 'axios';
import Content from './Content';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const url = 'http://192.168.127.128:5000/login';

  const handleClick = async (e) => {
    try {
      const resp = await axios.post(url,"user=" + username + "&password=" + password );
      console.log("success = " + resp.data.success);
      console.log("JWT= " +resp.data.JWT);
      if(resp.data.success === "false"){
        setError(true);
        setIsAuthenticated(false);
        console.log("error= "+error);
      }
      else {
        setError(false);
        setIsAuthenticated(true);
        console.log("error= "+error);
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.response);
    }   
  }

  const handleChangeUser = (e)=>{
    setUsername(e.target.value);
  }

  const handleChangePassword = (e)=>{
    setPassword(e.target.value);
  }

  return (
    <div className="main">
      {isAuthenticated ?(<Content/>): (<div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" />
            </div>
          </div>

          <div>

            <h1 className="h1-text">Login Page</h1>
            { error && (<h2>incorrect user or password</h2>)} 
            <div>
              <img src={email} alt="email" className="email"/>
              <input type="text" placeholder="username" className="name" value={ username } onChange={ (e)=>{handleChangeUser(e)} }  />
            </div>

            <div className="second-input">
              <img src={pass} alt="pass" className="email"/>
              <input type="password" placeholder="password" className="name" value={ password } onChange={ (e)=>{handleChangePassword(e)} }/>
            </div>

            <div className="login-button">
            <button onClick={ handleClick }>Login</button>
            </div>

          </div>
        </div>

      </div>)}

    </div>

  );
}

export default App;
