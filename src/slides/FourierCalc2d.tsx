import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

export const mat1 = String.raw`
  \color{red}
  \begin{bmatrix}
    f_{0,0} & \dots & f_{X-1,0} \\
    \vdots & \ddots & \vdots \\
    f_{1,Y-1} & \dots & f_{X-1,Y-1} \\
  \end{bmatrix}
`;

export const mat2 = String.raw`
  \color{blue}
  \begin{bmatrix}
    F_{0,0} & \dots & F_{X-1,0} \\
    \vdots & \ddots & \vdots \\
    F_{1,Y-1} & \dots & F_{X-1,Y-1} \\
  \end{bmatrix}
`;

const trans1 = String.raw`
  {\color{blue}F_{k,l}}
  = \sum_{y=0}^{Y-1}\sum_{x=0}^{X-1}
    {\color{red} f_{x,y}}
    \left\{ \cos 2\pi \left(\frac{xk}{X}+\frac{yl}{Y}\right)
        - i \sin 2\pi \left(\frac{xk}{X}+\frac{yl}{Y}\right) \right\}
`;

const trans2 = String.raw`
  {\color{red}f_{k,l}}
  = \sum_{y=0}^{Y-1}\sum_{x=0}^{X-1}
    {\color{blue} F_{x,y}}
    \left\{ \cos 2\pi \left(\frac{xk}{X}+\frac{yl}{Y}\right)
        + i \sin 2\pi \left(\frac{xk}{X}+\frac{yl}{Y}\right) \right\}
`;

const FourierCald2d: FC = props => {
  return (
    <Slide title="2次元フーリエ変換も1次元と同じ">
      <p>
        あらゆる平面上の画像は、
        <strong>サインカーブの縞模様の和</strong>で近似できる。
        <small>
          <Katex>{mat1}</Katex>
        </small>
        という行列と
        <small>
          <Katex>{mat2}</Katex>
        </small>
        という行列は、以下のように変換できる（純粋に数学上の計算）。
      </p>
      <div className="alert">
        <Katex displayMode>{trans1}</Katex>
        <Katex displayMode>{trans2}</Katex>
      </div>
      <p>
        <small>無理に読まなくていいです</small>
      </p>
    </Slide>
  );
};

const Slide = styled(_Slide)`
  .fig {
    display: flex;
    justify-content: center;
    gap: var(--fontSize);
    align-items: center;
    img {
      width: calc(var(--fontSize) * 12);
    }
  }

  .alert {
    font-size: calc(var(--fontSize) * 0.8);
  }
`;

export default FourierCald2d;
