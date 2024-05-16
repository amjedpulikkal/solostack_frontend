
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Home(): JSX.Element {
    console.log("communication ");
    const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    const handleAdd = () => {
        setArr([...arr, 2]);
    };

    const handlePull = () => {
        const newArr = [...arr];
        newArr.splice(Math.floor(newArr.length / 2), 1); 
        setArr(newArr);
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">


            <div className="grid grid-cols-11 gap-4">

                <AnimatePresence >
                    {arr.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring" }}
                            className="w-28 h-28 bg-slate-700 rounded-full">
                                {item}
                        </motion.div>
                    ))}
                       
                </AnimatePresence>
            </div>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handlePull}>Pull</button>
        </div>
    );
}
