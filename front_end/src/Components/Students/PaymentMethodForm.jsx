import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import backArrow from '/assets/backArrow.svg';
import { Button } from '@mui/material';

export default function PaymentMethodForm({ togglePayment, email, toggleReset }) {
  const stripe = useStripe();
  const elements = useElements();
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [message, setMessage] = useState(null)



  const server = import.meta.env.VITE_SERVER + 'student'


  const handleSubmit = async (event) => {

    if (!stripe || !elements) {
      return;
    }


    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: name,
        email: email,
        address: {
          postal_code: zip,
        },
      },
    });

    if (error) {
      setMessage('Error')
      console.error(error);
      return;
    }

    setLoading(true)


    fetch(server + '/createPaymentMethod', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, payment_method: paymentMethod.id }),
      credentials: 'include'
    })
      .then(result => result.json())
      .then(data => {

        setLoading(false)


        if(data === 'success'){
          togglePayment()
          toggleReset()
          setMessage('')
          return
        }

        if (data.code === 'card_declined') {
          switch (data.decline_code) {
            case 'insufficient_funds':
              setMessage('Insufficient Funds');
              break;
            case 'incorrect_cvc':
              setMessage('Incorrect CVC');
              break;
            case 'expired_card':
              setMessage('Expired Card');
              break;
            case 'processing_error':
              setMessage('Processing Error');
              break;
            case 'incorrect_zip':
              setMessage('Incorrect Zip');
              break;
            default:
              setMessage('Declined');
          }
        } else {
          setMessage(data.message || 'Payment failed.');
        }

        toggleReset()

      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setMessage('Error')
      })


  };

  return (
    <div className='flex flex-col items-center justify-start bg-white w-full rounded-2xl overflow-scroll max-h-10/12'>
      <div className="flex justify-start w-full items-center font-roboto-title p-2">
        <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={togglePayment}>
          <img src={backArrow} alt="back" className="h-7" />
        </IconButton>
        <div className="text-nowrap">New Payment Method</div>
      </div>
      <div onSubmit={handleSubmit} className='flex flex-col justify-center items-center border border-gray-200 rounded-2xl w-5/6 pb-7 shadow-xl my-5 mt-0'>
        <div className='w-full text-start p-3 pb-0 max-w-96 font-roboto-title'>Card Information: </div>
        <CardElement className='w-11/12 border border-gray-200 p-3 rounded-xl m-3 max-w-96 text-wrap' options={{ hidePostalCode: true }} />
        <div className='w-full text-start px-3 pt-0 pb-2 max-w-96 font-roboto-title'>Details: </div>
        <div className='font-roboto text-start w-11/12 pb-1'>Name on card:</div>
        <input type="text" className='p-2 rounded-xl border border-gray-200 w-11/12 text-roboto' placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} />
        <div className='font-roboto text-start w-11/12 pb-1 mt-2'>ZIP code:</div>
        <input type="text" className='p-2 rounded-xl border border-gray-200 w-11/12 text-roboto' placeholder={'12345'} value={zip} onChange={(e) => { if (e.target.value.length <= 5) { setZip(e.target.value) } }} />
        <div className='font-roboto text-start w-11/12 pb-1 mt-2'>Email:</div>
        <input type="text" className='p-2 rounded-xl border border-gray-200 w-11/12 text-roboto' placeholder={email} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        {message && <div className='text-red-600 font-roboto-title-italic text-sm pt-3'>{message}</div>}
        <div className='w-full flex justify-center p-3'><Button loading={loading} type="button" onClick={handleSubmit} variant='outlined' size='small' disabled={!stripe}>Add Card</Button></div>
        <div className='text-xs font-roboto-title-italic px-5'>This site uses Stripe, a PCI Service Provider Level 1, the highest
          level of security for your information.
        </div>
      </div>
    </div>
  );
};