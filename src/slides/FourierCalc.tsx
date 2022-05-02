import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

const orig = String.raw`\{f_0, f_1, \dots, f_{N-1}\}`;
const transformed = String.raw`\{F_0, F_1, \dots, F_{N-1}\}`;

const fft = String.raw`F_k = \sum^{N-1}_{n=0}f_n\left(\cos\frac{2\pi kn}{N} - i\sin\frac{2\pi kn}{N}\right)`;
const ifft = String.raw`f_k = \sum^{N-1}_{n=0}F_n\left(\cos\frac{2\pi kn}{N} + i\sin\frac{2\pi kn}{N}\right)`;

const FourierCalc: FC = props => {
  return (
    <Slide title="フーリエ変換 (Fourier Transformation)">
      <ul>
        <li>
          フーリエ変換：
          <strong>
            あらゆる形の関数は、サインカーブの線形和の形に変換できる
          </strong>
          。純粋に紙の計算で導ける数学の定理。
        </li>
        <li>
          <span className="original">
            <Katex>{orig}</Katex>
          </span>
          という任意の数列を、以下の公式で{' '}
          <span className="transformed">
            <Katex>{transformed}</Katex>
          </span>{' '}
          という数列に変換できる。
        </li>
        <li>
          逆変換したら、もとの{' '}
          <span className="original">
            <Katex>{orig}</Katex>
          </span>{' '}
          という数列に戻せる。
          <strong>情報は失われない</strong>。
        </li>
      </ul>
      <div>
        <Katex displayMode>{fft}</Katex>
        <Katex displayMode>{ifft}</Katex>
      </div>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  // Slide-specific styles go here
`;

export default FourierCalc;
