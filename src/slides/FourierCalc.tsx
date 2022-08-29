import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

export const orig = String.raw`\color{red} \{f_0, f_1, \dots, f_{N-1}\}`;
export const transformed = String.raw`\color{blue} \{F_0, F_1, \dots, F_{N-1}\}`;

export const fk = String.raw`\color{red} \{ f_k \}`;
export const Fk = String.raw`\color{blue} \{ F_k \}`;

export const fft = String.raw`
  {\color{blue} F_k} =
  \sum^{N-1}_{n=0}{\color{red}f_n}
    \left(\cos\frac{2\pi kn}{N} - i\sin\frac{2\pi kn}{N}\right)
`;
export const ifft = String.raw`
  {\color{red}f_k} =
  \sum^{N-1}_{n=0}{\color{blue}F_n}
    \left(\cos\frac{2\pi kn}{N} + i\sin\frac{2\pi kn}{N}\right)
`;

const FourierCalc: FC = props => {
  return (
    <Slide title="フーリエ変換 (Fourier Transformation)">
      <ul>
        <li>
          <Katex>{orig}</Katex>
          という長さ <Katex>N</Katex> の任意の数列は、以下の公式で{' '}
          <Katex>{transformed}</Katex> という数列に変換できる（<Katex>i</Katex>{' '}
          は虚数単位）。
          <div className="alert">
            <Katex displayMode>{fft}</Katex>
          </div>
        </li>
        <li>
          逆変換したら、もとの{' '}
          <span className="original">
            <Katex>{orig}</Katex>
          </span>{' '}
          という数列に戻せる。
          <div className="alert">
            <Katex displayMode>{ifft}</Katex>
          </div>
        </li>
        <li>
          つまり <Katex>{orig}</Katex> と <Katex>{transformed}</Katex> は
          <strong>同じ情報を含んでいる</strong>
          （純粋の紙の上で計算できる数学の公式） 。
        </li>
      </ul>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .alert {
    padding: 0.1em;
  }
`;

export default FourierCalc;
