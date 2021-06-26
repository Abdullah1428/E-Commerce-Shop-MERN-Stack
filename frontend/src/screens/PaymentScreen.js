import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { savePaymentMethod } from '../redux/actions/cartActions'

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Cash')

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Cash'
              id='Cash'
              name='paymentMethod'
              value='CASH'
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
