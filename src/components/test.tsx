// import { Button } from "./ui/button"

// export default function Test(): JSX.Element {

//     return (
//         <div className="w-screen h-screen flex justify-center items-center">
//             <span className="wrapper w-[800px] ">
//                 <svg className="">
//                     <text x="50%" y="50%" dy=".35em" text-anchor="middle">
//                         SoloStack
//                     </text>
//                 </svg>
//             </span>
//         </div>

//     )
// }

import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { CiStar } from "react-icons/ci";
import { FaArrowCircleRight } from "react-icons/fa";

import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
export default function Test() {
  const [star, setStar] = useState(0);
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="">
          {/* <div className=" flex justify-center ">
            <img
              className="w-40 h-40 bg-fuchsia-400 rounded-full"
              src=""
              alt=""
            />
          </div> */}
          <div className=" bg-background p-3 pt-3 mt-2 rounded-2xl">
            <div className="flex items-center gap-2 ">
              <img className=" w-10 h-10 rounded-full" src="https://static.vecteezy.com/system/resources/previews/000/439/863/large_2x/vector-users-icon.jpg" alt="" />
             <div className="">
             <p className="capitalize">amjedpulikkal</p>
              <p className="capitalize text-xs dark:text-white/40 text-black/40">@amjed_pulikkal</p>
              </div>
            </div>
            <div className=" mt-2 flex justify-start gap-3">
              {[1, 2, 3, 4, 5].map((item) => {
                if (star >= item) {
                  return (
                    <FaStar
                      onClick={() => setStar(item - 1)}
                      className="drop-shadow-2xl shadow-yellow-300 text-yellow-300 transition-colors"
                      size={30}
                    />
                  );
                } else {
                  return (
                    <CiStar
                      onClick={() => setStar(item)}
                      className=" text-primary hover:text-yellow-300 transition-colors"
                      size={30}
                    />
                  );
                }
              })}
            </div>
            <Textarea className="mt-2 w-80 h-48"></Textarea>
            <Button className="w-full mt-3 cle">Submit and next <FaArrowCircleRight size={18} className="ml-2"/> </Button>
          </div>
        </div>
      </div>
    </>
  );
}
