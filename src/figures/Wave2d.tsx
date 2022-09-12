import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Icon from '../utils/Icon';
import { drawCircle, drawSquare } from './proton-drawers';

const N = 32;

const makeDensityMap = async (): Promise<Uint8Array> => {
  const res = await fetch('/images/t2wi.jpg');
  const blob = await res.blob();
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.src = URL.createObjectURL(blob);
    img.addEventListener('load', resolve);
  });
  const canvas = document.createElement('canvas');
  canvas.width = N;
  canvas.height = N;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, N, N);
  const imgData = ctx.getImageData(0, 0, N, N);
  const densityMap = new Uint8Array(N * N);
  for (let i = 0; i < N * N; i++) densityMap[i] = imgData.data[i * 4];
  return densityMap;
};

const Wave2d: FC = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradientX, setGradientX] = useState(0);
  const [gradientY, setGradientY] = useState(0);
  const [pause, setPause] = useState(false);
  const [protonType, setProtonType] = useState<'circle' | 'square'>('circle');
  const [applyDensity, setApplyDensity] = useState(true);
  const [densityMap, setDensityMap] = useState<Uint8Array | null>(null);
  const [k, setK] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const phasesRef = useRef<number[][]>();
  if (!phasesRef.current) {
    phasesRef.current = new Array(N).fill(0).map(_ => new Array(N).fill(0));
  }
  const phases = phasesRef.current;
  const lastRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    makeDensityMap().then(setDensityMap);
  }, []);

  useEffect(() => {
    if (!densityMap) return;
    const canvas = canvasRef.current!;
    let finished = false;
    const tick = (now: DOMHighResTimeStamp) => {
      if (finished || pause) return;
      const ctx = canvas.getContext('2d')!;
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const elapsed = lastRef.current ? now - lastRef.current : 0;
      lastRef.current = now;

      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          phases[x][y] +=
            (elapsed +
              ((x - N / 2) * gradientX) / 10 -
              ((y - N / 2) * gradientY) / 10) /
            300;
        }
      }
      setK({
        x: (phases[N - 1][0] - phases[0][0]) / (2 * Math.PI),
        y: (phases[0][0] - phases[0][N - 1]) / (2 * Math.PI)
      });

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#ffffff';
      const cellSize = width / N;
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          const phase = phases[x][y];
          const protonSize = applyDensity
            ? (cellSize * densityMap[y * N + x]) / 256 + 1
            : cellSize - 1;
          const cx = cellSize * x + cellSize / 2;
          const cy = cellSize * y + cellSize / 2;
          const drawer = protonType === 'circle' ? drawCircle : drawSquare;
          drawer(ctx, cx, cy, protonSize, phase);
        }
      }

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      finished = true;
    };
  }, [
    gradientX,
    gradientY,
    pause,
    phases,
    protonType,
    densityMap,
    applyDensity
  ]);

  const rephase = (kx: number, ky: number) => {
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        phases[x][y] =
          (x * kx * 2 * Math.PI) / (N - 1) - (y * ky * 2 * Math.PI) / (N - 1);
      }
    }
  };

  const handleRephaseClick = () => {
    rephase(0, 0);
  };

  const handleProtonTypeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = ev => {
    setProtonType(ev.target.checked ? 'square' : 'circle');
  };

  const handlePauseClick = () => {
    if (pause) {
      setPause(false);
      lastRef.current = performance.now();
    } else {
      setPause(true);
    }
  };

  return (
    <StyledDiv>
      <div className="wave-area">
        <canvas className="canvas" ref={canvasRef} width={300} height={300} />
        <input
          type="range"
          className="gradient-x"
          min={-10}
          max={10}
          value={gradientX}
          onChange={ev => setGradientX(Number(ev.target.value))}
          onMouseUp={() => setGradientX(0)}
        />
        <input
          type="range"
          className="gradient-y vertical"
          min={-10}
          max={10}
          value={gradientY}
          onChange={ev => setGradientY(Number(ev.target.value))}
          onMouseUp={() => setGradientY(0)}
        />
      </div>
      <div className="menu">
        <button
          className="rephase"
          color="primary"
          onClick={handleRephaseClick}
        >
          <Icon icon="replay" />
          &nbsp;Rephase
        </button>
        <button
          className="pause"
          color={pause ? 'secondary' : 'primary'}
          onClick={handlePauseClick}
        >
          {pause ? (
            <>
              <Icon icon="play_arrow" />
              &nbsp;Resume
            </>
          ) : (
            <>
              <Icon icon="pause" />
              &nbsp;Pause
            </>
          )}
        </button>
        <label>
          <input
            type="checkbox"
            className="square"
            onChange={handleProtonTypeChange}
            checked={protonType === 'square'}
          />
          Square
        </label>
        <label>
          <input
            type="checkbox"
            className="apply-density"
            onChange={() => setApplyDensity(!applyDensity)}
            checked={applyDensity}
          />
          Density
        </label>
        <div className="k-space-pane">
          <KSpace x={k.x} y={k.y} onKSpaceChange={rephase} />
        </div>
      </div>
    </StyledDiv>
  );
};

const KSpace: FC<{
  x: number;
  y: number;
  onKSpaceChange: (x: number, y: number) => void;
}> = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [down, setDown] = useState(false);
  const { x: kx = 0, y: ky = 0, onKSpaceChange } = props;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d')!;

    const imageData = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const idx = 4 * (x + y * width);
        const lumi = Math.floor(
          220 + 36 * Math.sin((x * kx) / Math.PI / 4 - (y * ky) / Math.PI / 4)
        );
        imageData.data[idx] = lumi;
        imageData.data[idx + 1] = lumi;
        imageData.data[idx + 2] = lumi;
        imageData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.ellipse(
      kx * 5 + width / 2,
      -ky * 5 + height / 2,
      5,
      5,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [kx, ky]);

  const handlePointerMove = (ev: React.PointerEvent) => {
    if (!down) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const clickX = ev.clientX - rect.x;
    const clickY = ev.clientY - rect.y;
    const kx = Math.round((clickX - rect.width / 2) / 5);
    const ky = Math.round(-(clickY - rect.height / 2) / 5);
    onKSpaceChange(kx, ky);
  };

  return (
    <canvas
      ref={canvasRef}
      className="k-space"
      width={100}
      height={100}
      onPointerDown={() => setDown(true)}
      onPointerMove={handlePointerMove}
      onPointerUp={() => setDown(false)}
    />
  );
};

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  .wave-area {
    flex: 0 0 auto;
    display: grid;
    grid-template-areas: 'v c' 'a h';
    grid-template-columns: var(--gridSize) calc(var(--gridSize) * 20);
    grid-template-rows: calc(var(--gridSize) * 20) var(--gridSize);
    .canvas {
      cursor: pointer;
      grid-area: c;
      width: 100%;
      height: 100%;
    }
    .gradient-x {
      grid-area: h;
    }
    .gradient-y {
      grid-area: v;
      -webkit-appearance: slider-vertical;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    gap: var(--gridSize);
    width: calc(var(--gridSize) * 8.5);
    .k-space-pane {
      grid-area: k;
      display: flex;
      align-items: center;
      padding: 5px;
    }
    .k-space {
      box-shadow: 0 0 8px 2px silver;
      touch-action: none;
    }
  }
`;

export default Wave2d;
