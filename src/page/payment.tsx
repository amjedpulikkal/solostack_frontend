import PaymentIntal from '@/components/stripe/CheckoutForm'
import StripeElements from '@/components/stripe/stripe'

import  { useState } from 'react'

export default function PaymentPage() {
    const [price, setPrice] = useState('100')
    const [type, setType] = useState("usd")
    const [isInitial,setIsInitial] =useState(true)
    if(isInitial){

        return (
           <PaymentIntal {...{price,setPrice,type,setType,setIsInitial: setIsInitial}}/>
        )
    }else{
        return (
            <StripeElements amount={Number(price)} type={type} setIsInitial={setIsInitial} />
         )
    }
}
