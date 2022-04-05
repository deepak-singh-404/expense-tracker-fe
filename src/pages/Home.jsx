import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap'
import { getAllTransactions, deleteTransaction } from '../redux/actions/userAction'
import { useHistory, Link } from 'react-router-dom'


const Home = () => {
  const reduxState = useSelector(store => store)
  const dispatch = useDispatch()
  const history = useHistory()

  const { userRoot, errorRoot } = reduxState

  //GET LIST OF ALL USER
  useEffect(() => {
    if (!userRoot.isAuthenticated) {
      history.push('/')
    }
    else {
      dispatch(getAllTransactions())
    }
  }, [])

  const _eval = (data) => {
    let debit = 0
    let credit = 0
    for (var i = 0; i < data.length; i++) {
      if (data[i]["transactionType"] === "credit") {
        credit = credit + Number(data[i]["amount"])
      }
      if (data[i]["transactionType"] === "debit") {
        debit = debit + Number(data[i]["amount"])
      }
    }
    return {
      "debit": debit,
      "credit": credit
    }
  }

  return (
    <>
      <Container>
        {console.log("redux_data", userRoot)}

        <Row className="mt-5">
          <Col xs={12} md={8}>
            <h5>All Transactions</h5>
            {userRoot.transactions.length !== 0 && <h6>Credit: {_eval(userRoot.transactions)["credit"]}</h6> }
            {userRoot.transactions.length !== 0 && <h6>Debit: {_eval(userRoot.transactions)["debit"]}</h6> }
            {userRoot.transactions.length !== 0 && <h6>Limit Left: {_eval(userRoot.transactions)["credit"] - _eval(userRoot.transactions)["debit"]}</h6> }

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No ({userRoot.transactions.length})</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Transaction Type</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Month</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {userRoot.transactions.length !== 0 ? userRoot.transactions.map((a, index) => (
                  <tr key={a._id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{a.amount}</td>
                    <td className="text-center">{a.transactionType}</td>
                    <td className="text-center">{a.transactionDescription}</td>
                    <td className="text-center">{a.month}</td>
                    <th className="text-center"> <Button onClick={() => dispatch(deleteTransaction(a._id))} variant="outline-danger" className='mx-4'>Delete</Button></th>
                  </tr>
                )) : "No Transactions Found."}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
