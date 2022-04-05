import React,{useState} from 'react'
import {Navbar, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LogoutModal from './LogoutModal'




const Nav = () => {

    const reduxState = useSelector(store => store.userRoot)
    const [logoutModal, setLogoutModal] = useState(false)

    return (
        <>
            <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
            

            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">TODO_HANDLER</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <div className="ml-auto">
                        {reduxState.isAuthenticated ? <>
                            {reduxState.user? reduxState.user.name.toUpperCase(): null}
                            <Button as={Link} to={'/add-transaction'} variant="outline-success" className='mx-4'>Add Transaction</Button>
                            <Button onClick={() => setLogoutModal(true)} variant="outline-danger" className='mx-4'>Logout</Button>
                        </>
                            : <>
                                <Button as={Link} to={'/sign-up'} variant="outline-success">Register</Button>
                                <Button as={Link} to={'/login'} variant="outline-success" className='mx-4'>Login</Button>
                            </>
                        } 
                    </div>
                   
                        
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Nav
