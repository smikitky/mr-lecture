import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { drawCircle } from './proton-drawers';

const N = 30;

const Wave1d: FC = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradient, setGradient] = useState(0);
  const phasesRef = useRef<number[]>();
  phasesRef.current = phasesRef.current ?? new Array(N).fill(0);
  const phases = phasesRef.current;
  const lastRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let finished = false;
    const tick = (now: DOMHighResTimeStamp) => {
      if (finished) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext('2d')!;
      const elapsed = lastRef.current ? now - lastRef.current : 0;
      lastRef.current = now;

      phases.forEach((phase, i) => {
        phases[i] += (elapsed + ((i - N / 2) * gradient) / 10) / 500;
      });

      ctx.fillStyle = '#ffffff';
      if (gradient !== 0) {
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        const luminance = 100 - Math.abs(gradient) * 5;
        grad.addColorStop(gradient > 0 ? 0 : 1, `hsl(220, 50%, ${luminance}%)`);
        grad.addColorStop(0.5, '#ffffff');
        grad.addColorStop(gradient > 0 ? 1 : 0, `hsl(30, 50%, ${luminance}%)`);
        ctx.fillStyle = grad;
      }
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#888888';
      phases.forEach((phase, i) => {
        ctx.beginPath();
        const h = height * (0.5 + 0.48 * Math.sin(phase));
        ctx.rect((i * width) / N, height - h - 5, width / N - 2, 10);
        ctx.fill();
        drawCircle(
          ctx,
          (i + 0.5) * (width / N),
          height / 2,
          width / N - 2,
          phase
        );
      });

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      finished = true;
    };
  }, [gradient, phases]);

  const handleSliderChange: ChangeEventHandler<HTMLInputElement> = ev => {
    setGradient(Number(ev.target.value));
  };

  const handleSliderMoueUp = () => {
    setGradient(0);
  };

  const handleRephaseClick = () => {
    phases.fill(0);
  };

  return (
    <StyledDiv>
      <div className="menu">
        <button onClick={handleRephaseClick}>Rephase</button>
      </div>
      <canvas ref={canvasRef} className="canvas" />
      <input
        className="slider"
        type="range"
        min={-10}
        max={10}
        value={gradient}
        onChange={handleSliderChange}
        onMouseUp={handleSliderMoueUp}
      />
    </StyledDiv>
  );
};

export default Wave1d;

const StyledDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 30px 1fr 30px;
  gap: 10px;
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .canvas {
    min-height: 0;
    width: 100%;
    height: 100%;
  }
  .slider {
    display: block;
    background: orange;
    border: 1px solid red;
  }
`;
