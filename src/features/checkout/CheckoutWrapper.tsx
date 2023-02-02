import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import LoadingComponents from '../../app/layout/LoadingComponents'
import { useAppDispatch } from '../../app/store/configureStore'
import { clearBasket, setBasket } from '../basket/BasketSlice'
import Checkout from './CheckOut'

const stripePromise = loadStripe('pk_test_51LZwdgSIHeZztw6rYgYBRIK7d5fjov6zP0BcIXwe93y3aUZQ9fzJSvl0dSmUGizWHjuNQNukoj4Ns2r6ngUWk0ud00XvuWLwoT')

const CheckoutWrapper = () => {
  const [loading , setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    agent.Payments.createPaymentIntent()
    .then(basket => {
      console.log(basket)
      dispatch(setBasket(basket))
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  },[dispatch])

  if(loading) return <LoadingComponents message='loading Checkout...' />
  return (
    <Elements stripe={stripePromise}>
        <Checkout />
    </Elements>
  )
}

export default CheckoutWrapper