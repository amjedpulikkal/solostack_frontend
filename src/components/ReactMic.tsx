import React, { useRef, useState, useEffect, MutableRefObject } from 'react';
import PropTypes from 'prop-types';

const ReactMic: React.FC<{
  backgroundColor?: string;
  className?: string;
  width?: number;
  height?: number;
  stream:MediaStream
}> = (props) => {
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const initMicrophone = async () => {
      try {
        // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const stream = props.stream

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const canvas = visualizerRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          setCanvasCtx(ctx);
          if (ctx) {
            visualize(ctx, analyser);
          }
        }
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    initMicrophone();

    return () => {
      if (canvasCtx) {
        canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
      }
    };
  }, [canvasCtx,props.stream]);

  const visualize = (ctx: CanvasRenderingContext2D, analyser: AnalyserNode) => {
    const draw = () => {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const numLines = 3;
      const lineSpacing = ctx.canvas.width / (numLines + 1);
      const centerY = ctx.canvas.height / 2;

      ctx.strokeStyle ="white"
     
      ctx.lineCap = "round"
      ctx.lineWidth =6

      for (let i = 0; i < numLines; i++) {
        const lineX = lineSpacing * (i + 1);
        const barHeight = dataArray[i] * (ctx.canvas.height / 650);

        ctx.beginPath();
        ctx.moveTo(lineX, centerY);
        ctx.lineTo(lineX, centerY + barHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(lineX, centerY);
        ctx.lineTo(lineX, centerY - barHeight);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();
  };

  return (
    <canvas
      ref={visualizerRef}
      className={props.className || 'visualizer'}
      width={props.width || 640}
      height={props.height || 100}
    />
  );
};

ReactMic.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ReactMic;
