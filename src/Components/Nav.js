import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Container, Form} from 'react-bootstrap'

import Navbar from 'react-bootstrap/Navbar';

export default function Nav() {
  return (
    <div>
       <Navbar expand="lg" className="bg-purple justify-content-between p-2">
                <Container>
                    <Navbar.Brand className='text-white fw-bold fs-3'>Ottermap </Navbar.Brand>
                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    className=" mr-sm-2 bg-transparent form-control-nav"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
    </div>
  )
}
