import { PiChalkboardTeacherFill } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import { BsChatSquareFill } from "react-icons/bs";
import { TbCoinMoneroFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
function NaveBarForM() {
    return (
        <div className="w-full md:hidden fixed bottom-3 h-14 flex justify-center items-center ">
            <div className="w-[90%] h-full dark:bg-stone-900 flex justify-evenly items-center  bg-white  rounded-3xl">
                <NavLink className={({ isActive }) =>
                    isActive ? "*:text-primary  transition-colors " : " *:hover:text-primary transition-colors"
                } to={"/student"} end>
                    <motion.div className=" dark:bg-stone-900  bg-white   hover:p-2 rounded-full" whileHover={{ y: -10, scale: 1.3 }}>
                        <TiHome size={45} />
                    </motion.div>

                </NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
                } to={"/student/mentor"}>
                    <motion.div className=" dark:bg-stone-900  bg-white   hover:p-2 rounded-full" whileHover={{ y: -10, scale: 1.3 }}>

                        <PiChalkboardTeacherFill size={45} />
                    </motion.div>

                </NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
                } to={"/student/chat"}>
                    <motion.div className=" dark:bg-stone-900  bg-white   hover:p-3 rounded-full" whileHover={{ y: -12, scale: 1.3 }}>

                        <BsChatSquareFill size={35} />
                    </motion.div>

                </NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "*:text-primary  transition-colors" : " *:hover:text-primary transition-colors"
                } to={"/student/payment"}>
                    <motion.div className=" dark:bg-stone-900  bg-white   hover:p-3 rounded-full" whileHover={{ y: -10, scale: 1.3 }}>

                        <TbCoinMoneroFilled size={35} />
                    </motion.div>

                </NavLink>


            </div>
        </div>
    )
}

export default NaveBarForM