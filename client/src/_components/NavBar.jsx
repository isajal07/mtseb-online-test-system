import React, { useEffect } from 'react'
import {
  Menu,
  Segment,
  Container,
  Icon,
  Grid,
  Header,
  List,
  Divider,
  Image,
  Form,
  Input,
  Select,
  Button
} from "semantic-ui-react";
import { history } from "../_helpers";
import './Style.css';
import logo1 from './logogo.png'
const NavBar = (name,role,classNo,roll) => {




  return (
    

      <header>
  <div className="container">
    <div className="logo-box">
      <a>
        <img className="logo-style" src={logo1}/>
      </a>
    </div>
    <nav>
     
      {
              name.role === undefined ?( 
                <ul>
            <li><Icon name="user" /> {name.name}</li>
            <li>Class: {name.classNo} </li>
            <li>Roll no: {name.roll}</li>
            <li><a href="/">Logout{" "}<Icon name="sign-out" /></a></li>
             </ul>
            )
              :( 
                <ul>
              <li><Icon name="user" /> {name.name}</li>
              <li>({name.role})</li>  
              <li><a href="/">Logout{" "}<Icon name="sign-out" /></a></li>
               </ul>
               ) 
     }


  </nav>
  </div>
</header>

  
      
  )
}

export { NavBar }
