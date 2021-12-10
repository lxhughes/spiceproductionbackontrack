import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import store from '../store';

import atreidesLogo from '../assets/house_atreides_logo.svg';
import arrakisLogo from '../assets/arrakis_spice_melange_logo.svg';

const Appnavbar = () => { 
        
    //const daysElapsed = props.daysElapsed;
    const state = store.getState();
    const daysElapsed = state.applicationTimer;

    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>
               <img src={atreidesLogo} height='60' width='80' alt="House Atreides Logo" />
               <div>House Atreides</div>
            </Navbar.Brand>

            <Navbar.Brand>
                <img src={arrakisLogo} height='60' width='80' alt="Arrakis Spice Melange Logo" />
                <div>Arrakis Spice Melange, Inc.</div>
            </Navbar.Brand>

            <h1>Spice Production Back on Track</h1>
            <div className="date">{formatDate(daysElapsed)} A.G.</div>
          </Container>
        </Navbar>
    );
}

export default Appnavbar;

/* Format application timer as date */
/* Input seconds, output string */
function formatDate(seconds){
    const monthNames = ["Jamisuary", "Feydruary", "Muad'Rch", "Arkril", "Maypes", "Juno",
  "Julky", "Abulurgust", "Stilgember", "Orloptober", "Idahovember", "Dunecember"
];
    
    let date = new Date(10190, 0);
    date.setDate(date.getDate() + seconds);
    return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
    
}