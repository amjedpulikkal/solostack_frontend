

// import { CountdownTimer } from "@/components/CountdownTimer";
// import {  motion } from "framer-motion";

// const framer_error = {
//     initial: { opacity: 0, y: 10 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: 10 },
//     transition: { duration: 0.2 },
// }

// import { TabsContent, } from "@/components/ui/tabs"
// export function ReviewTamp({ date }) {

//     if (date) {

//         return (

//             <TabsContent className={true?"bg-black mt-3 ml-3 dark:bg-black/80 blur-md bg-white/30":"mt-3 ml-3"} value="Conversations" >
//                 <motion.div  {...framer_error} className="">
//                     <div className=" text-xl">
//                         <p>{date.toDateString()}</p>
//                     </div>
//                     <div className="font-bold  text-8xl">
//                         <p>{date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:{date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}</p>
//                         <p></p>
//                     </div>
//                     <div className="text-xl mt-3">
//                         <p>Time remaining</p>
//                     </div>
//                     <div className="font-medium text-5xl mt-1 ">
//                         <CountdownTimer endTime={date} />
//                     </div>
//                 </motion.div>

//             </TabsContent>
//         )
//     } else {
//         return (

//             <TabsContent value="Conversations" className="mt-3 ml-3 w-full h-full ">



//                 <div className="bg-white w-full h-[79.8%] rounded-es-3xl">
//                     qqqqqqqqq
//                 </div>


//             </TabsContent>
//         )

//     }
// }

