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
import classNames from 'classnames';

const N = 512;

const FourierGraph: FC = props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [input, setInput] = useImmer<number[]>(() => new Array(N).fill(0));
  const fftResults = useMemo(() => fft(input), [input]);
  const [prevPos, setPrevPos] = useState<{ x: number; y: number } | undefined>(
    undefined
  );
  const [maxLines, setMaxLines] = useState(0);
  const [highlighted, setHighlighted] = useState<null | number>(null);
  const [drawSum, setDrawSum] = useState(true);
  const [dragging, setDragging] = useState(false);

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
    for (let k = 0; k < maxLines; k++) {
      ctx.beginPath();
      ctx.lineWidth = k === highlighted ? 5 : 1;
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
    if (drawSum) {
      ctx.strokeStyle = '#0000ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (let x = 0; x < N; x++) {
        const pos = rawToLocal(x, sum[x]);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();
    }

    // main wave
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < N; x++) {
      const pos = rawToLocal(x, input[x]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
  }, [drawSum, fftResults, input, maxLines, highlighted]);

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
  }, [drawSum, input, fftResults, maxLines, draw]);

  useEffect(() => {
    let finished = false;
    const tick = () => {
      const canvas = canvasRef.current!;
      if (finished || !canvas) return;
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

  const handleAmpClick = (i: number) => {
    if (highlighted !== i) setHighlighted(i);
    else setHighlighted(null);
  };

  return (
    <StyledDiv>
      <div className="menu">
        <div className="num-waves">
          <input
            type="number"
            value={maxLines}
            onChange={handleMaxLinesChange}
          />
          <button onClick={() => setMaxLines(0)}>Zero</button>
        </div>
        <label>
          <input
            type="checkbox"
            onChange={ev => setDrawSum(ev.target.checked)}
            checked={drawSum}
          />
          Draw Sum
        </label>
        <button onClick={() => setInput(new Array(N).fill(0))}>Reset</button>
      </div>
      <canvas
        ref={canvasRef}
        className="canvas"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
      />
      <AmpDisplay
        fftResults={fftResults}
        onClick={handleAmpClick}
        highlighted={highlighted}
      />
    </StyledDiv>
  );
};

const AmpDisplay: FC<{
  max?: number;
  fftResults: [number, number][];
  highlighted: number | null;
  onClick: (index: number) => void;
}> = React.memo(props => {
  const { max = 15, fftResults, highlighted, onClick } = props;
  const items = fftResults
    .slice(0, max)
    .map(f => [f[0], f[1], Math.sqrt(f[0] * f[0] + f[1] * f[1])]);
  const maxF = Math.max(...items.map(i => i[2])) || 1;
  return (
    <div className="amplitudes-card">
      <div>成分</div>
      <ul className="amplitudes-list">
        {items.map((item, i) => {
          return (
            <li
              key={i}
              className={classNames('amp', { highlighted: i === highlighted })}
              onClick={() => onClick(i)}
            >
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
  height: calc(var(--fontSize) * 20);
  display: grid;
  grid-template-areas: 'm m' 'c a';
  grid-template-rows: calc(var(--fontSize) * 1.4) auto;
  grid-template-columns: calc(var(--fontSize) * 23) calc(var(--fontSize) * 5);
  justify-content: center;
  gap: 10px 0;
  .menu {
    grid-area: m;
    display: flex;
    flex-flow: row;
    gap: 15px;
    align-items: center;
  }
  .num-waves {
    display: flex;
    input {
      width: calc(var(--fontSize) * 2);
    }
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
    background: #eeeeee;
    grid-area: a;
    padding: 10px;
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
      background-repeat: no-repeat;
      margin-bottom: 2px;
      position: relative;
      z-index: 0;
      &.highlighted {
        background: yellow;
      }
      & .bar {
        background: #ccccff;
        position: absolute;
        left: 0;
        top: 10%;
        bottom: 10%;
        z-index: -1;
      }
    }
  }
`;

export default FourierGraph;
