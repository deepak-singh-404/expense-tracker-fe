import React from 'react'
import RegisterForm from '../components/RegisterForm'
import {Container, Row, Col} from 'react-bootstrap'

const RegisterPage = () => {
    return (
         <Container>
            <Row className="mt-5">
                <Col md={6} className="mx-auto" >
                   <RegisterForm />
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage
