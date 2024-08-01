
import { motion, useScroll } from 'framer-motion'
import React, { useEffect, useRef } from 'react'



const imgAnimation = {
    animate: {
        scale: [0.5, 1, 1, 0.5, 0.5],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
    },
    transition: {
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
    }
}


const imgAnimation2 = {
    animate: {
        x: [0, 25, 0],
        y: [25, 0, 25]

    },
    transition: {
        duration: 2,
        ease: "easeInOut",

        repeat: Infinity,

    }
}


import { useAnimationControls } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
// const wrapperVariants = {
//   hidden: { opacity: 0, x: '100vw' },
//   visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 0.1 } },
//   exit: { x: '-100vh', transition: { ease: 'easeInOut' } },
// };


function LandingPage() {
    const navigate = useNavigate()
    const controls = useAnimationControls();
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        console.log(scrollYProgress)
    }, [scrollYProgress])
    const constraintsRef = useRef(null)
    return (
        <>
            <svg width="100" height="100" viewBox="0 0 100 100" className='fixed z-[51] bg right-0 bottom-0'>
                {/* <circle cx="50" cy="50" r="30" pathLength="1" className="bg w-4" /> */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                   
                    pathLength="5"
                    className="indicator fill-none"
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>
            <div className="p-10">
                <div className='flex justify-end w-full h-4 '>
                    {/* <ModeToggle /> */}
                    <img src="/SoloStack (2).png" className="hidden dark:block scale-150" alt="" />
                    <img src="/SoloStack (1).png" className="dark:hidden" alt="" />
                    {/* <div className='flex justify-center  items-center  h-60'>
                    </div> */}
                </div>
            </div>
            <div className='relative' ref={constraintsRef}>
                <div className=' w-full flex justify-center z-30'>
                    <div className='w-1/2'>

                        <p className='text-center zen-dots-regular text-[62px]'>
                            Unlock Your Coding Potential with  Solo<samp className=' text-primary zen-dots-regular '>Stack</samp>
                        </p>
                        <div className=' flex justify-center '>
                            <p className='yantramanav-regular w-80 font-[20px]  text-center'>
                                Connect with mentors, learn from experienced developers, and grow your coding network
                            </p>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <motion.button whileHover={{ scale: 1.2 }} onClick={() => navigate("/signUp")} className=' zen-dots-regular text-lg bg-primary h-10 px-4 py-2 text-primary-foreground hover:bg-primary/90 rounded-3xl'>Get Start</motion.button>
                        </div>
                    </div>
                </div>
                <motion.img {...imgAnimation} drag dragConstraints={constraintsRef}
                    className=' absolute top-0 left-36' src="/Group 2221 (1).png" alt="" />
                <motion.img {...imgAnimation2} drag dragConstraints={constraintsRef} src="/Blend Group 6.png" className='absolute top-52 left-52' alt="" />
                <motion.img

                    {...imgAnimation2} drag dragConstraints={constraintsRef}
                    className='absolute right-36 top-3 h-28 rotate-12' src="/Group 2222.png" alt="" />
                <motion.img initial={{ x: 700 }} animate={{ x: 1 }} transition={{ delay: 0.3, type: "just" }} src="Group 2232 (1).png " className='w-64  absolute right-0 -mt-52' alt="" />
                <motion.img initial={{ x: -700 }} animate={{ x: 1 }} transition={{ delay: 0.4 }} src="/Group 2217 (2).png" className='w-[460px]' alt="" />
            </div>
            <div className='flex justify-center f'>
                <p className='text-[65px] font-bold'>What is Solo<samp className=' text-primary  '>Stack</samp>?</p>
            </div >
            <div className='flex justify-center  gap-7 p- w-full  px-11 '>
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    
                    className=' relative flex gap-12 justify-center w-1/2 py-5 h-80 bg-[#2b2a2a60]  rounded-3xl' >
                    <div className='h-1/2 w-1/4 bg-[#454545] rounded-full flex justify-center items-center'>
                        <motion.img whileHover={{ scale: 1.4 }} src="/download-removebg-preview 1.png" alt="" />
                    </div>
                    <div className='w-3/5 h-full'>
                        <p className='text-[30px] font-semibold'>Breaking Down Barriers in Learning</p>

                        <p className='mt-8 text-lg'>
                            Solostack is a platform designed to bridge the gap between self-taught developers and experienced mentors. Whether you're a student seeking guidance or a mentor eager to share your knowledge, Solostack fosters a supportive community for all.
                        </p>
                    </div>
                    <img src="/Group 2219 (1).png" className='absolute bottom-0 left-0 h-28' alt="" />
                </motion.div>
                <motion.div initial={{ scale: 0 }}   viewport={{ once: true }}
                    whileInView={{ scale: 1 }} className='relative flex gap-12 justify-center w-1/2 py-5 h-80 bg-[#2b2a2a60]  rounded-3xl' >
                    <div className='w-3/5 h-full'>
                        <p className='text-[30px] font-semibold'>Learn from the Best, Become the Best</p>

                        <p className='mt-8 text-lg'>
                            Our platform connects students with mentors based on skill level, project needs, and interests. Get personalized mentorship, overcome challenges, and gain valuable insights from industry professionals.
                        </p>
                    </div>
                    <div className='h-1/2 w-1/4 bg-[#454545] rounded-full flex justify-center items-center'>
                        <motion.img  viewport={{ once: true }} whileHover={{ scale: 1.4 }} src="/Screenshot_from_2024-05-30_11-44-28-removebg-preview 1.png" alt="" />
                    </div>
                    {/* <img src="/Group%202222.png" className='absolute bottom-0 right-10 h-28' alt="" /> */}

                </motion.div>
            </div >
            <img className='absolute right-0 h-52'  src="/642c72250420bf7456b54c37_Blob_Splashes_-_Green_Gradient_Clay_-_Hovering-tl-removebg-preview 1.png" alt="" />
            <div className='flex justify-around mt-20'>
                <div className='w-1/4 h-[450px] bg-[#2b2a2a60] rounded-full'>
                    <div className='flex justify-center'>
                        <div className='w-[90%] h-80 -mt-14 bg-background rounded-full flex justify-center flex-col items-center'>
                            <motion.img   viewport={{ once: true }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} src="/Vector.png" alt="" />
                            <p className='text-[40px] -mb-6'>Student</p>
                        </div>
                    </div>
                    <p className='text-center text-lg mt-4 px-9 '>
                        Accelerate your learning with the help of experienced mentors.
                    </p>
                </div>
                <div className='w-1/4 h-[450px] bg-[#2b2a2a60] rounded-full'>
                    <div className='flex justify-center'>
                        <div className='w-[90%] h-80 -mt-14 bg-background rounded-full flex justify-center flex-col items-center'>
                            <motion.img   viewport={{ once: true }} initial={{ scale: 0 }} whileInView={{ scale: 1 }} src="/Vector.png" alt="" />
                            <p className='text-[40px] -mb-6'>Mentor</p>
                        </div>
                    </div>
                    <p className='text-center text-lg mt-4'>
                        Share your passion for coding and empower the next generation of developers
                    </p>
                </div>

            </div>
            <p className='text-center text-[45px] px-36 mt-10  font-bold'>
                Unleash Your Coding Potential with Solo<samp className=' text-primary  '>Stack</samp> Powerful Features
            </p>

            <img className='absolute left-0 h-[450px]' src="/642c72250420bf7456b54c37_Blob_Splashes_-_Green_Gradient_Clay_-_Hovering-tl-removebg-preview 2.png" alt="" />
            <img className='absolute right-0 mt-60  h-[450px]' src="/642c72250420bf7456b54c37_Blob_Splashes_-_Green_Gradient_Clay_-_Hovering-tl-removebg-preview 1.png" alt="" />
            <div className='w-full flex justify-center px-32 mt-10 '>
                <div className='w-full px-8  py-6 dark:bg-black/30 backdrop-blur-md bg-white/30  z-50 rounded-3xl overflow-hidden'>
                    <motion.div initial={{ x: -650 }}  viewport={{ once: true }} whileInView={{ x: 0 }}>
                        <p className='text-[30px]'> . Seamless Video Calls</p>
                        <p className='w-3/5'>Schedule and conduct high-quality video sessions with your mentor/student. Discuss projects, share your screen, and receive real-time feedback in a face-to-face setting.</p>
                    </motion.div>

                    <motion.div initial={{ x: 650 }}  viewport={{ once: true }} transition={{ delay: 0.3 }} whileInView={{ x: 0 }} className='flex justify-end items-end flex-col'>
                        <p className='text-[30px]'> Interactive Chat Community.</p>
                        <p className='w-3/5 text-end'>Engage with fellow students and mentors in our vibrant chat forum. Ask questions, share resources, troubleshoot challenges, and participate in coding discussions – all within the platform.</p>

                    </motion.div>
                    <motion.div initial={{ x: -650 }}  viewport={{ once: true }} transition={{ delay: 0.4 }} whileInView={{ x: 0 }}>
                        <p className='text-[30px]'> . Personalized Mentorship</p>
                        <p className='w-3/5'>Get matched with a compatible mentor based on your skill level and project needs. Receive personalized guidance, overcome roadblocks, and accelerate your learning journey.</p>

                    </motion.div>
                    <motion.div initial={{ x: 650 }}  viewport={{ once: true }} transition={{ delay: 0.5 }} whileInView={{ x: 0 }} className='flex justify-end items-end flex-col'>
                        <p className='text-[30px]'> Empowering Mentorship</p>
                        <p className='w-3/5 text-end'>Share your knowledge and passion for coding by becoming a mentor. Help aspiring developers, give back to the community, and stay connected with the latest trends.</p>

                    </motion.div>
                </div>
            </div>

            <div className='zen-dots-regular text flex flex-col items-center justify-center pb-32  mt-32 relative overflow- z-50'>
                <div >

                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}  viewport={{ once: true }} className='text-[35px]' >
                        Ready to Unleash Your Coding Potential?</motion.p>

                    <motion.p initial={{ opacity: 0 }}  viewport={{ once: true }} transition={{ delay: 0.4 }} whileInView={{ opacity: 1 }} className='text-[26px]'>
                        Sign up on Solostack today and start your coding journey!
                    </motion.p>
                    <div className='flex justify-center mt-9'>
                        {/* <Button className='w-60  h-14 zen-dots-regular text-lg'>Get Start</Button>*/}
                        <motion.button onClick={() => navigate("/signUp")} initial={{ opacity: 0 }} whileHover={{ scale: 1.2 }} transition={{ delay: 0.6 }} whileInView={{ opacity: 1 }} className=' zen-dots-regular text-lg bg-background w-60  h-14px-4 py-2  hover:bg-background/90 rounded-3xl'>Get Start</motion.button>

                    </div>
                </div>
                <div className='flex justify-center items-end absolute w-screen h-screen   -z-50 overflow-hidden '>

                    <motion.div
                        animate={controls} variants={{ start: { scale: 150   }, stop: { scale: 0,transition:{duration:0.5} } }}

                        transition={{ duration: 0.5 }} className='h-5 w-5 flex justify-center  bg-primary  rounded-full'>

                    </motion.div>
                </div>

                <motion.div className="w-10 h-10 bg-primary  absolute -bottom-20"
                    onViewportEnter={() => controls.start("start")}
                    onViewportLeave={() => controls.start("stop")}
                />
            </div>

        </>
    )
}

export default LandingPage