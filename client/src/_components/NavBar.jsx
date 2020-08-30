import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
import { userActions } from '../_actions';

const NavBar = (name,role,classNo,roll) => {

  const dispatch = useDispatch();

const onLogoutStudent = () => {

  dispatch(userActions.isOnline(false))
  setTimeout(() =>
   { dispatch(userActions.logout),history.push('/')},1500
  )
}

const onLogoutTeacher = () => {
  dispatch(userActions.logout)
  history.push('/')
}


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
            <li><a onClick={onLogoutStudent}>Logout{" "}<Icon name="sign-out" /></a></li>
             </ul>
            )
              :( 
                <ul>
              <li><Icon name="user" /> {name.name}</li>
              <li>({name.role})</li>  
              <li><a onClick={onLogoutTeacher}>Logout{" "}<Icon name="sign-out" /></a></li>
               </ul>
               ) 
     }


  </nav>
  </div>
</header>

  
      
  )
}

export { NavBar }
