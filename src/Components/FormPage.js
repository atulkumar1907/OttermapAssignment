import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css'
import Nav from './Nav';

function FormPage() {
    const [firstName, setFirstName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/map', { state: { firstName } });
    };

    return (
        <div>
           <Nav/>
            <Container>
                <Form onSubmit={handleSubmit} className='w-75 flex align-items-center justify-content-center bg-light bg-opacity-50 mx-auto mt-5 p-5  border border-2 rounded-5  '>
                    <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="tel" placeholder="xxxxx xxxxx" onChange={(e) => setMobileNumber(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default FormPage;