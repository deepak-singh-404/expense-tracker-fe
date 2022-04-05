import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addTransaction, getAllTransactionDescriptions } from '../redux/actions/userAction'
import Loader from '../components/Loader'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const date = new Date()
const _month = monthNames[date.getMonth()]
const _year = date.getFullYear()

const AddTransaction = () => {
    const [amount, setAmount] = useState("")
    const [transactionType, setTransactionType] = useState("debit")
    const [transactionDescription, setTransactionDescription] = useState("")
    const [month, setMonth] = useState(_month.toString())
    const [year, setYear] = useState(_year.toString())

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTransactionDescriptions())
    }, [])

    const reduxState = useSelector(store => store.userRoot)

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(addTransaction({ amount: Number(amount), transactionType, transactionDescription, month, year: Number(year) }, history))
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col md={4} className="mx-auto" >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Previous Transaction Descriptions.</Form.Label>
                        <Form.Control as="textarea" rows={3} disabled={true} value={reduxState.transactionDescriptions.join(", ")} />
                    </Form.Group>
                </Col>
                <Col md={8} className="mx-auto" >
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control onChange={(e) => setAmount(e.target.value)} value={amount} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Transaction Type</Form.Label>
                            <Form.Control onChange={(e) => setTransactionType(e.target.value)} value={transactionType} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Transaction Description</Form.Label>
                            <Form.Control onChange={(e) => setTransactionDescription(e.target.value)} value={transactionDescription} type="text" />
                        </Form.Group>
                        {reduxState.loader ? <Loader /> : <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddTransaction