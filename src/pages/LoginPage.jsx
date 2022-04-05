import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
    return (
        
        <Container>
            <Row className="mt-5">
                <Col md={6} className="mx-auto" >
                    <LoginForm />
                </Col>
            </Row>
        </Container>
           
        
    )
}

export default LoginPage
