import { useTheme } from "@/components/theme-provider";
import  { useEffect, useRef } from "react";


export function RoundCountdownTimer({time}:{time:number}) {
 const {theme} =useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let fill: NodeJS.Timeout 
  const no  = useRef(time)
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        // no.current = 50
      fill = setInterval(() => draw(ctx, time), 1000);
    }

    return () => clearInterval(fill);
  }, []);

  const draw = (ctx: CanvasRenderingContext2D, time: number) => {
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    const diff = (no.current / time) * Math.PI * 2 * 10;
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 25
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "green";
    ctx.textAlign = "center";
    ctx.font = "40px monospace";
    ctx.fillStyle = theme == "dark"?"white":"black"
    ctx.fillText(no.current.toString(), 110, 125);
  
    ctx.beginPath();
    ctx.arc(110, 110, 70, 4.72, diff / 10 + 4.72);
    ctx.stroke();

    if (no.current === 0) {
      clearInterval(fill);
    }
    no.current--;
  };

  return <canvas ref={canvasRef} width={220} className="w-20 h-20" height={220} />;
}
