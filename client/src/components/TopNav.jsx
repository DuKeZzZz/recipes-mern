import React, {useState} from 'react';
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("")

  const handleChange = (event) => {
    const value = event.target.value;

    setSearchQuery(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log('/search/' + searchQuery);
    if (searchQuery==="") {
      alert("Please enter search text before submitting!")
    } else {
      setSearchQuery("");
      navigate(`/search/${searchQuery}`);
    }
    
  }

  return (
    <Navbar sticky="top" expand="lg" variant='light' className='topBottom'>
      <Container fluid>
        <Navbar.Brand onClick={() => (navigate('/'))}>Pantry</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/AddNew')}}>Add new recipe</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form onSubmit={handleSubmit} className="d-flex">
          <FormControl
            name="searchQuery"
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleChange}
          />
          <Button type='submit' variant="outline-dark">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default TopNav;