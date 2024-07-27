import React from 'react'

import { DataTable } from '@/components/mentor/dataTable'
import { motion } from 'framer-motion'
import { useSearchAuthors } from '@/reactQuery/admin/mentorApi'


export const AllAuthors = ({author}) => {
    const [rowSelection, setRowSelection] = React.useState({})
    const {data}=useSearchAuthors(author)
    console.log(rowSelection)
    return (
        <motion.div className=''>
            <div className=' grid grid-cols-12 item-center'>
                <div className='w-36 md:w-64  md:ml-10 col-span-6 md:col-span-3  h-32 md:h-36 rounded-2xl  border border-primary'>
                    <p className='ml-3 mt-3 font-semibold text-base md:text-xl'>Total {author}</p>
                    <p className='text-5xl md:text-7xl text-center' >{data?.length || 0}</p>
                </div>
                <div className=' w-36 md:w-64 col-span-6 md:col-span-3 ml-10 h-32 md:h-36 rounded-2xl  border border-primary'>
                    <p className='ml-3 mt-3 font-semibold text-base md:text-xl'>Total online

                        <span className="ml-1">
                            <span id="cartN-1" className=" inline-flex rounded-full h-3 w-3 bg-green-500">
                                <span className="animate-ping duration-200  inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                            </span>
                        </span>
                    </p>
                    <p className='text-5xl md:text-7xl text-center' >19</p>
                </div>
            </div>
            <div>
                <DataTable data={data||[]} rowSelection={rowSelection} setRowSelection={setRowSelection} />
            </div>
        </motion.div>
    )
}
