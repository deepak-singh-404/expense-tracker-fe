import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap'
import { getAllTransactions, deleteTransaction, getAllCategories } from '../redux/actions/userAction'
import { useHistory, Link } from 'react-router-dom'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const date = new Date()
const _month = monthNames[date.getMonth()]

// const months = []
// months.push(_month.toLowerCase())

const Home = () => {
  const reduxState = useSelector(store => store)
  const dispatch = useDispatch()
  const history = useHistory()

  const { userRoot, errorRoot } = reduxState

  useEffect(() => {
    if (!userRoot.isAuthenticated) {
      history.push('/')
    }
    else {
      dispatch(getAllTransactions(_month.toLowerCase()))
      dispatch(getAllCategories())
    }
  }, [])

  const _eval2 = (category)=>{
    let total;
    for (const d of userRoot.transactions){
      if(d["category"][category] === category){
        total = total + Number(d["amount"])
      }
    }
    return total
  }

  const _eval = () => {
    let debit = 0
    let credit = 0
    for (const d of userRoot.transactions){
      if(d["transactionType"] === "credit"){
        credit = credit + Number(d["amount"])
      }
      if(d["transactionType"] === "debit"){
        debit = debit + Number(d["amount"])
      }
    }

    return {
      "debit": debit,
      "credit": credit,
    }
  }

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col xs={12} md={8}>
            <h5>All Transactions</h5>
            {userRoot.transactions.length !== 0 && <h6>CREDIT: {_eval()["credit"]}</h6>}
            {userRoot.transactions.length !== 0 && <h6>DEBIT: {_eval()["debit"]}</h6>}
            {userRoot.transactions.length !== 0 && <h6>LIMIT LEFT: {_eval()["credit"] - _eval()["debit"]}</h6>}
            
            {
              userRoot.categories.length !== 0 && userRoot.categories.map((d)=>(
                <h6>{d.title.toUpperCase() + ": "}  {_eval2(d.title)}</h6>
              ))
            }

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">S.No ({userRoot.transactions.length})</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Transaction Type</th>
                  <th className="text-center">Category</th>
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
                    <td className="text-center">{a.category.title}</td>
                    <td className="text-center">{a.description}</td>
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
