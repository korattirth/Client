import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { validationSchema } from "./CheckoutValidation";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { clearBasket, setBasket } from "../basket/BasketSlice";
import { useState } from "react";
import { StripeElementType } from "@stripe/stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [orderno, setOrderno] = React.useState(0);
  const [cardState, setCardState] = useState<{
    elementError: { [key in StripeElementType]?: string };
  }>({ elementError: {} });
  const [cardComplete, setCardComplete] = useState<any>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const { basket } = useAppSelector((state) => state.basket);
  const stripe = useStripe();
  const elements = useElements();
  const currentValidationschema = validationSchema[activeStep];
  const dispatch = useAppDispatch();

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationschema),
  });

  React.useEffect(() => {
    agent.Account.fetchAddress().then((res) => {
      if (res) {
        methods.reset({ ...methods.getValues(), ...res, saveAddress: false });
      }
    });
  }, [methods]);

  const onCardInputChange = (event: any) => {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    });
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
  };

  async function submitOrder(data: FieldValues) {
    setLoading(true);
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    // agent.Payments.createPaymentIntent(data)
    // .then(basket => {
    //   dispatch(setBasket(basket))
    // })
    if (!stripe || !elements) return; // stripe not ready
    console.log(basket);
    try {
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: nameOnCard
          }
        }
      });
      console.log(paymentResult);
      if (paymentResult.paymentIntent?.status === 'succeeded') {
        const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress });
        setOrderno(orderNumber);
        setPaymentSucceeded(true);
        setPaymentMessage('Thank you - we have received your payment');
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
        setLoading(false);
      } else {
        setPaymentMessage(paymentResult.error?.message!);
        setPaymentSucceeded(false);
        setLoading(false);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleNext = async (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      setLoading(true);
      try {
        console.log(data)
        await submitOrder(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return (
          <PaymentForm
            onCardInputChange={onCardInputChange}
            cardState={cardState}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  function submitDisabled(): boolean {
    if (activeStep === steps.length - 1) {
      return !cardComplete.cardCvc
        || !cardComplete.cardExpiry
        || !cardComplete.cardNumber
        || !methods.formState.isValid
    }
    else {
      return !methods.formState.isValid
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <Container component="main" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    {paymentMessage}
                  </Typography>
                  {paymentSucceeded ? (
                    <Typography variant="subtitle1">
                      Your order number is #{orderno}. We have emailed your
                      order confirmation, and will send you an update when your
                      order has shipped.
                    </Typography>
                  ) : (
                    <Button variant="contained" onClick={handleBack}>
                      Go back and try again
                    </Button>
                  )}
                </React.Fragment>
              ) : (
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <LoadingButton
                      loading={loading}
                      disabled={submitDisabled()}
                      variant="contained"
                      type="submit"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </LoadingButton>
                  </Box>
                </form>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </FormProvider>
    </>
  );
}
