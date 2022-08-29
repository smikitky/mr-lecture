import React, {
  FC,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useImmer } from 'use-immer';
import { fft } from 'fft-js';
import styled from 'styled-components';

const N = 512;

const FourierGraph: FC = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [input, setInput] = useImmer<number[]>(() => new Array(N).fill(0));
  const fftResults = useMemo(() => fft(input), [input]);
  const [prevPos, setPrevPos] = useState<{ x: number; y: number } | undefined>(
    undefined
  );
  const [maxLines, setMaxLines] = useState(10);
  const [drawMain, setDrawMain] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [showAmps, setShowAmps] = useState(true);

  const draw = useCallback(() => {
    const canvas = canvasRef.current!;
    const { width, height } = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, width, height);
    const sum = new Array(N).fill(0);

    const rawToLocal = (x: number, y: number) => {
      return { x: (x * width) / N, y: height / 2 - y };
    };

    // base line
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#888888';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // sin waves
    ctx.strokeStyle = '#00aaff';
    ctx.lineWidth = 1;
    for (let k = 0; k < maxLines; k++) {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < N; x++) {
        const w = (2 * Math.PI * k) / N;
        const w2 = (2 * Math.PI * (N - k)) / N;
        let y =
          Math.cos(w * x) * fftResults[k][0] -
          Math.sin(w * x) * fftResults[k][1];
        if (k > 0)
          y +=
            Math.cos(w2 * x) * fftResults[N - k][0] -
            Math.sin(w2 * x) * fftResults[N - k][1];
        y /= N;
        sum[x] += y;
        const pos = rawToLocal(x, y);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();
    }

    // sum wave
    ctx.strokeStyle = '#0000ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < N; x++) {
      const pos = rawToLocal(x, sum[x]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();

    // main wave
    if (drawMain) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ff0000';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < N; x++) {
        const pos = rawToLocal(x, input[x]);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();
    }
  }, [drawMain, fftResults, input, maxLines]);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
    setPrevPos(undefined);
  };

  const handlePointerMove = (ev: React.MouseEvent) => {
    if (!dragging) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clickX = ev.clientX - rect.left;
    const clickY = ev.clientY - rect.top;
    const x = Math.floor((clickX / rect.width) * N); // 0 - (N-1)
    const y = rect.height / 2 - clickY;
    if (x <= 0 || N - 1 <= x) return;
    setInput(input => {
      if (!prevPos) {
        input[x] = y;
        return;
      }
      const min = Math.min(prevPos.x, x);
      const max = Math.max(prevPos.x, x);
      let xx = min;
      while (xx < max) {
        input[xx] =
          (x * prevPos.y - prevPos.x * y + (y - prevPos.y) * xx) /
          (x - prevPos.x);
        xx++;
      }
      input[x] = y;
    });
    setPrevPos({ x, y });
  };

  const handleMaxLinesChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.target.value);
    setMaxLines(Math.min(Math.max(0, value), N));
  };

  useEffect(() => {
    draw();
  }, [draw, input, fftResults, maxLines, drawMain]);

  useEffect(() => {
    let finished = false;
    const canvas = canvasRef.current!;
    const tick = () => {
      if (finished) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        draw();
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      finished = true;
    };
  }, [draw]);

  return (
    <StyledDiv>
      <div className="menu">
        <button onClick={() => setMaxLines(0)}>zero</button>
        <input type="number" value={maxLines} onChange={handleMaxLinesChange} />
        <label>
          <input
            type="checkbox"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setDrawMain(ev.target.checked)
            }
            checked={drawMain}
          />
          Draw main
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setShowAmps(ev.target.checked)
            }
            checked={showAmps}
          />
          Smplitudes
        </label>
      </div>
      <canvas
        ref={canvasRef}
        className="canvas"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
      />
      {showAmps && <AmpDisplay fftResults={fftResults} />}
    </StyledDiv>
  );
};

const AmpDisplay: FC<{
  max?: number;
  fftResults: [number, number][];
}> = React.memo(props => {
  const { max = 15, fftResults } = props;
  const items = fftResults
    .slice(0, max)
    .map(f => [f[0], f[1], Math.sqrt(f[0] * f[0] + f[1] * f[1])]);
  const maxF = Math.max(...items.map(i => i[2]));
  return (
    <div className="amplitudes-card">
      <div>成分</div>
      <ul className="amplitudes-list">
        {items.map((item, i) => {
          return (
            <li key={i} className="amp">
              <div
                className="bar"
                style={{ right: `${100 - (item[2] / maxF) * 100}%` }}
              />
              <div>
                {i}: {item[2].toFixed(2)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas: 'm m' 'c a';
  grid-template-rows: calc(var(--fontSize) * 1.4) auto;
  grid-template-columns: calc(var(--fontSize) * 23) auto;
  justify-content: center;
  gap: 10px 0;
  .menu {
    grid-area: m;
    display: flex;
    flex-flow: row;
    gap: 15px;
    align-items: center;
  }
  .canvas {
    width: 100%;
    height: 100%;
    grid-area: c;
    cursor: crosshair;
    background: white;
    touch-action: none;
  }
  .amplitudes-card {
    grid-area: a;
    padding: 10px;
    width: 120px;
    user-select: none;
    margin-left: 10px;
    min-height: 0;
    min-width: 0;
    overflow: auto;
    & h2 {
      font-size: 15px;
      font-weight: bold;
      margin: 0 0 10px 0;
    }
  }
  .amplitudes-list {
    margin: 0;
    padding: 0;
    liststyle-type: none;
    font-size: calc(var(--fontSize) * 0.5);
    & li {
      line-height: 1.2;
      background-repeat: no-repeat;
      margin-bottom: 2px;
      position: relative;
      z-index: 0;
      & .bar {
        background: #ccccff;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
  }
`;

export default FourierGraph;
