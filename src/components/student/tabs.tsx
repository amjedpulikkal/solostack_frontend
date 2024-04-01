import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  

  
export default function StudentTabs(): JSX.Element {

    return (
        <TabsContent value="Mentors" className="h-full w-full p-5 ">
            <motion.div variants={container}
                initial="hidden"
                animate="visible" className=' grid mt-14 mb-16 grid-cols-12'>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17].map((index) => (
                    <motion.div key={index} variants={item} className='item bg-slate-400 mt-3 col-span-2 h-52 w-48 rounded-3xl flex items-end'>
                        <Skeleton className=' h-11 w-full rounded-b-3xl flex justify-between  '>
                            <div className='flex ml-4 mt-2'>
                                {/* <div></div> */}
                            </div>
                            <div></div>
                        </Skeleton>
                    </motion.div>
                ))}

            </motion.div>
        </TabsContent>
    )

}