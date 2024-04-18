import { TabsContent } from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { usGetAllMentor } from "@/reactQuery/mentor/mentorQuery";
import { Car } from "lucide-react";
import { IoMdClose } from "react-icons/io";
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

const categoryAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}
import { DatePickerDemo } from '@/components/datePicker'
import { Input } from '@/components/ui/input'

export default function StudentTabs(): JSX.Element {

  const { data, isLoading, isSuccess } = usGetAllMentor()

  const [category, setCategory] = useState<string[]>([])
  if (isSuccess) {

    console.log(data)
  }
  return (
    <TabsContent value="Mentors" className="h-full w-full p-5 ">
      <div className="w-full flex justify-end">
        <div className="grid grid-cols-3 gap-2">
          <Input type="search" placeholder="Search mentor" />
          <Input  onPaste={(e) => setCategory([...category, e.target.value])} type="search" placeholder="category" />
          <DatePickerDemo />
        </div>
      </div>
      <div className="flex justify-start mt-5">
        {/* <AnimatePresence mode="popLayout" > */}

        {category.map((item, index) => (

          <motion.div key={index} {...categoryAnimation} className="flex bg-primary ml-2 rounded-full px-3 py-1 ">
            {item}
            <button className="ml-2" onClick={() => {

              setCategory([...category.filter((t, i) => i !== index)])
            }}>
              <IoMdClose color="black" size={20} />
            </button>
          </motion.div>

        ))}

        {/* </AnimatePresence> */}

      </div>
      <motion.div variants={container}
        initial="hidden"
        animate="visible" className=' grid mt-14 mb-16 grid-cols-12'>
        {data?.map((index) => (
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
    </TabsContent >
  )

}