import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef } from "react";

function IntelPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;

    const rect1 = div1?.getBoundingClientRect();
    const rect2 = div2?.getBoundingClientRect();

    // Set the canvas dimensions to match the window
    
    canvas.width = window.innerWidth-200;
    canvas.height = window.innerHeight-300;
    console.log(window.innerWidth,window.innerHeight)

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    let dashOffset = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      ctx.setLineDash([10, 10]); 
      ctx.lineDashOffset = dashOffset;
      
      ctx.strokeStyle ="red"
      ctx.beginPath();
      ctx.moveTo(rect1.x + rect1.width / 2, rect1.y + rect1.height / 2);
      ctx.lineTo(rect2.x + rect2.width / 2, rect2.y + rect2.height / 2);
      ctx.stroke();

      dashOffset++;
      if (dashOffset > 15) {
        dashOffset = 0;
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(draw);
    };
  }, []);

  return (
    <>
      <div className="  flex justify-center items-center">
        <div>
          <div className="flex justify-center gap-28">
            
            <img className="w-44 h-44 rounded-full z-10 outline outline-1  bg-slate-800" src="https://img.freepik.com/premium-photo/man-with-beard-beard-blue-circle-generative-ai_902639-79016.jpg?w=740" ref={div2Ref}></img>
            <img className="w-44 h-44 rounded-full z-10 outline outline-1  bg-slate-800"src="https://www.svgrepo.com/show/382101/male-avatar-boy-face-man-user.svg" ref={div1Ref}></img>
            <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
          </div>
         <div className="flex justify-center"> <Skeleton className="bg-transparent t">connecting...</Skeleton></div>
        </div>
      </div>
    </>
  );
}

export default IntelPage;
