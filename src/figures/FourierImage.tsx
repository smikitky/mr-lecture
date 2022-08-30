import debounce from 'lodash-es/debounce';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import beans from '../fourier/beans.jpg';
import black from '../fourier/black.jpg';
import brain from '../fourier/brain.jpg';
import cherry from '../fourier/cherry.jpg';
import kanji_omo from '../fourier/kanji_omo.jpg';
import kanji_river from '../fourier/kanji_river.jpg';
import lenna from '../fourier/lenna.jpg';
import snow from '../fourier/snow.jpg';
import starstripe from '../fourier/starstripe.jpg';
import zebra from '../fourier/zebra.jpg';
import { swapQuadrants, normalize, fft2d } from '../utils/fft';
import styled from 'styled-components';

const N = 256;
const images = {
  black,
  brain,
  beans,
  cherry,
  lenna,
  snow,
  starstripe,
  zebra,
  kanji_omo,
  kanji_river
};

// const fftWorker = new FftWorker();

const toCanvas = (ctx: CanvasRenderingContext2D, data: number[]) => {
  const imageData = new ImageData(N, N);
  for (let i = 0; i < N * N; i++) {
    const val = Math.min(Math.max(0, data[i]), 255);
    imageData.data[i * 4] = val;
    imageData.data[i * 4 + 1] = val;
    imageData.data[i * 4 + 2] = val;
    imageData.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
};

const fromCanvas = (ctx: CanvasRenderingContext2D): number[] => {
  const result = new Array(N * N);
  const imageData = ctx.getImageData(0, 0, N, N);
  for (let i = 0; i < N * N; i++) {
    result[i] =
      (imageData.data[i * 4] +
        imageData.data[i * 4 + 1] +
        imageData.data[i * 4 + 2]) /
      3;
  }
  return result;
};

const FourierImage: FC = props => {
  const oCanvasRef = useRef<HTMLCanvasElement>(null);
  const kCanvasRef = useRef<HTMLCanvasElement>(null);
  const [down, setDown] = useState(false);

  const convert = useMemo(
    () =>
      debounce(() => {
        const canvas = oCanvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const data = fromCanvas(ctx);
        const fftResults = swapQuadrants(normalize(fft2d(data, N)), N);
        toCanvas(kCanvasRef.current!.getContext('2d')!, fftResults);
      }, 50),
    []
  );

  useEffect(() => {
    const handlePaste = (ev: ClipboardEvent) => {
      const items = Array.from(ev.clipboardData?.items ?? []);
      const item = items.find(i => i.type.startsWith('image'));
      if (!item) return;
      ev.preventDefault();
      const url = URL.createObjectURL(item.getAsFile()!);
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => {
        const ctx = oCanvasRef.current!.getContext('2d')!;
        ctx.drawImage(image, 0, 0, N, N);
        toCanvas(ctx, fromCanvas(ctx)); // discards color and alpha
        convert();
      });
    };
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [convert]);

  const handleImageSelect = (ev: React.MouseEvent) => {
    const image = ev.target as HTMLImageElement;
    const canvas = oCanvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0);
    convert();
  };

  const handlePaint = (ev: React.MouseEvent) => {
    if (!down) return;
    const canvas = oCanvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();
    const x = ((ev.clientX - rect.x) / rect.width) * N;
    const y = ((ev.clientY - rect.y) / rect.height) * N;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    convert();
  };

  useEffect(() => {
    const ctx = oCanvasRef.current!.getContext('2d')!;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, N, N);
    convert();
  }, [convert]);

  return (
    <StyledDiv>
      <div className="thumbs">
        {Object.values(images).map(url => (
          <img
            key={url}
            className="thumb"
            src={url}
            onClick={handleImageSelect}
            alt=""
          />
        ))}
      </div>
      <div>
        <div className="box o">
          <div>Original:</div>
          <canvas
            ref={oCanvasRef}
            className="image"
            width={N}
            height={N}
            onPointerMove={handlePaint}
            onPointerDown={() => setDown(true)}
            onPointerLeave={() => setDown(false)}
            onPointerUp={() => setDown(false)}
          />
        </div>
        {' = '}
        <div className={'box k'}>
          <div>K-space image:</div>
          <canvas ref={kCanvasRef} className="image" width={N} height={N} />
        </div>
      </div>
      <div>
        {!('ontouchstart' in window) && (
          <>
            <span>Press Ctrl + V to paste from clipboard.</span>{' '}
          </>
        )}
        <span>Drag to paint.</span>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--fontSize) * 0.5);
  .thumbs {
    width: 100%;
    overflow-x: auto;
    display: flex;
    padding: calc(var(--fontSize) * 0.3);
  }
  .thumb {
    cursor: pointer;
    width: calc(var(--fontSize) * 3);
    height: calc(var(--fontSize) * 3);
    box-shadow: 3px 3px 3px silver;
    margin-right: 10px;
    &:hover {
      transform: scale(1.1);
    }
  }
  .image {
    touch-action: none;
  }
  --canvasSize: calc(var(--fontSize) * 10);
  .box {
    &.o canvas {
      border: 3px solid blue;
      width: var(--canvasSize);
      height: var(--canvasSize);
    }
    &.k canvas {
      border: 3px solid red;
      width: var(--canvasSize);
      height: var(--canvasSize);
    }
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    background-color: #eeeeee;
    border-radius: 10px;
  }
`;

export default FourierImage;
