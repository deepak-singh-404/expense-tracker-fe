import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
const LandingPage = () => {
    const reduxData = useSelector(store => store)
    const { userRoot } = reduxData
    const history = useHistory()

    useEffect(() => {
        if (userRoot.isAuthenticated) {
            history.replace('/home')
        }
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col md={8} sm={12} className="m-auto">
                    <Jumbotron>
                        <h1>WELCOME TO EXPENSE TRACKER</h1>
                        <p>
                            This is a simple and secure web application where authenticated user can
                            manage there expenses.
                        </p>
                        <p>
                            <Button as={Link} to="/sign-up" variant="primary">Register</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>

    )
}

export default LandingPage
