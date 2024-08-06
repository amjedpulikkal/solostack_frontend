import React, { useState, FormEvent, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe, PaymentIntent, StripeElementsOptions, StripeError } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useStripeAPi } from '@/reactQuery/stripe';
import { useTheme } from '../theme-provider';
const stripePromise = loadStripe("pk_test_51PdTnq2KNtIlvm8CKogYGdqVACekWIqXy7NTod1MxazpZxnBaXc8yQc4S8UHhuOZRvsmRCNwhdPg765jBws5KnkF00mNlgYVb9");




const CheckoutForm: React.FC<{ clientSecret: string, amount: number, type: string, setIsInitial: React.Dispatch<React.SetStateAction<boolean>> }> = ({ clientSecret, amount, type, setIsInitial }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${ import.meta.env.VITE_CLINT_BASE_URL ||"http://localhost:5173"}/student/paymentSuccess`,
      },
    }) as { error: StripeError; paymentIntent?: PaymentIntent };

    setLoading(false);

    if (error) {
      setError((error?.message as string));
    } else if (paymentIntent?.status === 'succeeded') {
      setSuccess(true);
      setError(null);
    }
  };


  useEffect(() => {
    if (elements) {
      setIsLoading(false);
    }
  }, [elements]);
  return (
    <>
      <div className='flex p-10'>
        <div className='w-1/2   h-full'>
          <IoMdArrowRoundBack className='text-3xl -mt-8 hover:text-primary transition-colors' onClick={() => setIsInitial(true)} />
          <div className='flex h-full pl-10 pt-10'>

            <p className='uppercase  font-extrabold'>{type}</p> <p className='text-9xl  font-bold'>{amount}</p>
          </div>
        </div>
        <div className='w-1/2 h-full'>

            {isLoading && <div className="w-full h-full flex justify-center items-center">
              <span className="loader12 text-primary"></span>
            </div>
            }
          <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            <Button type="submit" className='mt-8 w-full' disabled={!stripe || loading}>
              {loading ? 'Processing...' : 'Pay'}
            </Button>
            <div>

            </div>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {success && <div style={{ color: 'green' }}>Payment succeeded!</div>}
        </div>
      </div>
    </>
  );
};


type props = {
  amount: number,
  type: string,
  setIsInitial: React.Dispatch<React.SetStateAction<boolean>>
}
const StripeElements: React.FC<props> = ({ amount, type, setIsInitial }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  useStripeAPi({ amount: amount * 100, type }, setClientSecret)
  const { theme } = useTheme()


  // useEffect(() => {
  //   fetch('http://localhost:3000/create-payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //     }
  //     ).catch(err => console.error(err.message));
  // }, []);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret!,
    appearance: {
      theme: theme == "dark" ? "night" : "flat"
    }
  };
  if (clientSecret) {

    return (
      <Elements stripe={stripePromise} options={options}>
        <ElementsConsumer>
          {() => (
            clientSecret && <CheckoutForm setIsInitial={setIsInitial} amount={amount} type={type} clientSecret={clientSecret} />
          )}
        </ElementsConsumer>
      </Elements>
    );
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loader12 text-primary"></span>
      </div>)
  }
};

export default StripeElements;
