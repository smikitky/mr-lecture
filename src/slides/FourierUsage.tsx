import { FC } from 'react';
import styled from 'styled-components';
import _Slide from '../Slide';
import Katex from '../utils/Katex';

const fk = String.raw`\color{blue} \{F_k\}`;

const FourierUsage: FC = props => {
  return (
    <Slide title="フーリエ変換の利用法">
      <ul>
        <li>誰でも知っているのは音楽用のイコライザ</li>
        <li>
          「もとの波形に、低周波成分（低い音）や高周波成分（高い音）がどれだけ含まれているのか」を分析できる。
        </li>
        <li>
          <Katex>{fk}</Katex>{' '}
          の状態で数列を少しいじって逆変換すれば、元の音波から「高音を除去する」「重低音を強調する」などが可能。MP3
          などの音声圧縮、JPEG などの画像圧縮技術でも使われている
        </li>
        <div className="fig">
          <span>低い音←</span>
          <img src="/images/equalizer.png" alt="" />
          <span>→高い音</span>
        </div>
      </ul>
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
`;

export default FourierUsage;
