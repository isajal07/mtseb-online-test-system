import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions'
import { List, Divider, Accordion,Icon } from 'semantic-ui-react'
import _ from 'lodash'
const OnlineTable = () => {

  const dispatch = useDispatch();
  const students = useSelector(state => state.getOnlineStudents.students)

  useEffect(()=>{
    dispatch(userActions.getOnlineStudents())
  },[])
  
 


  return (
     
      students.loading ? <p>Loading...</p> :
      
  
     <div type="⚫" style={{color:'green'}}>
       {_.sortBy(students,'classNo','roll').map((obj,i)=>
        <List bulleted>
        
        {obj.isOnline ? 
           <List.Item>{obj.name}{" "}[{obj.classNo},{obj.roll}]</List.Item>
            :
            ''}
        
        </List>
     )}
     </div>


  )
}

export default OnlineTable
