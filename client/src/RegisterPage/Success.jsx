import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Loader,
} from "semantic-ui-react";

const Success = () => {

  return (
    <div>
      <Grid textAlign='center' verticalAlign='middle' style={{marginTop:'30%'}}>
            
            <Message  size='large' color="teal">
         <Message.Header>Registration Successful!</Message.Header>
         <Message.Content>Please review the downloaded file. It contains all your profile information(including your password). Keep the file safe and secure with you. Thank you.</Message.Content>
          </Message>
          </Grid>
    </div>
  )
}

export { Success }
