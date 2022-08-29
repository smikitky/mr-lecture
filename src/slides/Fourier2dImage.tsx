import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';
import { mat1, mat2 } from './FourierCalc2d';

const freq = String.raw`\color{blue} \{F_{x,y}\}`;
const orig = String.raw`\color{red} \{f_{x,y}\}`;

const Fourier2dImage: FC = props => {
  return (
    <Slide title="2次元フーリエ変換のイメージ">
      <div>
        普通の画像
        <small>
          <Katex>{mat1}</Katex>
        </small>
        から
        <small>
          <Katex>{mat2}</Katex>
        </small>
        にフーリエ変換すると、もとの画像にどのような周波数が含まれているのかを示す、別の画像になります。
      </div>
      <div>
        逆に <Katex>{freq}</Katex> から <Katex>{orig}</Katex>{' '}
        に逆変換すれば、元の画像になります。 後者を MRI 用語で
        <strong>「k空間画像」</strong>と呼びます。
      </div>
      <img src="/images/conversion.png" alt="フーリエ変換" />
    </Slide>
  );
};

const Slide = styled(_Slide)`
  img {
    width: 70%;
  }
`;

export default Fourier2dImage;
