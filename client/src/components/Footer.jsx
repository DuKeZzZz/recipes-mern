import React from 'react';
import {Navbar, Container} from 'react-bootstrap';

function Footer() {
    return (
        <Navbar fixed="bottom" expand="lg" variant="light" className='topBottom'>
            <Container><span style={{textAlign: "center", width: "100%"}}>© 2022 Copyright Jay</span></Container>
        </Navbar>
    );
}

export default Footer;