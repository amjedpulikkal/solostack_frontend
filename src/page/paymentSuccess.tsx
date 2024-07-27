import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Lottie from 'lottie-react';
import animationData from "../assets/Animation - 1721922683235.json"
import errorAnimationData from "../assets/Animation - 1722085198372.json"


import { useStripeIsSucceeded } from '@/reactQuery/stripe';
import { useSearchParams } from 'react-router-dom';

export default function WalletTopUpSuccess() {
  const [isSucceeed, setIsSucceeed] = useState(null)
  const [searchParams] = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');
  const { isLoading, isError } = useStripeIsSucceeded(setIsSucceeed, payment_intent)

  return (
    <>
      <div className='w-full h-full relative z-[-10] overflow-hidden'>
        <div className='w-full z-[1] h-full flex flex-col justify-center items-center absolute'>
          <div className='text-center -mt-28'>
            {isSucceeed && (
              <>
                <Lottie
                  className='w-[550px] h-[550px]'
                  animationData={animationData}
                  loop={false}
                  autoplay={true}
                />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="-mt-32">
                  <h1 className="text-3xl font-bold mb-4">Wallet Top-Up Successful!</h1>
                  <p className="text-xl mb-2">Your funds have been added to your wallet.</p>
                  <p className="text-sm">Transaction ID: {payment_intent}</p>
                  <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    View Wallet Balance
                  </button>
                </motion.div>
              </>
            )}
            {isError && (
              <>
                <Lottie
                  className='w-[550px] h-[550px]'
                  animationData={errorAnimationData}
                  loop={false}
                  autoplay={true}
                />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="-mt-32">
                  <h1 className="text-3xl font-bold mb-4">Error Occurred!</h1>
                  <p className="text-xl mb-2">There was an issue processing your request.</p>
                  <p className="text-sm">Please try again later or contact support.</p>

                </motion.div>
              </>
            )}

            {isLoading && (
              <>
                <span className="loader12 text-primary"></span>
                <p className="mt-4 text-lg">Processing your top-up...</p>
                <p className="mt-2 text-sm">Please wait while we add funds to your wallet.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}