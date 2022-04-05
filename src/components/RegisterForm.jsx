import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userRegister } from '../redux/actions/userAction'
import Loader from './Loader'

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
   
    const history = useHistory()
    const dispatch = useDispatch()
    
    const reduxState = useSelector(store => store.userRoot)

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(userRegister({name, email, password, phoneNumber:Number(phoneNumber)}, history))
    }
    
    return (
        <>
            <Form onSubmit={formHandler}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} type="text" placeholder="Enter Phone Number" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter Password" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email" />
                </Form.Group>

                {reduxState.loader ? <Loader /> : <Button variant="primary" type="submit">
                    Submit
                </Button> }

            </Form>

        </>
    )
}

export default RegisterForm
