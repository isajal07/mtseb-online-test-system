import React, { useState } from 'react';
import { Grid, Container, Modal, Divider } from "semantic-ui-react";
import { LoginPage ,SLoginPage} from '../LoginPage'
import logo from '../_components/logogo.png'
import './Style.css';

function LandingPage() {
  const [openTL, setOpenTL] = useState(false)
  const [openSL, setOpenSL] = useState(false)

  return (
    <div className='landing'>
      <Container>
        <Grid verticalAlign="middle" >
          <Grid.Row style={{paddingBottom:'390px'}}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <img className="logo" src={logo} />
  
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={16} textAlign="center">
             
                <Modal 
                  closeIcon
                  open={openTL}
                  trigger={<button className='login-button'>Teacher Login</button>}
                  onClose={() => setOpenTL(false)}
                  onOpen={() => setOpenTL(true)}
                  style={{backgroundColor:'rgb(230, 225, 225)'}}
                >

                <LoginPage/>


                </Modal>
              <br/>
                <Modal
                  closeIcon
                  open={openSL}
                  trigger={<button className='login-button'>Student Login</button>}
                  onClose={() => setOpenSL(false)}
                  onOpen={() => setOpenSL(true)}
                  style={{backgroundColor:'rgb(230, 225, 225)'}}
                >
                <SLoginPage/>
                </Modal>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Divider/>
      <p className='landing-footer'>© 2020. Mt SEB School.</p>
            
    </div>
  );}

export {LandingPage}