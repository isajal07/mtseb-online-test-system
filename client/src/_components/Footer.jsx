import React from 'react'
import './Style.css'
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

const Footer = () => {
  return (
    <Segment
        inverted
        vertical
        color="grey"
        style={{ position: "absolute", bottom: "0", width: "100%"  }}
      >
        <Container textAlign="center">
          <Divider section color='white'/> 
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
            © 2020. Mt SEB School.
            </List.Item>
          </List>
        </Container>
      </Segment>
  )
}

export  {Footer}
