import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { userLogout } from '../redux/actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


const ModalHelper = ({ logoutModal, setLogoutModal }) => {
    const reduxState = useSelector(store => store)
    const { userRoot, errorRoot } = reduxState
    const dispatch = useDispatch()
    const history = useHistory()

    const clickHandler = () => {
        dispatch(userLogout())
        window.location.reload();
    }

    return (
        <Modal show={logoutModal} onHide={() => setLogoutModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>USER LOGOUT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Are your sure want to logout ?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={clickHandler}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={() => setLogoutModal(false)}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>

    )

}


export default ModalHelper
