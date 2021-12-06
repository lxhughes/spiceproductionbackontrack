import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import atreidesLogo from '../assets/house_atreides_logo.svg';
import arrakisLogo from '../assets/arrakis_spice_melange_logo.svg';

class Appnavbar extends React.Component {
    render(){
        return (
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand>
                   <img src={atreidesLogo} height='60' width='80' alt="House Atreides Logo" />
                    House Atreides
                </Navbar.Brand>

                <Navbar.Brand>
                    <img src={arrakisLogo} height='60' width='80' alt="Arrakis Spice Melange Logo" />
                    Arrakis Spice Melange, Inc.
                </Navbar.Brand>

                <h1>Spice Production Back on Track</h1>
              </Container>
            </Navbar>
        );
    }
}

export default Appnavbar;