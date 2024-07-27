import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'


type props = {
    price: string,
    setPrice: React.Dispatch<React.SetStateAction<string>>,
    type: string,
    setType: React.Dispatch<React.SetStateAction<string>>
    , setIsInitial: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PaymentInitial({ price, setPrice, type, setType, setIsInitial }: props) {
    const [error, setError] = useState<string | null>(null);
    const [ isValidations,setISValidations] = useState(false)
    const validations = [
        { regex: /^$/, message: "Please enter an amount." },
        { regex: /^0+$/, message: "Amount cannot be zero." },
        { regex: /^0\d+$/, message: "Amount cannot start with zero." },
        { regex: /^\d{6,}$/, message: "Amount cannot exceed 99999." },
        { regex: /^[1-4]\d?$/, message: `Minimum amount is 50 ${type.toUpperCase()}.` },
        { regex: /^[1-9]\d*$/, isValid: true, message: "Valid amount." }
    ];
    const validatePrice = (): string | null => {
        for (const validation of validations) {
            if (validation.regex.test(price)) {
                return validation.isValid ? null : validation.message;
            }
        }
        return "Invalid amount.";
    }

    const handleOnChange = (e: React.FormEvent<HTMLDivElement>) => {
        let content = e.currentTarget.textContent?.trim() ?? '';


        content = content.replace(/\D/g, '');

        if (/^[0-9]{1,5}$/.test(content)) {
            setPrice(content);
            setISValidations(false)

        } else if (content === '') {
            setPrice('0');
            setISValidations(true)
        }

        const validationError = validatePrice();
        if (validationError) {
            setError(validationError)
            setISValidations(true)
        } else {
            setError(null)
            setISValidations(false)
        }

        if (content.length > 5) {
            e.currentTarget.textContent = price

        } else {

            e.currentTarget.textContent = content.slice(0, 5);
        }

    };
    const handelOnClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setType(e.target.value)
    }
    return (
        <>
            <div className='w-full h-full flex  justify-center  items-center '>
                <div className=" h-80 w-80 flex flex-col gap-5">
                    <div className=" flex justify-center gap-2 uppercase font-bold ">
                        {type} <p onInput={handleOnChange} className='focus:outline-none border-b-2 min-w-20 border-dashed border-gray-300 text-center font-bold text-6xl' contentEditable>  {price}</p>

                    </div>
                    <div className='flex justify-center gap-3'>
                        <div className='flex items-center gap-2'>
                            <Input type="radio" name='type' checked={type === "usd"} onClick={handelOnClick} value="usd" />
                            <p>USD</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Input type="radio" checked={type === "inr"} onClick={handelOnClick} name='type' value="inr" />
                            <p>INR</p>
                        </div>

                    </div>
                    {error && <p className="text-red-500 -mt-5 text-sm text-center">{error}</p>}
                    <Button disabled={isValidations} onClick={() => setIsInitial(false)}>Top Up</Button>
                    <p className="text-sm text-center text-gray-500">
                        Minimum top-up amount: 50 {type.toUpperCase()}
                    </p>
                </div>
            </div>

        </>
    )
}
