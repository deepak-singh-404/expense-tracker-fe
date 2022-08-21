import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addTransaction, getAllCategories, addCategory } from '../redux/actions/userAction'
import Loader from '../components/Loader'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const paymentModes = [{
    "type": "offline"
},
{
    "type": "online"
}]
const date = new Date()
const _month = monthNames[date.getMonth()]
const _year = date.getFullYear()

const AddTransaction = () => {
    const [amount, setAmount] = useState("")
    const [transactionType, setTransactionType] = useState("debit")
    const [transactionDescription, setTransactionDescription] = useState("")
    const [category, setCategory] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    const [paymentMode, setPaymentMode] = useState("online")
    const [paymentModeDescrition, setPaymentModeDescription] = useState("")
    const [description, setDescription] = useState("")
    const [month, setMonth] = useState(_month.toString())
    const [year, setYear] = useState(_year.toString())


    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    const reduxState = useSelector(store => store.userRoot)

    const addCategoryHandler = () => {
        if (category) {
            dispatch(addCategory({ title: category }))
            setCategory("")
        }
    }

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(addTransaction({
            amount: Number(amount),
            transactionType,
            description,
            month,
            year: Number(year),
            category,
            paymentMode,
            paymentModePlatfrom: paymentModeDescrition, 
        }, history))
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col md={8} className="mx-auto" >
                    <Form onSubmit={formHandler}>
                        <Form.Group >
                            <Form.Label>Amount *</Form.Label>
                            <Form.Control onChange={(e) => setAmount(e.target.value)} value={amount} type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Transaction Type *</Form.Label>
                            <Form.Control onChange={(e) => setTransactionType(e.target.value)} value={transactionType} type="text" />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category *</Form.Label>
                            <Form.Control required onChange={(e) => setCategory(e.target.value)} as="select">
                                <option>Select</option>
                                {reduxState.categories.length !== 0 ? reduxState.categories.map(c =>
                                    <option value={c._id}>{c.title}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Add Category</Form.Label>
                            <Form.Control onChange={(e) => setCategory(e.target.value)} type="text" />
                            <Button onClick={addCategoryHandler} variant="primary" type="button">
                                Add
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Payment Mode *</Form.Label>
                            <Form.Control required onChange={(e) => setPaymentMode(e.target.value)} as="select">
                                <option>Select</option>
                                {paymentModes.length !== 0 ? paymentModes.map(c =>
                                    <option value={c.type}>{c.type}</option>
                                ) : null}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Payment Mode Description</Form.Label>
                            <Form.Control onChange={(e) => setPaymentModeDescription(e.target.value)} value={paymentModeDescrition} type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Transaction Description</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} value={description} type="text" />
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