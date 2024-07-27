import  { useEffect, useRef } from 'react';

export default function ToLine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const div1Ref = useRef<HTMLDivElement | null>(null);
  const div2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;

    if (canvas && div1 && div2) {
      const rect1 = div1.getBoundingClientRect();
      const rect2 = div2.getBoundingClientRect();

      // Set the canvas dimensions to match the window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(rect1.x + rect1.width / 2, rect1.y + rect1.height / 2);
        ctx.lineTo(rect2.x + rect2.width / 2, rect2.y + rect2.height / 2);
        ctx.stroke();
      }
    }
  }, []);

  return (
    <div className="flex justify-center gap-9">
      <div ref={div1Ref}>Div 1</div>
      <div ref={div2Ref}>Div 2</div>
      <canvas ref={canvasRef} style={{position: 'absolute', top: 0, left: 0}} />
    </div>
  );
}
