import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Grid, Segment, GridColumn } from "semantic-ui-react";

function LandingPage() {
  return(
  <div>
    <Link to='/register'>Teacher Register</Link> ||{" "}
    <Link to='/login'>Teacher Login</Link><br/>
    <Link to='/sregister'>Student Register</Link> ||{" "}
    <Link to='/slogin'>Student Login</Link>

  </div>
  
  )}

export {LandingPage}